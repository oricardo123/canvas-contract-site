interface ProjectPlaceholderCardProps {
  index: number;
  variant?: "standard" | "wide" | "tall";
}

export function ProjectPlaceholderCard({
  index,
  variant = "standard",
}: ProjectPlaceholderCardProps) {
  const number = String(index).padStart(2, "0");

  return (
    <article className={`portfolio-card portfolio-card--${variant}`}>
      <div
        className="portfolio-card__image"
        role="img"
        aria-label={`Placeholder for project ${number} photography`}
      >
        <span aria-hidden="true">{number}</span>
        <small>Project image</small>
      </div>
      <div className="portfolio-card__caption">
        <h3>Project name</h3>
        <dl>
          <div>
            <dt>Client</dt>
            <dd><span aria-hidden="true">—</span><span className="sr-only">To be added</span></dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd><span aria-hidden="true">—</span><span className="sr-only">To be added</span></dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd><span aria-hidden="true">—</span><span className="sr-only">To be added</span></dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
