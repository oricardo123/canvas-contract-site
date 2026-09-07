import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryImage } from "../components/CategoryImage";
import { CategoryNav } from "../components/CategoryNav";
import { ContactBanner } from "../components/ContactBanner";
import { PageIntro } from "../components/PageIntro";
import { catalog, productCount } from "../data/catalog";
import { usePageMeta } from "../hooks/usePageMeta";

export function CollectionPage() {
  usePageMeta(
    "Furniture Collection",
    "Explore made-to-order armchairs, side chairs, lounge chairs, stools, sofas, tables, case goods and benches.",
    { path: "/collection", image: catalog[0].image },
  );

  return (
    <div className="collection-page">
      <PageIntro
        eyebrow="Collection"
        title="Furniture by type."
        copy={
          <p>
            Browse {productCount} products in eight categories. Sizes, materials, upholstery and finishes can be changed for the project.
          </p>
        }
        side={<span className="page-count">08 categories</span>}
      />
      <CategoryNav />

      <section className="collection-categories shell" aria-label="Product categories">
        {catalog.map((category, index) => (
          <article className="collection-category" key={category.slug}>
            <Link to={`/collection/${category.slug}`}>
              <span className="collection-category__image">
                <CategoryImage
                  src={category.image}
                  alt={`${category.name} from the Canvas furniture collection`}
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <span className="collection-category__action" aria-hidden="true">
                  <ArrowUpRight size={22} strokeWidth={1.4} />
                </span>
              </span>
              <span className="collection-category__meta">
                <span className="collection-category__number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{category.name}</strong>
                <span>{category.count} pieces</span>
              </span>
            </Link>
          </article>
        ))}
      </section>

      <section className="bespoke-note shell">
        <p className="eyebrow">Custom furniture</p>
        <div>
          <h2>Send us the brief.</h2>
          <p>
            Send a drawing, reference or list of requirements. We can adapt a product or develop a new one.
          </p>
          <Link className="text-link" to="/contact">
            Ask about custom furniture
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
      <ContactBanner />
    </div>
  );
}
