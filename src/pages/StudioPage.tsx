import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactBanner } from "../components/ContactBanner";
import { usePageMeta } from "../hooks/usePageMeta";

export function StudioPage() {
  usePageMeta(
    "About Canvas",
    "Canvas is a Portugal-based furniture company supplying made-to-order furniture for contract and private projects.",
    { path: "/studio", image: "/assets/editorial/canvas-loungers-email-2025.jpg" },
  );

  return (
    <div className="studio-page page-enter">
      <section className="studio-lead shell" aria-labelledby="studio-title">
        <div className="studio-lead__copy">
          <h1 id="studio-title">Fine contract &amp; private projects</h1>
          <p>
            Founded by Carlos Almeida in 2010. Canvas has now its production operation established in Portugal and continues growing its international Client base
          </p>
          <p>
            Canvas supplies seating, tables, sofas, benches and case goods. Products from the collection can be changed in size, material and finish
          </p>
          <p>
            New furniture can also be developed from drawings or a project brief
          </p>
        </div>
        <figure className="studio-lead__image">
          <img
            src="/assets/editorial/canvas-loungers-email-2025.jpg"
            alt="Upholstered timber loungers from the Canvas furniture portfolio"
            width="3783"
            height="2825"
            style={{ objectPosition: "50% 100%" }}
          />
        </figure>
      </section>

      <section className="origin-story shell">
        <figure className="founder-portrait">
          <img
            src="/assets/editorial/carlos-de-almeida-portrait-2017.jpg"
            alt="Carlos Carvalho De Almeida, founder of Canvas"
            width="1602"
            height="1602"
            loading="lazy"
          />
          <figcaption>Photograph: José Luís Almeida</figcaption>
        </figure>
        <div className="origin-story__profile">
          <div className="origin-story__title">
            <p className="eyebrow">Founder</p>
            <h2>Carlos Carvalho De Almeida</h2>
          </div>
          <div className="origin-story__copy">
            <p>
              The love for materials, furniture design, the experience with his family's shoe making trade, have provided a natural understanding for materials, textures and the way they work together
            </p>
            <p>
              Cabinet Technical training, Marketing Management, commercial experience along with his love &amp; passion for design, in Sydney Australia, are the foundations for a long enriching and professional experience journey, from Australia to Europe, America, The Middle East &amp; Asia
            </p>
            <p>
              Canvas has been, over the time, contracted to develop and produce pieces of furniture for award winning projects for credible and renowned Designers, Architects and Hoteliers
            </p>
          </div>
        </div>
      </section>

      <div className="studio-focus shell">
        <p>
          Canvas works with interior designers, architects, operators and private clients on projects in Portugal and abroad
        </p>
        <Link className="text-link" to="/projects">
          View work
          <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
        </Link>
      </div>

      <ContactBanner />
    </div>
  );
}
