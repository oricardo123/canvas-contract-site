import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CategoryNav } from "../components/CategoryNav";
import { ContactBanner } from "../components/ContactBanner";
import { ProductCard } from "../components/ProductCard";
import { getCategory } from "../data/catalog";
import { usePageMeta } from "../hooks/usePageMeta";

const PAGE_SIZE = 24;

export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategory(categorySlug);
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  usePageMeta(
    category?.name ?? "Collection",
    category ? `Explore ${category.count} made-to-order ${category.name.toLowerCase()} from Canvas.` : undefined,
    {
      path: category ? `/collection/${category.slug}` : "/collection",
      image: category?.image,
    },
  );

  const collections = useMemo(
    () =>
      category
        ? [...new Set(category.products.map((product) => product.collection))].sort((a, b) => a.localeCompare(b))
        : [],
    [category],
  );

  const results = useMemo(() => {
    if (!category) return [];
    const term = query.trim().toLowerCase();
    return category.products.filter((product) => {
      const matchesCollection = collection === "all" || product.collection === collection;
      const matchesQuery = !term || `${product.code} ${product.collection} ${product.alt}`.toLowerCase().includes(term);
      return matchesCollection && matchesQuery;
    });
  }, [category, collection, query]);

  useEffect(() => {
    setQuery("");
    setCollection("all");
    setVisible(PAGE_SIZE);
  }, [categorySlug]);

  useEffect(() => setVisible(PAGE_SIZE), [collection, query]);

  if (!category) return <Navigate to="/collection" replace />;

  const shownProducts = results.slice(0, visible);

  return (
    <div className="category-page page-enter">
      <div className="category-hero shell">
        <Breadcrumbs
          items={[
            { label: "Collection", to: "/collection" },
            { label: category.name },
          ]}
        />
        <p className="eyebrow">Furniture family</p>
        <div className="category-hero__heading">
          <h1>{category.name}</h1>
          <p>
            {category.count} pieces. Dimensions, materials and finishes can be changed for the project.
          </p>
        </div>
      </div>
      <CategoryNav />

      <section className="catalogue shell">
        <div className="catalogue-tools">
          <label className="search-field">
            <Search aria-hidden="true" size={18} strokeWidth={1.5} />
            <span className="sr-only">Search this category</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by reference or collection"
            />
          </label>
          <label className="select-field">
            <SlidersHorizontal aria-hidden="true" size={18} strokeWidth={1.5} />
            <span className="sr-only">Filter by collection</span>
            <select value={collection} onChange={(event) => setCollection(event.target.value)}>
              <option value="all">All collections</option>
              {collections.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>
          <p className="catalogue-count" aria-live="polite">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {shownProducts.length > 0 ? (
          <>
            <div className="product-grid">
              {shownProducts.map((product) => (
                <ProductCard product={product} key={product.code} />
              ))}
            </div>
            {visible < results.length ? (
              <div className="load-more">
                <button
                  className="button button--outline"
                  type="button"
                  onClick={() => setVisible((count) => count + PAGE_SIZE)}
                >
                  Show more pieces
                  <span aria-hidden="true">+{Math.min(PAGE_SIZE, results.length - visible)}</span>
                </button>
                <p>Showing {shownProducts.length} of {results.length}</p>
              </div>
            ) : null}
          </>
        ) : (
          <div className="empty-state">
            <h2>No matching pieces</h2>
            <p>Try another reference or view all collections.</p>
            <button type="button" className="text-link" onClick={() => { setQuery(""); setCollection("all"); }}>
              Clear filters
            </button>
          </div>
        )}
      </section>
      <ContactBanner />
    </div>
  );
}
