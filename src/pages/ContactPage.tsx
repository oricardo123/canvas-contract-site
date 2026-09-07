import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { FurnitureImage } from "../components/FurnitureImage";
import { PageIntro } from "../components/PageIntro";
import { contact } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

export function ContactPage() {
  const [formNote, setFormNote] = useState("");
  usePageMeta(
    "Contact",
    "Contact Canvas about a furniture project, product specification or custom piece.",
    { path: "/contact", image: "/assets/editorial/canvas-armchair-email-2025.jpg" },
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const projectType = String(data.get("projectType") ?? "Project enquiry");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`${projectType} — ${name}`);
    const body = encodeURIComponent(`${message}\n\nName: ${name}\nEmail: ${email}`);
    setFormNote("Your email application is opening with this enquiry ready to send.");
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-page page-enter">
      <PageIntro
        eyebrow="Contact"
        title="Tell us about your project."
        copy={
          <p>
            Send the location, products, quantities and required delivery date. Include drawings or product references if available.
          </p>
        }
        side={<span className="page-count">UK · Portugal · International</span>}
      />

      <section className="contact-layout shell">
        <div className="contact-details">
          <div className="contact-details__primary">
            <p className="eyebrow">General enquiries</p>
            <a href={`mailto:${contact.email}`}>
              <Mail aria-hidden="true" size={19} strokeWidth={1.5} />
              {contact.email}
            </a>
            <a href={`tel:${contact.ukPhoneHref}`}>
              <Phone aria-hidden="true" size={19} strokeWidth={1.5} />
              {contact.ukPhone}
            </a>
            <a href={`tel:${contact.ptPhoneHref}`}>
              <Phone aria-hidden="true" size={19} strokeWidth={1.5} />
              {contact.ptPhone}
            </a>
          </div>
          <div className="contact-addresses">
            <div>
              <p className="contact-label"><MapPin aria-hidden="true" size={16} />Trading address</p>
              <address>{contact.tradingAddress.map((line) => <span key={line}>{line}</span>)}</address>
            </div>
            <div>
              <p className="contact-label"><MapPin aria-hidden="true" size={16} />Registered office</p>
              <address>{contact.registeredOffice.map((line) => <span key={line}>{line}</span>)}</address>
              <p>Company no. {contact.companyNumber}</p>
            </div>
          </div>
          <figure>
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
            <figcaption>Prefer to talk? Call our UK or Portugal number.</figcaption>
          </figure>
        </div>

        <form className="enquiry-form" onSubmit={handleSubmit}>
          <div className="enquiry-form__heading">
            <p className="eyebrow">Project enquiry</p>
            <h2>Project details.</h2>
          </div>
          <label>
            <span>Your name</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Email address</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>What can we help with?</span>
            <select name="projectType" defaultValue="Hospitality project">
              <option>Hospitality project</option>
              <option>Private project</option>
              <option>Product information</option>
              <option>Custom furniture</option>
              <option>Other enquiry</option>
            </select>
          </label>
          <label>
            <span>Project details</span>
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Location, products, quantities, dates and references…"
            />
          </label>
          <button className="button button--dark button--wide" type="submit">
            Prepare email enquiry
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </button>
          <p className="form-helper">This opens your usual email application. No details are stored by this preview.</p>
          <p className="form-status" aria-live="polite">{formNote}</p>
        </form>
      </section>
    </div>
  );
}
