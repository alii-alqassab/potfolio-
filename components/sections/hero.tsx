import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Download,
  MapPin,
} from "lucide-react";
import { personal } from "@/data/portfolio";
import { SystemCore } from "@/components/visual/system-core";
import { StatusBadge } from "@/components/ui/status-badge";

export function Hero({ resumeUrl }: { resumeUrl?: string }) {
  return (
    <section
      id="home"
      className="hero container"
      aria-labelledby="hero-heading"
      tabIndex={-1}
    >
      <div className="hero-main">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow-rule" />
            <span>DEVELOPER. BUILDER. ALWAYS A STUDENT.</span>
          </div>
          <h1 id="hero-heading">
            {personal.firstName}
            <br />
            {personal.lastName}
            <span className="name-period">.</span>
          </h1>
          <p className="hero-role">
            {personal.studentStatus}
            <br />
            <span className="role-ampersand">&</span>{" "}
            <span className="text-accent">{personal.role}</span>
          </p>
          <p className="hero-description">{personal.introduction}</p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              View my work <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a href="#contact" className="button button-secondary">
              Contact me <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-details">
            <span>
              <MapPin size={13} aria-hidden="true" />
              Based in {personal.location}
            </span>
            <span className="detail-divider" aria-hidden="true" />
            <StatusBadge>Building & learning</StatusBadge>
            {resumeUrl && (
              <a href={resumeUrl} download className="resume-link">
                <Download size={13} aria-hidden="true" />
                Download CV
              </a>
            )}
          </div>
        </div>
        <SystemCore />
      </div>
      <div className="hero-baseline">
        <a href="#profile" className="scroll-cue">
          <ArrowDown size={14} aria-hidden="true" />
          <span>SCROLL TO EXPLORE</span>
        </a>
        <p>
          Interfaces <ArrowRight size={12} aria-hidden="true" /> APIs{" "}
          <ArrowRight size={12} aria-hidden="true" /> Databases{" "}
          <ArrowRight size={12} aria-hidden="true" /> Real-time
        </p>
        <span className="baseline-note">BUILT TO CONNECT.</span>
      </div>
    </section>
  );
}
