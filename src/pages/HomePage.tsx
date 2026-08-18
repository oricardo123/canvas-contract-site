import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactBanner } from "../components/ContactBanner";
import { ProductCard } from "../components/ProductCard";
import { catalog } from "../data/catalog";
import { usePageMeta } from "../hooks/usePageMeta";

const process = [
  ["01", "Understand", "We begin with the interior, its character and the people it must serve."],
  ["02", "Resolve", "Proportion, material, finish and construction are developed around the brief."],
  ["03", "Produce", "Specialist making and exacting quality control bring every detail into focus."],
  ["04", "Place", "From a single piece to an international programme, we remain closely involved."],
];

const featuredCategories = catalog.filter(({ slug }) =>
  ["armchairs", "lounge-chairs", "sofas", "tables"].includes(slug),
);

const featuredProducts = [
  catalog[0].products[0],
  catalog[2].products[7],
  catalog[4].products[3],
];

export function HomePage() {
  usePageMeta(
    "Portugal-Based Furniture Atelier",
    "A Portugal-based furniture atelier developing made-to-order furniture for remarkable hospitality and private interiors worldwide.",
    { path: "/", image: "/assets/editorial/home-05.jpg" },
  );

  return (
    <div className="home-page page-enter">
      <section className="hero shell">
        <div className="hero__copy">
          <p className="eyebrow">Portugal-based furniture atelier · International projects</p>
          <h1>
            Rooted in Portugal.<br />
            <em>Placed around the world.</em>
          </h1>
          <p className="hero__lead">
            Canvas develops made-to-order furniture and complete programmes for hotels, restaurants, private residences and interiors of distinction.
          </p>
          <div className="hero__actions">
            <Link className="button button--dark" to="/projects">
              View selected experience
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
            <Link className="text-link" to="/collection">
              Explore the furniture library
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
        <figure className="hero__media">
          <img
            src="/assets/editorial/home-05.jpg"
            alt="A sequence of timber dining chairs made for a contract interior"
            width="980"
            height="400"
          />
          <figcaption>
            <span>Based in Portugal</span>
            <span>Made to order</span>
          </figcaption>
        </figure>
        <a className="hero__scroll" href="#introduction">
          <ArrowDown aria-hidden="true" size={17} strokeWidth={1.5} />
          Scroll to discover
        </a>
      </section>

      <section className="home-intro shell" id="introduction">
        <p className="eyebrow">Canvas · Founded 2012</p>
        <div className="home-intro__grid">
          <h2>A furniture atelier<br />for rooms that matter.</h2>
          <div>
            <p>
              Canvas works with architects, designers, operators and private clients who expect furniture to carry the same intention as the interior around it.
            </p>
            <p>
              Deep production knowledge gives us the freedom to refine an existing form or develop a fully bespoke response — always with material integrity and close personal attention.
            </p>
            <Link className="text-link" to="/studio">
              Our story and approach
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="world-story">
        <div className="shell world-story__inner">
          <figure>
            <img
              src="/assets/editorial/home-07.jpg"
              alt="Close detail of a timber, metal and upholstered Canvas chair"
              width="980"
              height="400"
              loading="lazy"
            />
          </figure>
          <div className="world-story__copy">
            <p className="eyebrow eyebrow--light">A Portugal-based studio with international reach</p>
            <h2>One point of view.<br />Many places.</h2>
            <p>
              Based in Portugal, Canvas undertakes multiple international projects each year. Our experience extends from established interiors in London and Portugal to project work in Tel Aviv — each commission shaped around its location, programme and audience.
            </p>
            <dl>
              <div><dt>Based</dt><dd>Portugal</dd></div>
              <div><dt>Reach</dt><dd>International</dd></div>
              <div><dt>Disciplines</dt><dd>Hospitality · Private · Contract</dd></div>
              <div><dt>Approach</dt><dd>Made to order</dd></div>
            </dl>
            <Link className="text-link text-link--light" to="/projects">
              Discover our project experience
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="category-section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The furniture library</p>
            <h2>A considered library<br />of adaptable forms.</h2>
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
                  <img
                    src={category.image}
                    alt=""
                    width="400"
                    height="330"
                    loading="lazy"
                  />
                  <span aria-hidden="true" className="category-card__arrow">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </span>
                </span>
                <span className="category-card__meta">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{category.name}</strong>
                  <small>{category.count} forms</small>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="material-story">
        <div className="shell material-story__grid">
          <figure>
            <img
              src="/assets/editorial/home-03b.jpg"
              alt="A selection of timber samples showing varied grains and tones"
              width="980"
              height="400"
              loading="lazy"
            />
          </figure>
          <div>
            <p className="eyebrow">Material intelligence</p>
            <h2>Luxury begins with what can be felt.</h2>
            <p>
              Timber, metal, leather and textiles are chosen for touch, longevity and the way they mature in use. Dimensions, upholstery and finish are resolved as part of the interior — never as an afterthought.
            </p>
            <Link className="text-link" to="/contact">
              Tell us what you need
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="shell">
          <div className="section-heading section-heading--dark">
            <div>
              <p className="eyebrow eyebrow--light">A personal project service</p>
              <h2>Close collaboration.<br />Exacting execution.</h2>
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
            <p className="eyebrow">Selected forms</p>
            <h2>Three points of departure.</h2>
          </div>
          <p className="section-heading__copy">Each can change in material, colour, dimensions and finish.</p>
        </div>
        <div className="featured-products">
          {featuredProducts.map((product) => (
            <ProductCard product={product} featured key={product.code} />
          ))}
        </div>
      </section>

      <section className="editions-tease shell">
        <div className="editions-tease__number">01 — ∞</div>
        <div className="editions-tease__copy">
          <p className="eyebrow">Bespoke by Canvas</p>
          <h2>No two briefs<br />are the same.</h2>
          <p>
            Bring us a room, a drawing or an ambition. We work directly with every client to develop furniture with the right proportion, presence and performance for its setting.
          </p>
          <Link className="text-link" to="/contact">
            Begin a private project conversation
            <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
          </Link>
        </div>
        <figure>
          <img
            src="/assets/editorial/home-11.jpg"
            alt="Close detail of a solid timber furniture joint"
            width="980"
            height="400"
            loading="lazy"
          />
        </figure>
      </section>

      <ContactBanner />
    </div>
  );
}
