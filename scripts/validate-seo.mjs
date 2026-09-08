import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const seo = JSON.parse(await read("seo.config.json"));
const html = await read("dist/index.html");
const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(([tag]) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])),
);
const expectTag = (attribute, key, valueAttribute, expected) => {
  const matches = tags.filter((tag) => tag[attribute] === key);
  assert.equal(matches.length, 1, `Expected one ${key} tag`);
  assert.equal(matches[0][valueAttribute], expected, `${key} differs from seo.config.json`);
};
const title = `${seo.home.title} | ${seo.siteName}`;
const canonical = new URL("/", seo.siteOrigin).href;
const image = new URL(seo.home.image, seo.reviewMode ? seo.reviewOrigin : seo.siteOrigin).href;
assert.equal(new URL(seo.siteOrigin).protocol, "https:");
assert.equal(html.match(/<title>([^<]+)<\/title>/)?.[1], title);
expectTag("name", "description", "content", seo.home.description);
expectTag("rel", "canonical", "href", canonical);
for (const [key, value] of Object.entries({
  "og:title": title, "og:description": seo.home.description, "og:url": canonical,
  "og:type": "website", "og:site_name": seo.siteName, "og:image": image,
  "og:image:alt": seo.home.imageAlt,
})) expectTag("property", key, "content", value);
for (const [key, value] of Object.entries({
  "twitter:title": title, "twitter:description": seo.home.description,
  "twitter:card": "summary_large_image", "twitter:image": image,
  "twitter:image:alt": seo.home.imageAlt,
})) expectTag("name", key, "content", value);
const schema = html.match(/<script\b[^>]*id="site-name-data"[^>]*>([\s\S]*?)<\/script>/)?.[1];
assert.ok(schema, "Missing homepage site-name markup");
assert.deepEqual(JSON.parse(schema), {
  "@context": "https://schema.org", "@type": "WebSite", name: seo.siteName, url: canonical,
});
await access(fileURLToPath(new URL(`dist${seo.home.image}`, root)));

const sitemap = await read("dist/sitemap.xml");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
const catalog = JSON.parse(await read("src/data/catalog.generated.json"));
const expectedPaths = ["/", "/collection", "/studio", "/projects", "/contact"];
for (const category of catalog) {
  expectedPaths.push(`/collection/${category.slug}`);
  for (const product of category.products) {
    expectedPaths.push(`/collection/${category.slug}/${product.code.toLowerCase()}`);
  }
}
assert.equal(new Set(locations).size, locations.length, "Duplicate sitemap URLs");
assert.deepEqual(locations.sort(), expectedPaths.map((path) => new URL(path, seo.siteOrigin).href).sort());

const robots = await read("dist/robots.txt");
const vercel = JSON.parse(await read("vercel.json"));
const robotHeaders = (vercel.headers || []).flatMap((rule) =>
  rule.headers.filter((header) => header.key.toLowerCase() === "x-robots-tag")
    .map((header) => ({ ...header, source: rule.source })),
);
expectTag("name", "robots", "content", seo.reviewMode ? "noindex, nofollow" : "index, follow");
if (seo.reviewMode) {
  assert.match(robots, /^Disallow:\s*\/\s*$/m, "Review robots must block crawling");
  assert.ok(robotHeaders.some((header) => header.source === "/(.*)" && /noindex/i.test(header.value)),
    "Review Vercel header must retain noindex");
} else {
  assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m, "Launch robots still blocks all crawling");
  assert.match(robots, new RegExp(`^Sitemap: ${seo.siteOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml\\s*$`, "m"));
  assert.ok(!robotHeaders.some((header) => /noindex/i.test(header.value)), "Launch Vercel header still blocks indexing");
}
console.log(`SEO verified: Canvas homepage metadata, sharing image, site-name markup, ${locations.length} canonical sitemap URLs; ${seo.reviewMode ? "review noindex retained" : "launch indexing enabled"}.`);
