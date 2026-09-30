import { BriefcaseBusiness, UsersRound } from "lucide-react";
import { experiences } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section section-tinted"
      aria-labelledby="experience-heading"
      tabIndex={-1}
    >
      <div className="container">
        <Reveal>
          <SectionHeader
            number="02"
            label="experience"
            title="Built with teams."
            accent="Tested in practice."
            description="Real environments. Shared responsibilities. Lessons that carry into every build."
          />
        </Reveal>
        <div className="experience-timeline">
          {experiences.map((experience, index) => (
            <Reveal
              key={experience.company}
              className="experience-entry"
              delay={index * 80}
            >
              <div className="experience-date">
                <span className="timeline-dot" aria-hidden="true" />
                <p>
                  <time dateTime={experience.startDate}>
                    {experience.period.split(" – ")[0]}
                  </time>
                  <span className="date-separator"> — </span>
                  <time dateTime={experience.endDate}>
                    {experience.period.split(" – ")[1]}
                  </time>
                </p>
                <span className="experience-sequence mono">
                  EXPERIENCE_0{index + 1}
                </span>
              </div>
              <article className="experience-card">
                <div className="experience-card-header">
                  <div>
                    <p className="company-name">{experience.company}</p>
                    <h3>{experience.role}</h3>
                    {experience.project && (
                      <p className="experience-project">{experience.project}</p>
                    )}
                  </div>
                  <span className="experience-icon" aria-hidden="true">
                    {index === 0 ? (
                      <UsersRound size={22} strokeWidth={1.5} />
                    ) : (
                      <BriefcaseBusiness size={22} strokeWidth={1.5} />
                    )}
                  </span>
                </div>
                <p className="experience-summary">{experience.summary}</p>
                <ul className="responsibility-list">
                  {experience.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
                <dl className="experience-metadata">
                  {experience.metadata.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
