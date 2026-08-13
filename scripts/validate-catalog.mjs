import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(
  await readFile(path.join(projectRoot, "src/data/catalog.generated.json"), "utf8"),
);

const expectedCounts = new Map([
  ["armchairs", 180],
  ["side-chairs", 162],
  ["lounge-chairs", 228],
  ["stools", 96],
  ["sofas", 78],
  ["tables", 144],
  ["case-goods", 66],
  ["benches", 30],
]);

const errors = [];
const codes = new Set();
const routes = new Set();
const imageChecks = [];
let productTotal = 0;

for (const category of catalog) {
  const expected = expectedCounts.get(category.slug);

  if (expected === undefined) errors.push(`Unexpected category: ${category.slug}`);
  if (category.products.length !== expected) {
    errors.push(`${category.slug}: expected ${expected} products, found ${category.products.length}`);
  }
  if (category.count !== category.products.length) {
    errors.push(`${category.slug}: declared count does not match its product list`);
  }

  for (const product of category.products) {
    productTotal += 1;
    const route = `/collection/${category.slug}/${product.code.toLowerCase()}`;

    if (codes.has(product.code)) errors.push(`Duplicate product code: ${product.code}`);
    if (routes.has(route)) errors.push(`Duplicate product route: ${route}`);
    if (!product.alt?.trim()) errors.push(`Missing alternative text: ${product.code}`);

    codes.add(product.code);
    routes.add(route);

    const largeImage = product.thumbnail.replace(/-thumb(?=\.[a-z]+$)/i, "-large");
    for (const publicPath of [product.thumbnail, largeImage]) {
      const filePath = path.join(projectRoot, "public", publicPath.replace(/^\//, ""));
      imageChecks.push(
        access(filePath).catch(() => errors.push(`Missing image: ${publicPath}`)),
      );
    }
  }
}

await Promise.all(imageChecks);

if (catalog.length !== expectedCounts.size) {
  errors.push(`Expected ${expectedCounts.size} categories, found ${catalog.length}`);
}
if (productTotal !== 984) errors.push(`Expected 984 products, found ${productTotal}`);

if (errors.length > 0) {
  throw new Error(`Catalog validation failed:\n- ${errors.join("\n- ")}`);
}

console.log(`Validated ${catalog.length} categories, ${productTotal} unique products and ${imageChecks.length} local images.`);
