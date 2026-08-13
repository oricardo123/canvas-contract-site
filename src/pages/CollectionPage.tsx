import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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
        eyebrow="The collection"
        title="A library of forms. A starting point for something individual."
        copy={
          <p>
            Browse {productCount} reference pieces across eight furniture families. Every model is made to order and can be adapted in material, size, upholstery and finish.
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
                <img
                  src={category.image}
                  alt={`${category.name} from the Canvas furniture collection`}
                  width="400"
                  height="330"
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
        <p className="eyebrow">Cannot find the exact piece?</p>
        <div>
          <h2>That may be the beginning of the brief.</h2>
          <p>
            Our on-file collection is deliberately flexible. Bring us a reference, a drawing or simply the requirements of the room, and we can develop a bespoke response.
          </p>
          <Link className="text-link" to="/contact">
            Begin a bespoke enquiry
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
      <ContactBanner />
    </div>
  );
}
