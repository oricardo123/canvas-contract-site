import seo from "../../seo.config.json";
import { catalog, getCategory, getProduct, getProductImage, productPath } from "../data/catalog";
import { featuredProjects } from "../data/site";

interface PageDetails {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  type?: "website" | "product";
}

// SEO labels only: the catalogue's visible names and codes stay unchanged.
const productTypes: Record<string, string> = {
  armchairs: "Armchair", "side-chairs": "Side Chair", "lounge-chairs": "Lounge Chair",
  stools: "Stool", sofas: "Sofa", tables: "Table", "case-goods": "Case Goods", benches: "Bench",
};

const pages: Record<string, PageDetails> = {
  "/": seo.home,
  "/collection": {
    title: "Made-to-Order Furniture Collection",
    description: "Explore made-to-order seating, tables and case goods for hospitality and private projects. Furniture made to your specifications by Canvas.",
    image: catalog[0].image,
  },
  "/projects": {
    title: "Hotel, Restaurant & Club Furniture Projects",
    description: "Explore Canvas furniture projects including The St. Regis Venice, The Norman Hotel and The Arts Club. Made-to-order furniture for international projects.",
    image: featuredProjects[0].images[0].src,
  },
  "/studio": {
    title: "About Canvas | Custom Furniture",
    description: "Founded by Carlos Almeida in 2010, Canvas makes furniture to specification in Portugal for international hospitality and private projects.",
    image: "/assets/editorial/canvas-loungers-email-2025.jpg",
  },
  "/contact": {
    title: "Furniture Project Enquiries",
    description: "Discuss your hotel, restaurant, club or private residential furniture project with Canvas. Enquire about made-to-order furniture and specifications.",
    image: "/assets/editorial/canvas-armchair-email-2025.jpg",
  },
};

export function getPagePaths(): string[] {
  return [
    ...Object.keys(pages),
    ...catalog.flatMap(category => [
      `/collection/${category.slug}`,
      ...category.products.map(productPath),
    ]),
  ];
}

export function getPageMeta(path: string, reviewMode: boolean) {
  const normalizedPath = path.replace(/\/+$/, "") || "/";
  let canonicalPath = normalizedPath;
  let page: PageDetails | undefined = pages[normalizedPath];
  const segments = normalizedPath.split("/").filter(Boolean);

  if (!page && segments[0] === "collection" && segments.length === 2) {
    const category = getCategory(segments[1]);
    if (category) page = {
      title: `Made-to-Order ${category.name}`,
      description: `Explore ${category.count} made-to-order ${category.name.toLowerCase()} from Canvas for hospitality and private projects. Furniture made to your specifications.`,
      image: category.image,
    };
  }
  if (!page && segments[0] === "collection" && segments.length === 3) {
    const { product } = getProduct(segments[1], segments[2]);
    if (product) {
      const productType = productTypes[product.category];
      canonicalPath = productPath(product);
      page = {
        title: `${product.code} ${productType}`,
        description: `${product.code} ${productType.toLowerCase()} from the ${product.collection} collection, made to order by Canvas. Discuss specifications for your hospitality or private project.`,
        image: getProductImage(product),
        imageAlt: product.alt,
        type: "product",
      };
    }
  }

  const found = !!page;
  page ??= { title: "Page not found", description: seo.home.description, image: seo.home.image };
  return {
    title: `${page.title} | ${seo.siteName}`,
    description: page.description,
    canonicalUrl: found ? new URL(canonicalPath, seo.siteOrigin).href : null,
    robots: !found || reviewMode ? "noindex, nofollow" : "index, follow",
    type: page.type ?? "website",
    image: new URL(page.image, reviewMode ? seo.reviewOrigin : seo.siteOrigin).href,
    imageAlt: page.imageAlt ?? `${page.title} from ${seo.siteName}`,
    siteName: seo.siteName,
    siteNameData: normalizedPath === "/" ? {
      "@context": "https://schema.org", "@type": "WebSite",
      name: seo.siteName, url: new URL("/", seo.siteOrigin).href,
    } : null,
  };
}
