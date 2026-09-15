import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { reviewMode } from "./seo-environment.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const managedNames = new Set([
  "description", "robots", "twitter:card", "twitter:title", "twitter:description",
  "twitter:image", "twitter:image:alt",
]);
const managedProperties = new Set([
  "og:title", "og:description", "og:type", "og:url", "og:image", "og:image:alt", "og:site_name",
]);

export async function loadPageMetadata() {
  // Transform shared TypeScript metadata without rendering the React app.
  const vite = await createServer({
    root, appType: "custom", logLevel: "error",
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    return await vite.ssrLoadModule("/src/seo/page-meta.ts");
  } finally {
    await vite.close();
  }
}

export function pageHtmlPath(path) {
  assert.match(path, /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/, `Unsafe page path: ${path}`);
  return path === "/" ? "index.html" : `${path.slice(1)}.html`;
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
    .map(([, key, double, single]) => [key.toLowerCase(), double ?? single]));
}

function escapeHtml(value) {
  assert.equal(typeof value, "string", "Metadata values must be strings");
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

// Masking only permitted SEO tags makes any other byte change detectable.
function protectedHtml(html) {
  return html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/i, (head) => head
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (tag) =>
      attributes(tag).id === "site-name-data" ? "" : tag)
    .replace(/<(?:meta|link)\b[^>]*>/gi, (tag) => {
      const attr = attributes(tag);
      return managedNames.has(attr.name) || managedProperties.has(attr.property)
        || attr.rel === "canonical" ? "" : tag;
    }));
}

export function renderPageHtml(template, meta) {
  assert.equal([...template.matchAll(/<head\b[^>]*>[\s\S]*?<\/head>/gi)].length, 1, "Expected one template head");
  assert.equal([...template.matchAll(/<body\b[^>]*>[\s\S]*?<\/body>/gi)].length, 1, "Expected one template body");
  const html = template.replace(/(<head\b[^>]*>)([\s\S]*?)(<\/head>)/i, (_, open, originalHead, close) => {
    let head = originalHead;
    function replaceOne(pattern, matches, replacement, label) {
      let count = 0;
      head = head.replace(pattern, (tag) => {
        if (!matches(tag)) return tag;
        count += 1;
        return replacement;
      });
      assert.equal(count, 1, `Expected one template ${label}`);
    }
    function metaTag(attribute, key, value) {
      replaceOne(/<meta\b[^>]*>/gi, (tag) => attributes(tag)[attribute] === key,
        value === null ? "" : `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`, key);
    }
    replaceOne(/<title\b[^>]*>[\s\S]*?<\/title>/gi, () => true,
      `<title>${escapeHtml(meta.title)}</title>`, "title");
    for (const [key, value] of Object.entries({
      description: meta.description, robots: meta.robots,
      "twitter:card": "summary_large_image", "twitter:title": meta.title,
      "twitter:description": meta.description, "twitter:image": meta.image,
      "twitter:image:alt": meta.imageAlt,
    })) metaTag("name", key, value);
    for (const [key, value] of Object.entries({
      "og:title": meta.title, "og:description": meta.description, "og:type": meta.type,
      "og:url": meta.canonicalUrl, "og:image": meta.image, "og:image:alt": meta.imageAlt,
      "og:site_name": meta.siteName,
    })) metaTag("property", key, value);
    replaceOne(/<link\b[^>]*>/gi, (tag) => attributes(tag).rel === "canonical",
      meta.canonicalUrl === null ? "" : `<link rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" />`, "canonical");
    const schema = meta.siteNameData === null ? "" :
      `<script id="site-name-data" type="application/ld+json">${JSON.stringify(meta.siteNameData)
        .replaceAll("<", "\\u003c").replaceAll("\u2028", "\\u2028").replaceAll("\u2029", "\\u2029")}</script>`;
    replaceOne(/<script\b[^>]*>[\s\S]*?<\/script>/gi,
      (tag) => attributes(tag).id === "site-name-data", schema, "site-name-data");
    return open + head + close;
  });
  assert.equal(protectedHtml(html), protectedHtml(template), "SEO generation changed protected HTML");
  assert.doesNotMatch(html, /__CANVAS_\w+__/, "Unresolved build metadata placeholder");
  return html;
}

async function generate() {
  const { getPageMeta, getPagePaths } = await loadPageMetadata();
  const paths = getPagePaths();
  assert.equal(new Set(paths).size, paths.length, "Duplicate page paths");
  assert.ok(paths.includes("/"), "Missing homepage path");
  const template = await readFile(resolve(root, "dist/index.html"), "utf8");
  // Render and validate every page before writing any output.
  const pages = paths.map((path) => {
    const meta = getPageMeta(path, reviewMode);
    assert.ok(meta.canonicalUrl, `Missing canonical for valid route ${path}`);
    return { file: resolve(root, "dist", pageHtmlPath(path)), html: renderPageHtml(template, meta) };
  });
  for (const { file, html } of pages) {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  console.log(`Generated ${pages.length} route HTML files with shared metadata; template body and non-SEO HTML preserved byte-for-byte.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generate();
}
