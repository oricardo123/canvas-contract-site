import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="shell contact-banner__inner">
        <p className="eyebrow eyebrow--light">A direct conversation</p>
        <div>
          <h2>Every significant interior<br />begins with a conversation.</h2>
          <Link className="text-link text-link--light" to="/contact">
            Speak with the Canvas team
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
