import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { contact } from "../data/site";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__top">
        <div className="site-footer__intro">
          <BrandLogo light />
          <p>A Portugal-based atelier for hospitality, contract and distinctive interiors worldwide.</p>
        </div>
        <div className="site-footer__column">
          <p className="footer-label">Navigate</p>
          <Link to="/collection">Collection</Link>
          <Link to="/studio">Studio</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="site-footer__column">
          <p className="footer-label">Talk to us</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.ukPhoneHref}`}>{contact.ukPhone}</a>
          <a href={`tel:${contact.ptPhoneHref}`}>{contact.ptPhone}</a>
        </div>
        <div className="site-footer__column site-footer__edition">
          <p className="footer-label">Project desk</p>
          <p>Every commission begins with a direct conversation about place, programme and possibility.</p>
          <Link to="/contact">
            Begin a conversation
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} />
          </Link>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <p>© {new Date().getFullYear()} Canvas Contract Furniture</p>
        <p>Company no. {contact.companyNumber}</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
