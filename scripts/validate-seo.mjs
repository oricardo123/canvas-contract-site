import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { reviewMode } from "./seo-environment.mjs";
import { loadPageMetadata, pageHtmlPath } from "./generate-page-html.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = resolve(root, "dist");
const read = (path) => readFile(resolve(root, path), "utf8");
const seo = JSON.parse(await read("seo.config.json"));
const { getPageMeta, getPagePaths } = await loadPageMetadata();
const catalog = JSON.parse(await read("src/data/catalog.generated.json"));
const expectedPaths = ["/", "/collection", "/studio", "/projects", "/contact"];
for (const category of catalog) {
  expectedPaths.push(`/collection/${category.slug}`);
  for (const product of category.products) {
    expectedPaths.push(`/collection/${category.slug}/${product.code.toLowerCase()}`);
  }
}
const paths = getPagePaths();
assert.equal(new Set(paths).size, paths.length, "Duplicate metadata routes");
assert.deepEqual([...paths].sort(), expectedPaths.sort(), "Metadata routes differ from the complete catalogue and public pages");
assert.equal(new URL(seo.siteOrigin).protocol, "https:");

function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (entity, code) => {
    if (code[0] === "#") {
      const hex = code[1].toLowerCase() === "x";
      return String.fromCodePoint(parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10));
    }
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }[code.toLowerCase()] ?? entity;
  });
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
    .map(([, key, double, single]) => [key.toLowerCase(), decodeHtml(double ?? single)]));
}

function oneMatch(html, pattern, label) {
  const matches = [...html.matchAll(pattern)];
  assert.equal(matches.length, 1, `Expected one ${label}`);
  return matches[0];
}

// The body and every non-SEO head byte remain protected, including asset order.
function protectedDocument(html) {
  return html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, (head) => head
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (tag) => attributes(tag).id === "site-name-data" ? "" : tag)
    .replace(/<(?:meta|link)\b[^>]*>/gi, (tag) => {
      const attr = attributes(tag);
      const seoName = /^(?:description|robots|twitter:(?:card|title|description|image|image:alt))$/;
      const seoProperty = /^og:(?:title|description|type|url|image|image:alt|site_name)$/;
      return seoName.test(attr.name || "") || seoProperty.test(attr.property || "") || attr.rel === "canonical" ? "" : tag;
    }));
}

const homeHtml = await read("dist/index.html");
const templateBody = oneMatch(homeHtml, /<body\b[^>]*>[\s\S]*?<\/body>/gi, "homepage body")[0];
const protectedTemplate = protectedDocument(homeHtml);
const titles = new Set();
const checkedImages = new Set();
async function validateImage(url, path) {
  const image = new URL(url);
  assert.equal(image.origin, new URL(reviewMode ? seo.reviewOrigin : seo.siteOrigin).origin, `${path}: incorrect image origin`);
  assert.equal(image.protocol, "https:", `${path}: image must use HTTPS`);
  assert.ok(image.pathname.startsWith("/assets/"), `${path}: image must be a local published asset`);
  assert.equal(image.search + image.hash, "", `${path}: unexpected image query or fragment`);
  const file = resolve(dist, `.${decodeURIComponent(image.pathname)}`);
  assert.ok(file.startsWith(dist + sep), `${path}: image leaves build directory`);
  if (checkedImages.has(file)) return;
  const bytes = await readFile(file);
  assert.ok(bytes.length > 0, `${path}: empty sharing image`);
  const signature = bytes.subarray(0, 12);
  const valid = /\.jpe?g$/i.test(file) ? signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff
    : /\.png$/i.test(file) ? signature.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : /\.webp$/i.test(file) ? signature.toString("ascii", 0, 4) === "RIFF" && signature.toString("ascii", 8, 12) === "WEBP"
        : /\.gif$/i.test(file) ? /^GIF8[79]a/.test(signature.toString("ascii"))
          : /\.svg$/i.test(file) ? /<svg\b/.test(bytes.toString("utf8")) : false;
  assert.ok(valid, `${path}: sharing image extension/signature mismatch or unsupported format`);
  checkedImages.add(file);
}

for (const path of paths) {
  const meta = getPageMeta(path, reviewMode);
  const html = await read(`dist/${pageHtmlPath(path)}`);
  const head = oneMatch(html, /<head\b[^>]*>([\s\S]*?)<\/head>/gi, `${path} head`)[1];
  assert.equal(oneMatch(html, /<body\b[^>]*>[\s\S]*?<\/body>/gi, `${path} body`)[0], templateBody, `${path}: template body changed`);
  assert.equal(protectedDocument(html), protectedTemplate, `${path}: protected non-SEO HTML changed`);
  assert.doesNotMatch(html, /__CANVAS_\w+__/, `${path}: unresolved build metadata placeholder`);
  const tags = [...head.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(([tag]) => attributes(tag));
  function expectTag(attribute, key, valueAttribute, expected) {
    const matches = tags.filter((tag) => tag[attribute] === key);
    assert.equal(matches.length, 1, `${path}: expected one ${key} tag`);
    assert.equal(matches[0][valueAttribute], expected, `${path}: incorrect ${key}`);
  }
  const title = decodeHtml(oneMatch(head, /<title\b[^>]*>([^<]*)<\/title>/gi, `${path} title`)[1]);
  assert.equal(title, meta.title, `${path}: incorrect initial title`);
  assert.ok(title.endsWith(` | ${seo.siteName}`), `${path}: title missing brand`);
  assert.ok(!titles.has(title), `${path}: duplicate initial title ${title}`);
  titles.add(title);
  assert.ok(meta.description.trim().length > 0, `${path}: empty description`);
  assert.ok(meta.imageAlt.trim().length > 0, `${path}: empty image alternative text`);
  const canonical = new URL(path, seo.siteOrigin).href;
  assert.equal(meta.canonicalUrl, canonical, `${path}: canonical must match the production route`);
  assert.equal(meta.siteName, seo.siteName, `${path}: incorrect site name`);
  const expectedRobots = reviewMode ? "noindex, nofollow" : "index, follow";
  assert.equal(meta.robots, expectedRobots, `${path}: incorrect metadata indexing mode`);
  for (const mode of [false, true]) {
    const modeMeta = getPageMeta(path, mode);
    assert.equal(modeMeta.robots, mode ? "noindex, nofollow" : "index, follow", `${path}: incorrect ${mode ? "review" : "production"} indexing policy`);
    assert.equal(modeMeta.canonicalUrl, canonical, `${path}: canonical changes between environments`);
  }
  expectTag("name", "description", "content", meta.description);
  expectTag("name", "robots", "content", expectedRobots);
  expectTag("rel", "canonical", "href", canonical);
  for (const [key, value] of Object.entries({
    "og:title": meta.title, "og:description": meta.description, "og:url": canonical,
    "og:type": meta.type, "og:site_name": meta.siteName, "og:image": meta.image,
    "og:image:alt": meta.imageAlt, "og:locale": "en_GB",
  })) expectTag("property", key, "content", value);
  for (const [key, value] of Object.entries({
    "twitter:title": meta.title, "twitter:description": meta.description,
    "twitter:card": "summary_large_image", "twitter:image": meta.image,
    "twitter:image:alt": meta.imageAlt,
  })) expectTag("name", key, "content", value);
  const scripts = [...head.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .map(([, tag, content]) => ({ ...attributes(tag), content }));
  const siteNameScripts = scripts.filter((script) => script.id === "site-name-data");
  assert.equal(siteNameScripts.length, path === "/" ? 1 : 0, `${path}: WebSite markup belongs only on the homepage`);
  const jsonLd = scripts.filter((script) => script.type === "application/ld+json").map((script) => JSON.parse(script.content));
  assert.equal(jsonLd.length, path === "/" ? 1 : 0, `${path}: unexpected structured data`);
  if (path === "/") {
    const schema = { "@context": "https://schema.org", "@type": "WebSite", name: seo.siteName, url: canonical };
    assert.deepEqual(meta.siteNameData, schema, "Incorrect homepage metadata schema");
    assert.deepEqual(jsonLd[0], schema, "Incorrect initial homepage schema");
    assert.equal(siteNameScripts[0].type, "application/ld+json");
  } else {
    assert.equal(meta.siteNameData, null, `${path}: non-homepage metadata has WebSite schema`);
  }
  await validateImage(meta.image, path);
}

for (const path of ["/__missing-page__", "/collection/__missing-category__", "/collection/sofas/__missing-product__"]) {
  for (const mode of [false, true]) {
    const meta = getPageMeta(path, mode);
    assert.equal(meta.canonicalUrl, null, `${path}: unknown route must not have a canonical`);
    assert.equal(meta.robots, "noindex, nofollow", `${path}: unknown route must not be indexable`);
    assert.equal(meta.siteNameData, null, `${path}: unknown route must not have WebSite schema`);
  }
}

async function htmlFiles(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = prefix + entry.name;
    if (entry.isDirectory()) files.push(...await htmlFiles(resolve(directory, entry.name), path + "/"));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}
assert.deepEqual((await htmlFiles(dist)).sort(), paths.map(pageHtmlPath).sort(), "Generated HTML files differ from the valid route list");
const sitemap = await read("dist/sitemap.xml");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => decodeHtml(url));
assert.equal(new Set(locations).size, locations.length, "Duplicate sitemap URLs");
assert.deepEqual(locations.sort(), expectedPaths.map((path) => new URL(path, seo.siteOrigin).href).sort(), "Sitemap does not match generated canonical pages");

// Retain the existing deployment-header and robots.txt protections.
const robots = await read("dist/robots.txt");
const vercel = JSON.parse(await read("vercel.json"));
const robotHeaders = (vercel.headers || []).flatMap((rule) =>
  rule.headers.filter((header) => header.key.toLowerCase() === "x-robots-tag")
    .map((header) => ({ ...header, source: rule.source, has: rule.has, missing: rule.missing })),
);
const noindexHeaders = robotHeaders.filter((header) => /noindex/i.test(header.value));
assert.equal(noindexHeaders.length, 1, "Expected one conditional preview noindex header");
const previewHeader = noindexHeaders[0];
assert.equal(previewHeader.source, "/(.*)");
assert.equal(previewHeader.has, undefined);
assert.deepEqual(previewHeader.missing, [
  { type: "host", value: new URL(seo.siteOrigin).hostname.replaceAll(".", "\\.") },
], "The noindex header must exclude only the canonical production hostname");
if (reviewMode) {
  assert.match(robots, /^Disallow:\s*\/\s*$/m, "Review robots must block crawling");
} else {
  assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m, "Launch robots still blocks all crawling");
  assert.match(robots, new RegExp(`^Sitemap: ${seo.siteOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml\\s*$`, "m"));
}
console.log(`SEO verified: ${paths.length} initial page heads, unique titles and canonical sitemap URLs; ${checkedImages.size} valid local sharing images; homepage-only WebSite markup; identical template bodies and protected HTML; ${reviewMode ? "review noindex retained" : "launch indexing enabled"}.`);
