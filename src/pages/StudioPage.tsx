import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactBanner } from "../components/ContactBanner";
import { PageIntro } from "../components/PageIntro";
import { usePageMeta } from "../hooks/usePageMeta";

const values = [
  ["01", "Judgement", "We begin with the room: its atmosphere, its use and the role each piece should play."],
  ["02", "Adaptability", "An existing form can be refined in proportion and material, or become the beginning of something entirely new."],
  ["03", "Integrity", "Direct communication, sound construction and an exacting finish underpin every international commission."],
];

export function StudioPage() {
  usePageMeta(
    "Studio",
    "Discover the Portugal-based expertise, international experience and made-to-order approach behind Canvas Contract Furniture.",
    { path: "/studio", image: "/assets/editorial/home-07.jpg" },
  );

  return (
    <div className="studio-page">
      <PageIntro
        eyebrow="The atelier · Portugal"
        title="Production knowledge, guided by a designer’s eye."
        copy={
          <p>
            Canvas is a Portugal-based furniture atelier serving ambitious hospitality, contract and private projects internationally.
          </p>
        }
        side={<span className="page-count">Est. 2012</span>}
      />

      <section className="studio-lead shell">
        <figure className="studio-lead__image">
          <img
            src="/assets/editorial/home-07.jpg"
            alt="Close detail of cream leather upholstery, timber and polished metal"
            width="980"
            height="400"
          />
        </figure>
        <div className="studio-lead__copy">
          <p className="eyebrow">From concept to placement</p>
          <h2>Expertise that follows the piece all the way into the room.</h2>
          <p>
            Canvas combines trusted relationships with specialist European makers and an experienced manufacturing team to develop original furniture for complex briefs.
          </p>
          <p>
            This breadth makes it possible to work at different scales — from one carefully resolved object to a complete international furniture programme — without losing personal oversight.
          </p>
        </div>
      </section>

      <section className="origin-story shell">
        <div className="origin-story__title">
          <p className="eyebrow">The background</p>
          <h2>A career built through materials, making and people.</h2>
        </div>
        <div className="origin-story__copy">
          <p>
            Founder Carlos de Almeida's interest in furniture began with an early understanding of leather, timber and how materials work together. Cabinetmaking training and marketing management later opened a career spanning retail in Sydney, production, export and furniture manufacture in Portugal.
          </p>
          <p>
            Work with designers and architects — including Gal Tevet, Jorge Gonçalves and Siza Vieira — broadened that experience into furniture collections and hospitality projects for international markets.
          </p>
          <p>
            Canvas was a natural evolution: a studio based in Portugal and focused on customised furniture for hotels, restaurants, private spaces and high-end interiors worldwide, grounded equally in creative possibility and production reality.
          </p>
        </div>
        <div className="craft-strip" aria-label="Furniture making details">
          <figure>
            <img src="/assets/editorial/craft-01.jpg" alt="Hands arranging lengths of timber veneer" width="172" height="167" loading="lazy" />
          </figure>
          <figure>
            <img src="/assets/editorial/craft-02.jpg" alt="Craftsperson shaping upholstery by hand" width="172" height="83" loading="lazy" />
          </figure>
          <figure>
            <img src="/assets/editorial/craft-03.jpg" alt="Upholsterer stitching leather on an industrial sewing machine" width="172" height="166" loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="values-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What guides us</p>
              <h2>Beauty, performance and longevity — resolved together.</h2>
            </div>
          </div>
          <ol className="values-grid">
            {values.map(([number, title, copy]) => (
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
          <p className="eyebrow">Portugal at the centre</p>
          <h2>An international studio with a personal working rhythm.</h2>
        </div>
        <div>
          <p>
            Each year, we work across multiple international projects with interior designers, architects, operators and private clients. Wherever the destination, the relationship remains direct and the furniture is developed to belong to its place.
          </p>
          <Link className="text-link" to="/projects">
            View selected project experience
            <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <section className="name-story shell">
        <p className="eyebrow">Why Canvas?</p>
        <div>
          <article>
            <span>01</span>
            <h2>Strength.</h2>
            <p>
              Canvas has covered furniture and formed hard-working objects for centuries. The name speaks to the durability required of every contract piece.
            </p>
          </article>
          <article>
            <span>02</span>
            <h2>Possibility.</h2>
            <p>
              A blank canvas is an invitation to design — an open surface on which the right response to a client's requirements can be created.
            </p>
          </article>
        </div>
      </section>
      <ContactBanner />
    </div>
  );
}
