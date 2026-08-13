import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(projectRoot, "src/data/catalog.generated.json");
const outputPath = path.join(projectRoot, "public/sitemap.xml");
const origin = "https://www.canvascontract.com";

const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const routes = ["/", "/collection", "/studio", "/projects", "/contact"];

for (const category of catalog) {
  routes.push(`/collection/${category.slug}`);

  for (const product of category.products) {
    routes.push(`/collection/${category.slug}/${product.code.toLowerCase()}`);
  }
}

if (new Set(routes).size !== routes.length) {
  throw new Error("Sitemap generation stopped because duplicate public routes were found.");
}

const entries = routes
  .map((route) => `  <url><loc>${new URL(route, origin).href}</loc></url>`)
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

await writeFile(outputPath, sitemap, "utf8");
console.log(`Generated sitemap.xml with ${routes.length} public URLs.`);
