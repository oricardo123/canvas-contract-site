import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactBanner } from "../components/ContactBanner";
import { PageIntro } from "../components/PageIntro";
import { usePageMeta } from "../hooks/usePageMeta";

const services = [
  ["01", "Specify", "Products, dimensions, materials, finishes and quantities are agreed before production."],
  ["02", "Produce", "Furniture is made through specialist manufacturers and checked before dispatch."],
  ["03", "Deliver", "Packing and transport are planned around the site and delivery dates."],
];

export function StudioPage() {
  usePageMeta(
    "About Canvas",
    "Canvas is a Portugal-based furniture company supplying made-to-order furniture for contract and private projects.",
    { path: "/studio", image: "/assets/editorial/home-07.jpg" },
  );

  return (
    <div className="studio-page page-enter">
      <PageIntro
        eyebrow="About Canvas"
        title="Furniture for contract and private projects."
        copy={
          <p>
            Founded by Carlos de Almeida in 2012, Canvas is based in Portugal and works with clients internationally.
          </p>
        }
        side={<span className="page-count">Est. 2012</span>}
      />

      <section className="studio-lead shell">
        <figure className="studio-lead__image">
          <img
            src="/assets/editorial/home-07.jpg"
            alt="Detail of upholstery, timber and polished metal"
            width="980"
            height="400"
          />
        </figure>
        <div className="studio-lead__copy">
          <p className="eyebrow">What we do</p>
          <h2>From product selection to delivery.</h2>
          <p>
            Canvas supplies seating, tables, sofas, benches and case goods. Products from the collection can be changed in size, material and finish.
          </p>
          <p>
            New furniture can also be developed from drawings or a project brief.
          </p>
        </div>
      </section>

      <section className="origin-story shell">
        <div className="origin-story__title">
          <p className="eyebrow">Founder</p>
          <h2>Carlos de Almeida.</h2>
        </div>
        <div className="origin-story__copy">
          <p>
            Carlos de Almeida's background includes cabinetmaking training, furniture retail, production, export and manufacture in Portugal.
          </p>
          <p>
            After working with designers, architects and manufacturers across international markets, he founded Canvas to supply made-to-order furniture for hospitality and private projects.
          </p>
        </div>
        <div className="craft-strip" aria-label="Furniture production details">
          <figure>
            <img src="/assets/editorial/craft-01.jpg" alt="Hands arranging lengths of timber veneer" width="172" height="167" loading="lazy" />
          </figure>
          <figure>
            <img src="/assets/editorial/craft-02.jpg" alt="A craftsperson shaping upholstery by hand" width="172" height="83" loading="lazy" />
          </figure>
          <figure>
            <img src="/assets/editorial/craft-03.jpg" alt="An upholsterer stitching leather" width="172" height="166" loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="values-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Service</p>
              <h2>A clear production process.</h2>
            </div>
          </div>
          <ol className="values-grid">
            {services.map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="studio-focus shell">
        <div>
          <p className="eyebrow">Projects</p>
          <h2>Portugal and international work.</h2>
        </div>
        <div>
          <p>
            Canvas works with interior designers, architects, operators and private clients on projects in Portugal and abroad.
          </p>
          <Link className="text-link" to="/projects">
            View projects
            <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <ContactBanner />
    </div>
  );
}
