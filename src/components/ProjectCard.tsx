import type { WorkProject } from "../data/site";

interface ProjectCardProps {
  project: WorkProject;
  index: number;
  variant?: WorkProject["variant"];
}

export function ProjectCard({ project, index, variant = project.variant }: ProjectCardProps) {
  const image = project.images[0];
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={`portfolio-card portfolio-card--${variant}`}>
      <figure className="portfolio-card__image">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="portfolio-card__caption">
        <div className="portfolio-card__title">
          <span aria-hidden="true">{number}</span>
          <h3>{project.name}</h3>
        </div>
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
      </div>
    </article>
  );
}
