import { FurnitureImage } from "../components/FurnitureImage";
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
      <header className="contact-intro shell">
        <h1>Contact Canvas</h1>
      </header>

      <section className="contact-layout shell" aria-label="Contact details">
        <div className="contact-details">
          <div className="contact-details__primary">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`mailto:${contact.salesEmail}`}>{contact.salesEmail}</a>
            <a href={`tel:${contact.ukPhoneHref}`}>{contact.ukPhone}</a>
            <a href={`tel:${contact.ptPhoneHref}`}>{contact.ptPhone}</a>
          </div>
          <figure className="contact-details__image">
            <div className="contact-photo">
              <FurnitureImage
                src="/assets/editorial/canvas-armchair-email-2025.jpg"
                alt="Upholstered armchair from the Canvas furniture portfolio"
                width={3024}
                height={4032}
                fit="cover"
                sourceInset={0}
                style={{ alignSelf: "end" }}
              />
            </div>
          </figure>
        </div>

        <div className="contact-addresses">
          <section aria-labelledby="trading-address-heading">
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
        </div>
      </section>
    </div>
  );
}
