import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactBanner } from "../components/ContactBanner";
import { ProductCard } from "../components/ProductCard";
import { catalog } from "../data/catalog";
import { usePageMeta } from "../hooks/usePageMeta";

const process = [
  ["01", "Listen", "The room, the service and the people who will use it come first."],
  ["02", "Develop", "Proportion, finish and construction are resolved around your brief."],
  ["03", "Make", "Every piece is produced to order with contract-grade attention to detail."],
  ["04", "Deliver", "From a singular piece to a complete scheme, we see the project through."],
];

const featuredProducts = [
  catalog[0].products[0],
  catalog[2].products[7],
  catalog[4].products[3],
];

export function HomePage() {
  usePageMeta(
    "Custom Furniture",
    "Made-to-order furniture for hospitality, contract settings and distinctive interiors.",
    { path: "/", image: "/assets/editorial/home-05.jpg" },
  );

  return (
    <div className="home-page page-enter">
      <section className="hero shell">
        <div className="hero__copy">
          <p className="eyebrow">Custom furniture · London & Portugal</p>
          <h1>
            Furniture, made<br />
            <em>around a room.</em>
          </h1>
          <p className="hero__lead">
            Distinctive pieces for hotels, restaurants, contract environments and singular interiors — developed with you, made to order.
          </p>
          <div className="hero__actions">
            <Link className="button button--dark" to="/collection">
              Explore the collection
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
            <Link className="text-link" to="/contact">
              Discuss a project
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
            <span>Made to order</span>
            <span>Contract standard</span>
          </figcaption>
        </figure>
        <a className="hero__scroll" href="#introduction">
          <ArrowDown aria-hidden="true" size={17} strokeWidth={1.5} />
          Scroll to discover
        </a>
      </section>

      <section className="home-intro shell" id="introduction">
        <p className="eyebrow">Canvas, since 2012</p>
        <div className="home-intro__grid">
          <h2>Individual by design.<br />Exacting by nature.</h2>
          <div>
            <p>
              We believe in distinctive, functional furniture and meticulous attention to detail. Every chair, table and cabinet can be tailored to the requirements of the project.
            </p>
            <p>
              Our manufacturing background gives designers and clients the freedom to adapt an existing piece or develop something entirely bespoke.
            </p>
            <Link className="text-link" to="/studio">
              Our story and approach
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="category-section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The collection</p>
            <h2>Start with a form.<br />Make it your own.</h2>
          </div>
          <Link className="text-link" to="/collection">
            View all {catalog.reduce((sum, category) => sum + category.count, 0)} pieces
            <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="category-grid">
          {catalog.map((category, index) => (
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
            <p className="eyebrow">Made around you</p>
            <h2>Material is part of the conversation.</h2>
            <p>
              Timber, metal, leather and textiles are selected not only for appearance, but for how they feel, age and perform in use. We can adapt dimensions, upholstery and finishes to the interior.
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
              <p className="eyebrow eyebrow--light">How we work</p>
              <h2>One clear process.<br />No off-the-shelf thinking.</h2>
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
            <p className="eyebrow">A closer look</p>
            <h2>Three starting points.</h2>
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
        <div className="editions-tease__number">01 / 01</div>
        <div className="editions-tease__copy">
          <p className="eyebrow">Coming next · Canvas Editions</p>
          <h2>One piece.<br />Only once.</h2>
          <p>
            A future series of unique, immediately available objects — bringing the same material intelligence to collectible furniture.
          </p>
          <Link className="text-link" to="/contact">
            Register your interest
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
