import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="shell contact-banner__inner">
        <div>
          <p className="eyebrow">Project enquiry</p>
          <h2>Have a project?</h2>
        </div>
        <Link className="button" to="/contact">
          Tell us what you need
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
