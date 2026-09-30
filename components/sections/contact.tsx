import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { personal } from "@/data/portfolio";
import { CopyEmail } from "@/components/ui/copy-email";
import { Reveal } from "@/components/ui/reveal";
import { StatusBadge } from "@/components/ui/status-badge";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section container contact-section"
      aria-labelledby="contact-heading"
      tabIndex={-1}
    >
      <Reveal>
        <div className="contact-panel">
          <div className="contact-decoration" aria-hidden="true">
            <svg viewBox="0 0 400 400" fill="none">
              <rect x="125" y="125" width="150" height="150" rx="16" />
              <rect x="80" y="80" width="240" height="240" rx="26" />
              <path d="M200 0V125 M200 275V400 M0 200H125 M275 200H400 M80 80L30 30 M320 320L370 370" />
              <circle cx="200" cy="200" r="15" />
            </svg>
          </div>
          <div className="contact-topline">
            <p className="section-label">
              <span>07</span>
              <span className="label-line" />
              /contact
            </p>
            <StatusBadge>Building & learning</StatusBadge>
          </div>
          <h2 id="contact-heading">
            Let’s build
            <br />
            something <span className="text-accent">useful.</span>
          </h2>
          <p className="contact-description">
            A project, a conversation, or a good technical challenge.
            <br className="desktop-break" /> I’d love to hear what you’re
            thinking.
          </p>
          <div className="contact-email-row">
            <a className="contact-email" href={`mailto:${personal.email}`}>
              <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>{personal.email}</span>
              <ArrowUpRight size={23} aria-hidden="true" />
            </a>
            <CopyEmail />
          </div>
          <div className="contact-bottomline">
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Ali Alqassab on LinkedIn (opens in a new tab)"
            >
              <span className="linkedin-symbol" aria-hidden="true">
                in
              </span>
              Let’s connect on LinkedIn{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a
              className="contact-phone"
              href={`tel:${personal.phone.replace(/\s/g, "")}`}
              aria-label={`Call Ali Alqassab at ${personal.phone}`}
            >
              <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
              {personal.phone}
            </a>
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ali Alqassab on GitHub (opens in a new tab)"
              >
                GitHub <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            <span className="contact-location">
              <MapPin size={14} aria-hidden="true" />
              {personal.location}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
