import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryImage } from "../components/CategoryImage";
import { CategoryNav, categoryLabels } from "../components/CategoryNav";
import { ContactBanner } from "../components/ContactBanner";
import { PageIntro } from "../components/PageIntro";
import { catalog } from "../data/catalog";
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
        title="Pieces by Form"
        copy={
          <p>
            Dimensions, materials, upholstery and finishes made to specification
          </p>
        }
        side={<span className="page-count">08 categories</span>}
      />
      <CategoryNav />

      <section className="collection-categories shell" aria-label="Product categories">
        {catalog.map((category) => (
          <article className="collection-category" key={category.slug}>
            <Link to={`/collection/${category.slug}`} aria-label={`${categoryLabels[category.slug] ?? category.name} — ${category.name}`}>
              <span className="collection-category__image">
                <CategoryImage
                  src={category.image}
                  alt={`${category.name} from the Canvas furniture collection`}
                  loading="eager"
                />
                <span className="collection-category__action" aria-hidden="true">
                  <ArrowUpRight size={22} strokeWidth={1.4} />
                </span>
              </span>
              <span className="collection-category__meta">
                <strong>{categoryLabels[category.slug] ?? category.name}</strong>
              </span>
            </Link>
          </article>
        ))}
      </section>

      <section className="bespoke-note shell">
        <p className="eyebrow">Custom furniture</p>
        <div>
          <h2>Send us the brief</h2>
          <p>
            Send a drawing, reference or list of requirements. We can adapt a product or develop a new one
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
