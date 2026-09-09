import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { CategoryNav, categoryLabels } from "../components/CategoryNav";
import { ContactBanner } from "../components/ContactBanner";
import { ProductCard } from "../components/ProductCard";
import { getCategory } from "../data/catalog";
import { usePageMeta } from "../hooks/usePageMeta";

const PAGE_SIZE = 24;

export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategory(categorySlug);
  const [visible, setVisible] = useState(PAGE_SIZE);

  usePageMeta(
    category?.name ?? "Collection",
    category ? `Explore ${category.count} made-to-order ${category.name.toLowerCase()} from Canvas.` : undefined,
    {
      path: category ? `/collection/${category.slug}` : "/collection",
      image: category?.image,
    },
  );

  useEffect(() => setVisible(PAGE_SIZE), [categorySlug]);

  if (!category) return <Navigate to="/collection" replace />;

  const shownProducts = category.products.slice(0, visible);

  return (
    <div className="category-page">
      <div className="category-hero shell">
        <h1>{categoryLabels[category.slug] ?? category.name}</h1>
      </div>
      <CategoryNav />

      <section className="catalogue shell" aria-label={`${category.name} products`}>
        <div className="product-grid">
          {shownProducts.map((product) => (
            <ProductCard product={product} key={product.code} />
          ))}
        </div>
        {visible < category.products.length ? (
          <div className="load-more">
            <button
              className="button button--outline"
              type="button"
              onClick={() => setVisible((count) => count + PAGE_SIZE)}
            >
              Show more pieces
              <span aria-hidden="true">+{Math.min(PAGE_SIZE, category.products.length - visible)}</span>
            </button>
            <p>Showing {shownProducts.length} of {category.products.length}</p>
          </div>
        ) : null}
      </section>
      <ContactBanner />
    </div>
  );
}
