import { ArrowUpRight, GraduationCap, Terminal } from "lucide-react";
import { education } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function EducationSection() {
  return (
    <section
      id="education"
      className="section container education-section"
      aria-labelledby="education-heading"
      tabIndex={-1}
    >
      <Reveal>
        <SectionHeader
          number="06"
          label="education"
          title="A foundation."
          accent="Always growing."
        />
      </Reveal>
      <div className="education-grid">
        {education.map((item, index) => (
          <Reveal key={item.institution} delay={index * 70}>
            <article className="education-card">
              <div className="education-icon" aria-hidden="true">
                {item.current ? (
                  <GraduationCap size={25} strokeWidth={1.5} />
                ) : (
                  <Terminal size={24} strokeWidth={1.5} />
                )}
              </div>
              <div className="education-copy">
                <span
                  className={`education-status mono ${item.current ? "is-current" : ""}`}
                >
                  <span className="education-status-dot" />
                  {item.status}
                </span>
                <h3>{item.institution}</h3>
                <p>{item.program}</p>
              </div>
              <ArrowUpRight
                className="education-arrow"
                size={19}
                strokeWidth={1.3}
                aria-hidden="true"
              />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
