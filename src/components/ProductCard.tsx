import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { productPath } from "../data/catalog";
import type { Product } from "../types";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <article className={`product-card${featured ? " product-card--featured" : ""}`}>
      <Link to={productPath(product)} aria-label={`View ${product.alt}, ${product.code}`}>
        <span className="product-card__image">
          <ProductImage product={product} />
          <span className="product-card__action" aria-hidden="true">
            <ArrowUpRight size={19} strokeWidth={1.5} />
          </span>
        </span>
        <span className="product-card__meta">
          <span>
            <strong>{product.code}</strong>
            <small>{product.collection} collection</small>
          </span>
          <span className="product-card__category">{product.categoryName}</span>
        </span>
      </Link>
    </article>
  );
}
