import { ArrowDownRight, ArrowUpRight, Check, Code2 } from "lucide-react";
import { ProjectVisual } from "@/components/visual/project-visual";
import { TechTag } from "@/components/ui/tech-tag";
import type { Project } from "@/types/portfolio";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className={`project-card ${project.featured ? "project-featured" : ""}`}
    >
      <ProjectVisual variant={project.visual} />
      <div className="project-body">
        <div className="project-kicker">
          <span>{project.category}</span>
          <span className="project-number">0{index + 1}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-highlights">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature}>
              <Check size={12} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="project-tags">
          {project.stack.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>
        <details className="project-details">
          <summary>
            <span>
              <Code2 size={15} aria-hidden="true" />
              Inside the build
            </span>
            <span className="detail-toggle" aria-hidden="true">
              <ArrowDownRight size={18} />
            </span>
          </summary>
          <div className="project-detail-content">
            <p>{project.architecture}</p>
            <p className="detail-subheading mono">CAPABILITIES</p>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </details>
        {(project.links?.github || project.links?.live) && (
          <div className="project-links">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} source on GitHub (opens in a new tab)`}
              >
                Source code <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name} live demo (opens in a new tab)`}
              >
                Live project <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
