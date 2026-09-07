import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryImage } from "../components/CategoryImage";
import { ContactBanner } from "../components/ContactBanner";
import { ProductCard } from "../components/ProductCard";
import { ProjectCard } from "../components/ProjectCard";
import { catalog } from "../data/catalog";
import { featuredProjects } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

const process = [
  ["01", "Brief", "We review the drawings, quantities, use and delivery requirements."],
  ["02", "Specify", "We agree the dimensions, materials, finishes and any changes."],
  ["03", "Make", "Approved furniture moves into production and quality checks."],
  ["04", "Deliver", "We plan packing, transport and installation requirements."],
];

const featuredCategories = catalog.filter(({ slug }) =>
  ["armchairs", "lounge-chairs", "sofas", "tables"].includes(slug),
);

const featuredProducts = [
  catalog[0].products[0],
  catalog[2].products[7],
  catalog[4].products[3],
];

const selectedWork = featuredProjects.slice(0, 3);
const heroProject = featuredProjects.find(({ slug }) => slug === "st-regis-venice")!;
const heroImage = heroProject.images.find(({ src }) =>
  src.endsWith("st-regis-hotel-venice-02-public-area.jpg"),
)!;

export function HomePage() {
  usePageMeta(
    "Canvas Contract Furniture",
    "Canvas supplies made-to-order furniture for hotels, restaurants and private interiors in Portugal and international markets.",
    { path: "/", image: selectedWork[0].images[0].src },
  );

  return (
    <div className="home-page page-enter">
      <section className="hero shell">
        <div className="hero__heading">
          <p className="eyebrow">Custom furniture</p>
          <h1>
            <span>Fine furniture</span>{" "}
            <span>for customized projects</span>
          </h1>
        </div>
        <figure className="hero__media">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            decoding="async"
            fetchPriority="high"
          />
          <figcaption>
            <span>{heroProject.name}</span>
          </figcaption>
        </figure>
        <div className="hero__copy">
          <p className="hero__lead">
            Made-to-order seating, tables, sofas and case goods for hotels, restaurants and private projects.
          </p>
          <div className="hero__actions">
            <Link className="button button--dark" to="/projects">
              View work
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
            <Link className="text-link" to="/collection">
              Browse the collection
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="portfolio-section shell" id="selected-projects">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Work</p>
            <h2>Selected work.</h2>
          </div>
          <div className="section-heading__aside">
            <Link className="text-link" to="/projects">
              View all work
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
        <div className="portfolio-grid portfolio-grid--preview">
          {selectedWork.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
        </div>
      </section>

      <section className="category-section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Collection</p>
            <h2>Furniture by type.</h2>
          </div>
          <Link className="text-link" to="/collection">
            View all {catalog.reduce((sum, category) => sum + category.count, 0)} pieces
            <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="category-grid">
          {featuredCategories.map((category, index) => (
            <article className="category-card" key={category.slug}>
              <Link to={`/collection/${category.slug}`}>
                <span className="category-card__image">
                  <CategoryImage
                    src={category.image}
                    alt=""
                    loading="lazy"
                  />
                  <span aria-hidden="true" className="category-card__arrow">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </span>
                </span>
                <span className="category-card__meta">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{category.name}</strong>
                  <small>{category.count} pieces</small>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="world-story">
        <div className="shell world-story__inner">
          <figure>
            <img
              src="/assets/editorial/canvas-table-chair-email-2025.jpg"
              alt="Sculpted timber table and upholstered chair from the Canvas portfolio"
              width="4032"
              height="3024"
              style={{ objectPosition: "65% 60%" }}
              loading="lazy"
            />
          </figure>
          <div className="world-story__copy">
            <p className="eyebrow eyebrow--light">About Canvas</p>
            <h2>Based in Portugal.<br />Working internationally.</h2>
            <p>
              Canvas supplies furniture for hospitality and private projects, working with designers, architects and project teams.
            </p>
            <dl>
              <div><dt>Founded</dt><dd>2012</dd></div>
              <div><dt>Based</dt><dd>Portugal</dd></div>
              <div><dt>Work</dt><dd>Hospitality · Private</dd></div>
              <div><dt>Service</dt><dd>Made to order</dd></div>
            </dl>
            <Link className="text-link text-link--light" to="/studio">
              About Canvas
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="shell">
          <div className="section-heading section-heading--dark">
            <div>
              <p className="eyebrow eyebrow--light">How we work</p>
              <h2>From brief to delivery.</h2>
            </div>
          </div>
          <ol className="process-grid">
            {process.map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="featured-section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Furniture</p>
            <h2>Selected pieces.</h2>
          </div>
          <p className="section-heading__copy">Dimensions, materials, colours and finishes can be adjusted.</p>
        </div>
        <div className="featured-products">
          {featuredProducts.map((product) => (
            <ProductCard product={product} featured key={product.code} />
          ))}
        </div>
      </section>

      <section className="editions-tease shell">
        <div className="editions-tease__number">Made to order</div>
        <div className="editions-tease__copy">
          <p className="eyebrow">Custom furniture</p>
          <h2>Made for the project.</h2>
          <p>
            We can adapt furniture from the collection or develop new pieces from a supplied brief.
          </p>
          <Link className="text-link" to="/contact">
            Send a project enquiry
            <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
          </Link>
        </div>
        <figure>
          <img
            src="/assets/editorial/canvas-table-detail-email-2025.jpg"
            alt="Rounded timber tabletop and sculpted support from the Canvas portfolio"
            width="3024"
            height="4032"
            style={{ objectPosition: "50% 35%" }}
            loading="lazy"
          />
        </figure>
      </section>

      <ContactBanner />
    </div>
  );
}
