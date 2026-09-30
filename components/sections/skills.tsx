import {
  Braces,
  Database,
  LayoutTemplate,
  Network,
  Server,
  Terminal,
} from "lucide-react";
import { skills } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const icons = {
  code: Braces,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  terminal: Terminal,
  network: Network,
};

export function SkillsSection() {
  return (
    <section
      id="stack"
      className="section container"
      aria-labelledby="stack-heading"
      tabIndex={-1}
    >
      <Reveal>
        <SectionHeader
          number="03"
          label="stack"
          title="Every layer."
          accent="Connected."
          description="The technologies I use to turn an idea into a working system."
        />
      </Reveal>
      <div className="stack-topline" aria-hidden="true">
        <span className="stack-root">
          <span className="status-dot" />
          FULL-STACK DEVELOPMENT
        </span>
        <span className="stack-connector" />
        <span className="mono">TOOLS OF THE TRADE</span>
      </div>
      <div className="skills-grid">
        {skills.map((group, index) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.id} delay={(index % 3) * 60}>
              <article className="skill-group" id={`skill-${group.id}`}>
                <div className="skill-group-top">
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  <span className="mono">0{index + 1}</span>
                </div>
                <h3>{group.name}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {group.id === "networking" && (
                  <div className="network-mini" aria-hidden="true">
                    <i />
                    <span />
                    <i />
                    <span />
                    <i />
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
