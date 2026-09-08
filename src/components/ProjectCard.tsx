import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { WorkProject } from "../data/site";

interface ProjectCardProps {
  project: WorkProject;
  variant?: WorkProject["variant"];
}

export function ProjectCard({ project, variant = project.variant }: ProjectCardProps) {
  const image = project.images[0];

  return (
    <article className={`portfolio-card portfolio-card--${variant}`}>
      <Link
        className="portfolio-card__link"
        to={`/projects#${project.slug}`}
        aria-label={`View ${project.name} project`}
      >
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
            <h3>{project.name}</h3>
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
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
      </Link>
    </article>
  );
}
