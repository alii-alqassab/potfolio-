import { ArrowDown, Terminal } from "lucide-react";
import { moreBuilds, projects } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCard } from "@/components/ui/project-card";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section section-tinted"
      aria-labelledby="projects-heading"
      tabIndex={-1}
    >
      <div className="container">
        <Reveal>
          <SectionHeader
            number="04"
            label="projects"
            title="Ideas, turned into"
            accent="systems."
            description="A selection of builds across web, data, and real-time software. Each one, another connection."
          />
        </Reveal>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 80}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <details className="more-builds">
            <summary>
              <span className="more-builds-heading">
                <Terminal size={19} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  Beyond the interface
                  <span className="more-builds-caption">
                    Smaller builds. Deeper foundations.
                  </span>
                </span>
              </span>
              <span className="more-builds-action">
                Explore more builds <ArrowDown size={15} aria-hidden="true" />
              </span>
            </summary>
            <ul className="more-builds-grid">
              {moreBuilds.map((project) => (
                <li key={project.name}>
                  <span>{project.name}</span>
                  {project.technology && (
                    <span className="mono">{project.technology}</span>
                  )}
                </li>
              ))}
            </ul>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
