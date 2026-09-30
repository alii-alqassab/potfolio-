import { Layers3, Puzzle, ShieldCheck, UsersRound } from "lucide-react";
import { principles } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const icons = {
  users: UsersRound,
  layers: Layers3,
  puzzle: Puzzle,
  check: ShieldCheck,
};

export function PrinciplesSection() {
  return (
    <section
      id="approach"
      className="section container"
      aria-labelledby="approach-heading"
      tabIndex={-1}
    >
      <Reveal>
        <SectionHeader
          number="05"
          label="approach"
          title="Good software takes"
          accent="more than code."
          description="The habits and principles I bring to a project — and the people building it."
        />
      </Reveal>
      <div className="principles-grid">
        {principles.map((principle, index) => {
          const Icon = icons[principle.icon];
          return (
            <Reveal key={principle.id} delay={index * 50}>
              <article className="principle">
                <div className="principle-icon">
                  <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                  <span className="principle-node" aria-hidden="true" />
                </div>
                <span className="principle-number mono">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
      <div className="principles-connection" aria-hidden="true">
        <span />
        <span className="mono">HOW I BUILD</span>
        <span />
      </div>
    </section>
  );
}
