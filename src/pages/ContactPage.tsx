import { contact } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

export function ContactPage() {
  usePageMeta(
    "Contact",
    "Contact Canvas about a furniture project, product specification or custom piece.",
    { path: "/contact", image: "/assets/editorial/canvas-armchair-email-2025.jpg" },
  );

  return (
    <div className="contact-page page-enter">
      <div className="contact-content shell">
        <header className="contact-intro">
          <h1>Contact Canvas</h1>
        </header>

        <div className="contact-layout">
          <section className="contact-method contact-email" aria-labelledby="contact-email-heading">
            <h2 className="contact-label" id="contact-email-heading">Email</h2>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`mailto:${contact.salesEmail}`}>{contact.salesEmail}</a>
          </section>

          <section className="contact-method contact-phone" aria-labelledby="contact-phone-heading">
            <h2 className="contact-label" id="contact-phone-heading">Telephone</h2>
            <a href={`tel:${contact.ukPhoneHref}`}>{contact.ukPhone}</a>
            <a href={`tel:${contact.ptPhoneHref}`}>{contact.ptPhone}</a>
          </section>

          <section className="contact-trading" aria-labelledby="trading-address-heading">
            <h2 className="contact-label" id="trading-address-heading">Trading address</h2>
            <address>{contact.tradingAddress.map((line) => <span key={line}>{line}</span>)}</address>
            <p className="contact-addresses__number">VAT Number: {contact.vatNumber}</p>
          </section>

          <section className="contact-history" aria-labelledby="contact-history-heading">
            <h2 className="contact-label" id="contact-history-heading">Historical company details</h2>
            <p className="contact-history__label">Original Registered Office</p>
            <address>{contact.registeredOffice.map((line) => <span key={line}>{line}</span>)}</address>
            <p className="contact-addresses__number">Company no. {contact.companyNumber}</p>
          </section>

          <figure className="contact-visual">
            <img
              src="/assets/editorial/canvas-armchair-email-2025.jpg"
              alt="Upholstered armchair from the Canvas furniture portfolio"
              width="3024"
              height="4032"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}
