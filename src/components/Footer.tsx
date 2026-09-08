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
          <p>Contract furniture for hotels, restaurants and private interiors. Based in Portugal</p>
        </div>
        <div className="site-footer__column">
          <p className="footer-label">Navigate</p>
          <Link to="/collection">Collection</Link>
          <Link to="/studio">About</Link>
          <Link to="/projects">Work</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="site-footer__column">
          <p className="footer-label">Talk to us</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`mailto:${contact.salesEmail}`}>{contact.salesEmail}</a>
          <a href={`tel:${contact.ukPhoneHref}`}>{contact.ukPhone}</a>
          <a href={`tel:${contact.ptPhoneHref}`}>{contact.ptPhone}</a>
        </div>
        <div className="site-footer__column site-footer__edition">
          <p className="footer-label">Enquiries</p>
          <p>Send the project location, products, quantities and delivery dates</p>
          <Link to="/contact">
            Contact Canvas
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} />
          </Link>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <p>© {new Date().getFullYear()} Canvas Contract Furniture</p>
        <p>Former company no. {contact.companyNumber}</p>
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
