import rawCatalog from "./catalog.generated.json";
import type { Category, Product, SalesMode } from "../types";

interface RawProduct {
  code: string;
  collection: string;
  alt: string;
  thumbnail: string;
  salesMode: SalesMode;
}

interface RawCategory extends Omit<Category, "products"> {
  products: RawProduct[];
}

const categoryImages: Record<string, string> = {
  armchairs: "/assets/categories/armchairs.jpg",
  "side-chairs": "/assets/categories/side-chairs.jpg",
  "lounge-chairs": "/assets/categories/lounge-chairs.jpg",
  stools: "/assets/categories/stools.jpg",
  sofas: "/assets/categories/sofas.jpg",
  tables: "/assets/categories/tables.jpg",
  "case-goods": "/assets/categories/case-goods.jpg",
  benches: "/assets/categories/benches.jpg",
};

export const catalog: Category[] = (rawCatalog as RawCategory[]).map((category) => ({
  ...category,
  image: categoryImages[category.slug] ?? category.image,
  products: category.products.map((product) => ({
    ...product,
    category: category.slug,
    categoryName: category.name,
    style: product.alt.match(/Style\s+([\dA-Z-]+)/i)?.[1] ?? product.code.split("-").at(-1) ?? "",
    name: `${category.name.replace(/s$/, "")} ${product.code}`,
    legacyUrl: null,
  })),
}));

export const productCount = catalog.reduce(
  (total, category) => total + category.products.length,
  0,
);

export function getCategory(slug?: string) {
  return catalog.find((category) => category.slug === slug);
}

export function getProduct(categorySlug?: string, productCode?: string) {
  const category = getCategory(categorySlug);
  const product = category?.products.find(
    (candidate) => candidate.code.toLowerCase() === productCode?.toLowerCase(),
  );
  return { category, product };
}

export function getProductImage(product: Product) {
  return product.thumbnail.replace(/-thumb(?=\.[a-z]+$)/i, "-large");
}

export function productPath(product: Product) {
  return `/collection/${product.category}/${product.code.toLowerCase()}`;
}
