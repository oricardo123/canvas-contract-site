import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactBanner } from "../components/ContactBanner";
import { PageIntro } from "../components/PageIntro";
import { clients, projectGroups } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

const projectMarkets = [
  ["01", "Portugal", "Our home base and the centre of our furniture practice."],
  ["02", "United Kingdom", "Longstanding experience across hospitality, private clubs and distinctive interiors."],
  ["03", "Tel Aviv", "Part of Canvas's international project experience, delivered around a specific interior brief."],
  ["04", "International", "Multiple cross-border projects each year, managed with close and consistent oversight."],
];

export function ProjectsPage() {
  usePageMeta(
    "Projects",
    "A Portugal-based atelier developing made-to-order furniture for hospitality, contract and private projects internationally.",
    { path: "/projects", image: "/assets/editorial/portfolio.jpg" },
  );

  return (
    <div className="projects-page">
      <PageIntro
        eyebrow="Selected international experience"
        title="From Portugal to remarkable interiors worldwide."
        copy={
          <p>
            From Portugal, Canvas develops furniture for multiple international projects each year — from established hotels and restaurants to private clubs and singular interiors.
          </p>
        }
        side={<span className="page-count">Portugal · International</span>}
      />

      <section className="project-gallery shell">
        <figure className="project-gallery__large">
          <img
            src="/assets/editorial/portfolio.jpg"
            alt="A grid of selected names from Canvas's project history"
            width="420"
            height="600"
          />
          <figcaption><span>Selected names</span><span>Project history</span></figcaption>
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
          <p>“The destination may change. The standard of attention does not.”</p>
        </blockquote>
      </section>

      <section className="project-reach">
        <div className="shell project-reach__inner">
          <div className="project-reach__heading">
            <p className="eyebrow eyebrow--light">Across borders</p>
            <h2>Based in Portugal.<br />Working internationally.</h2>
            <p>
              Our experience includes project work in Tel Aviv, alongside commissions in Portugal, the United Kingdom and other international markets. The list is deliberately indicative rather than exhaustive.
            </p>
          </div>
          <ol>
            {projectMarkets.map(([number, place, copy]) => (
              <li key={place}>
                <span>{number}</span>
                <h3>{place}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
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
          <p className="eyebrow">Selected project history</p>
          <h2>Relationships built through delivery.</h2>
          <p>
            A selection of venues and groups supplied by the Canvas furniture production team over its project history.
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
          <p className="eyebrow">Your project, wherever it is</p>
          <h2>Different destination. The same attention.</h2>
          <p>
            Tell us the quantities, programme, destination and level of customisation. You will have a direct conversation about the right path through the collection or into bespoke development.
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
