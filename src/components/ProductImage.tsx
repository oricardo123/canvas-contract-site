import { useEffect, useState } from "react";
import { getCategory, getProductImage } from "../data/catalog";
import type { Product } from "../types";
import { FurnitureImage } from "./FurnitureImage";

interface ProductImageProps {
  product: Product;
  className?: string;
  eager?: boolean;
}

interface ImagePresentation {
  width: number;
  height: number;
  preserveSourceSize?: boolean;
}

const originalPreviewCodes = new Set([
  "ECB-23",
  "ECB-25",
  "CAB-01",
  "CAB-02",
  "CAB-03",
  "CAB-04",
  "CAB-05",
  "CAB-06",
]);

const categoryImageDimensions: Record<string, ImagePresentation> = {
  sofas: { width: 400, height: 330 },
  "case-goods": { width: 400, height: 330 },
  benches: { width: 400, height: 330 },
  "lounge-chairs": { width: 700, height: 700 },
};

function getImagePresentation(product: Product, source: string, primary: string): ImagePresentation {
  if (source === product.thumbnail) {
    return {
      width: 100,
      height: product.code === "ECR-05" ? 101 : 100,
      preserveSourceSize: true,
    };
  }

  if (source !== primary) {
    return categoryImageDimensions[product.category] ?? { width: 300, height: 330 };
  }

  if (originalPreviewCodes.has(product.code)) {
    return { width: 100, height: 100, preserveSourceSize: true };
  }

  if (product.code === "ECM-01") return { width: 700, height: 700 };
  if (product.code === "ECR-05") return { width: 300, height: 331 };
  if (product.code === "TAQ-03" || product.code === "TAQ-04") {
    return { width: 400, height: 330 };
  }

  if (["sofas", "case-goods", "benches"].includes(product.category)) {
    return { width: 400, height: 330 };
  }

  return { width: 300, height: 330 };
}

export function ProductImage({ product, className, eager = false }: ProductImageProps) {
  const primary = getProductImage(product);
  const [source, setSource] = useState(primary);

  useEffect(() => setSource(primary), [primary]);

  const fallback =
    source === primary
      ? product.thumbnail
      : getCategory(product.category)?.image ?? "/assets/categories/category-01.jpg";
  const presentation = getImagePresentation(product, source, primary);
  const classes = [
    "product-image",
    presentation.preserveSourceSize ? "product-image--original-preview" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FurnitureImage
      className={classes}
      src={source}
      alt={product.alt || `${product.categoryName}, ${product.code}`}
      width={presentation.width}
      height={presentation.height}
      preserveSourceSize={presentation.preserveSourceSize}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (source !== fallback) setSource(fallback);
      }}
    />
  );
}
