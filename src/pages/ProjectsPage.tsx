import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactBanner } from "../components/ContactBanner";
import { PageIntro } from "../components/PageIntro";
import { clients, projectGroups } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

export function ProjectsPage() {
  usePageMeta(
    "Projects",
    "Canvas furniture has been produced for hospitality and contract projects in the UK, Portugal and internationally.",
    { path: "/projects", image: "/assets/editorial/portfolio.jpg" },
  );

  return (
    <div className="projects-page">
      <PageIntro
        eyebrow="Selected experience"
        title="Furniture made to become part of the place."
        copy={
          <p>
            Our production team has supplied established hotels, restaurants, private clubs and distinctive interiors — from regular collection pieces to elaborate custom commissions.
          </p>
        }
        side={<span className="page-count">Hospitality · Contract · Bespoke</span>}
      />

      <section className="project-gallery shell">
        <figure className="project-gallery__large">
          <img
            src="/assets/editorial/portfolio.jpg"
            alt="Canvas contract seating installed around tables in a hospitality interior"
            width="420"
            height="600"
          />
          <figcaption><span>Hospitality interiors</span><span>Furniture production</span></figcaption>
        </figure>
        <figure className="project-gallery__wide">
          <img
            src="/assets/editorial/home-05.jpg"
            alt="A sequence of made-to-order dining chairs"
            width="980"
            height="400"
          />
          <figcaption><span>Contract seating</span><span>Made to order</span></figcaption>
        </figure>
        <blockquote>
          <p>“From a single customised piece to a complete production run, the ideal solution begins with understanding the project.”</p>
        </blockquote>
      </section>

      <section className="project-types shell">
        <p className="eyebrow">Where we work</p>
        <ol>
          {projectGroups.map((group) => (
            <li key={group.number}>
              <span>{group.number}</span>
              <h2>{group.title}</h2>
              <p>{group.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="client-list shell">
        <div className="client-list__intro">
          <p className="eyebrow">Selected names</p>
          <h2>A history of trusted production.</h2>
          <p>
            A selection of venues and groups supplied by the Canvas furniture production team.
          </p>
        </div>
        <ul>
          {clients.map((client, index) => (
            <li key={client}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {client}
            </li>
          ))}
        </ul>
      </section>

      <section className="project-note shell">
        <img
          src="/assets/editorial/home-01.jpg"
          alt="Close detail of a diamond-tufted upholstered chair"
          width="980"
          height="400"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">Your project</p>
          <h2>Different scale. Same attention.</h2>
          <p>
            Tell us the quantities, target date, location and level of customisation. We will help identify the most appropriate path through the collection or into bespoke development.
          </p>
          <Link className="text-link" to="/contact">
            Share your brief
            <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
      <ContactBanner />
    </div>
  );
}
