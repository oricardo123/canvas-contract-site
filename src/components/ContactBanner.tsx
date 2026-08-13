import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="shell contact-banner__inner">
        <p className="eyebrow eyebrow--light">Start a project</p>
        <div>
          <h2>Bring us the room.<br />We will help shape the piece.</h2>
          <Link className="text-link text-link--light" to="/contact">
            Discuss your brief
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
