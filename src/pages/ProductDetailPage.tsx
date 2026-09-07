import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ContactBanner } from "../components/ContactBanner";
import { ProductCard } from "../components/ProductCard";
import { ProductImage } from "../components/ProductImage";
import { getProduct, getProductImage, productPath } from "../data/catalog";
import { usePageMeta } from "../hooks/usePageMeta";

const furnitureDetails: Record<string, string[]> = {
  armchairs: ["Contract-grade timber frame", "Upholstery and finish to specification", "Alternative woods and materials available"],
  "side-chairs": ["Contract-grade timber frame", "Upholstered or timber seat options", "Alternative woods and finishes available"],
  "lounge-chairs": ["Contract-grade timber frame", "High-resilience foam upholstery", "Alternative woods and materials available"],
  stools: ["Contract-grade construction", "Upholstery and finish to specification", "Counter and bar heights available"],
  sofas: ["Contract-grade internal frame", "High-resilience foam upholstery", "Dimensions and textiles to specification"],
  tables: ["Contract-grade construction", "Top and base finishes to specification", "Dimensions can be adapted to the project"],
  "case-goods": ["Made-to-order cabinet construction", "Internal configuration to specification", "Alternative timbers and finishes available"],
  benches: ["Contract-grade construction", "Upholstery and dimensions to specification", "Alternative base and finish options available"],
};

export function ProductDetailPage() {
  const { categorySlug, productCode } = useParams();
  const { category, product } = getProduct(categorySlug, productCode);

  usePageMeta(
    product?.code ?? "Product",
    product ? `${product.alt}. Made to order by Canvas Contract Furniture.` : undefined,
    {
      path: product ? productPath(product) : "/collection",
      image: product ? getProductImage(product) : undefined,
      type: "product",
    },
  );

  if (!category || !product) return <Navigate to="/collection" replace />;

  const related = category.products
    .filter((candidate) => candidate.code !== product.code && candidate.collection === product.collection)
    .slice(0, 3);
  const emailSubject = encodeURIComponent(`Specification enquiry — ${product.code}`);
  const emailBody = encodeURIComponent(`Hello Canvas,\n\nI would like to discuss ${product.code} (${product.alt}) for a project.\n\nProject location:\nQuantity:\nTarget date:\n\nThank you.`);

  return (
    <div className="product-detail page-enter">
      <div className="shell product-detail__crumbs">
        <Breadcrumbs
          items={[
            { label: "Collection", to: "/collection" },
            { label: category.name, to: `/collection/${category.slug}` },
            { label: product.code },
          ]}
        />
      </div>

      <section className="product-detail__main shell">
        <figure className="product-detail__image">
          <div className="product-detail__visual">
            <ProductImage product={product} eager />
          </div>
          <figcaption>Reference {product.code} · Made to order</figcaption>
        </figure>
        <div className="product-detail__info">
          <p className="eyebrow">{product.collection} collection</p>
          <h1>{product.code}</h1>
          <p className="product-detail__name">{product.alt}</p>
          <p className="product-detail__lead">
            Made to order. Dimensions, materials, finishes and upholstery can be changed for the project.
          </p>
          <dl className="spec-list">
            <div><dt>Category</dt><dd>{category.name}</dd></div>
            <div><dt>Availability</dt><dd>Made to order</dd></div>
            <div><dt>Dimensions</dt><dd>Available on request</dd></div>
            <div><dt>Customisation</dt><dd>Materials, finishes and upholstery</dd></div>
          </dl>
          <a
            className="button button--dark button--wide"
            href={`mailto:sales@canvascontract.com?subject=${emailSubject}&body=${emailBody}`}
          >
            <Mail aria-hidden="true" size={18} strokeWidth={1.5} />
            Request specifications
          </a>
          <p className="product-detail__note">Please include quantity, project location and target date.</p>
        </div>
      </section>

      <section className="product-specification shell">
        <div>
          <p className="eyebrow">Options</p>
          <h2>Specifications for your project.</h2>
        </div>
        <ul>
          {(furnitureDetails[category.slug] ?? furnitureDetails.armchairs).map((detail) => (
            <li key={detail}>
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
              {detail}
            </li>
          ))}
        </ul>
        <p>
          Final dimensions, materials and performance requirements are confirmed for each project. Contact us for an exact specification.
        </p>
      </section>

      {related.length > 0 ? (
        <section className="related-products shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">In the same collection</p>
              <h2>Related pieces.</h2>
            </div>
            <Link className="text-link" to={`/collection/${category.slug}`}>
              All {category.name.toLowerCase()}
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="featured-products">
            {related.map((candidate) => <ProductCard key={candidate.code} product={candidate} featured />)}
          </div>
        </section>
      ) : null}

      <div className="shell product-back-link">
        <Link className="text-link" to={`/collection/${category.slug}`}>
          <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.5} />
          Back to {category.name.toLowerCase()}
        </Link>
      </div>
      <ContactBanner />
    </div>
  );
}
