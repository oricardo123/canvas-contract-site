import { ArrowUpRight } from "lucide-react";
import type { WorkProject } from "../data/site";

interface WorkProjectShowcaseProps {
  project: WorkProject;
  priority?: boolean;
}

export function WorkProjectShowcase({ project, priority = false }: WorkProjectShowcaseProps) {
  const titleId = `${project.slug}-title`;

  return (
    <article className="work-project shell" id={project.slug} aria-labelledby={titleId}>
      <header className="work-project__header">
        <h2 id={titleId}>{project.name}</h2>
        <div className="work-project__meta">
          <dl>
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Work</dt>
              <dd>{project.scope}</dd>
            </div>
          </dl>
          <a
            className="text-link work-project__venue-link"
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.name} official website (opens in a new tab)`}
          >
            Official website
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
          </a>
        </div>
      </header>

      <div className={`work-project__gallery work-project__gallery--${project.images.length}`}>
        {project.images.map((image, imageIndex) => {
          const loadImmediately = priority && imageIndex === 0;

          return (
            <figure key={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading={loadImmediately ? "eager" : "lazy"}
                decoding="async"
              />
            </figure>
          );
        })}
      </div>
    </article>
  );
}
