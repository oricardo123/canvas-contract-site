export type SalesMode = "inquiry" | "direct";

export interface Product {
  code: string;
  category: string;
  categoryName: string;
  collection: string;
  style: string;
  name: string;
  alt: string;
  thumbnail: string;
  legacyUrl: string | null;
  salesMode: SalesMode;
  price?: number;
  stock?: number;
  edition?: string;
}

export interface Category {
  source: string;
  slug: string;
  name: string;
  shortName: string;
  image: string;
  count: number;
  products: Product[];
}
