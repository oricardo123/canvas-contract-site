import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { PageIntro } from "../components/PageIntro";
import { contact } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

export function ContactPage() {
  const [formNote, setFormNote] = useState("");
  usePageMeta(
    "Contact",
    "Begin a direct conversation with Canvas about an international project, product specification or bespoke furniture commission.",
    { path: "/contact", image: "/assets/editorial/contact-phone.jpg" },
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
        eyebrow="The project desk"
        title="A direct conversation, from first thought to final placement."
        copy={
          <p>
            Share the location, programme, quantity and ambition. A drawing is useful, but a simple description is enough to begin a personal conversation.
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
            <img
              src="/assets/editorial/contact-phone.jpg"
              alt="Vintage rotary telephone"
              width="280"
              height="280"
              loading="lazy"
            />
            <figcaption>Prefer to talk? Call our UK or Portugal number.</figcaption>
          </figure>
        </div>

        <form className="enquiry-form" onSubmit={handleSubmit}>
          <div className="enquiry-form__heading">
            <p className="eyebrow">Begin a conversation</p>
            <h2>Tell us about the place.</h2>
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
            <select name="projectType" defaultValue="Contract project">
              <option>Contract project</option>
              <option>International project</option>
              <option>Product specification</option>
              <option>Bespoke piece</option>
              <option>General enquiry</option>
            </select>
          </label>
          <label>
            <span>Project details</span>
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Location, quantities, target date and any product references…"
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
