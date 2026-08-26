import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="shell contact-banner__inner">
        <p className="eyebrow eyebrow--light">Project enquiry</p>
        <div>
          <h2>Have a project?</h2>
          <Link className="text-link text-link--light" to="/contact">
            Tell us what you need
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
