import { ContactBanner } from "../components/ContactBanner";
import { PageIntro } from "../components/PageIntro";
import { ProjectPlaceholderCard } from "../components/ProjectPlaceholderCard";
import { clients, projectGroups } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

export function ProjectsPage() {
  usePageMeta(
    "Projects",
    "Furniture supplied by Canvas for hotels, restaurants and private interiors in Portugal and international markets.",
    { path: "/projects" },
  );

  return (
    <div className="projects-page page-enter">
      <PageIntro
        eyebrow="Projects"
        title="Selected projects."
        copy={
          <p>
            Canvas has supplied furniture for hotels, restaurants, clubs and private spaces in Portugal and abroad.
          </p>
        }
        side={<span className="page-count">Portfolio</span>}
      />

      <section className="portfolio-section portfolio-section--archive shell" aria-labelledby="project-archive-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="project-archive-title">Project archive.</h2>
          </div>
          <p className="section-heading__copy">
            Photography and project details will be added here.
          </p>
        </div>
        <div className="portfolio-grid">
          <ProjectPlaceholderCard index={1} variant="wide" />
          <ProjectPlaceholderCard index={2} />
          <ProjectPlaceholderCard index={3} variant="tall" />
          <ProjectPlaceholderCard index={4} />
          <ProjectPlaceholderCard index={5} variant="wide" />
          <ProjectPlaceholderCard index={6} />
        </div>
      </section>

      <section className="client-list shell">
        <div className="client-list__intro">
          <p className="eyebrow">Selected clients</p>
          <h2>Project history.</h2>
          <p>A selection of clients and venues supplied by Canvas.</p>
        </div>
        <ul>
          {clients.map((client, index) => (
            <li key={client}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {client}
            </li>
          ))}
        </ul>
      </section>

      <section className="project-types shell">
        <p className="eyebrow">Project types</p>
        <ol>
          {projectGroups.map((group) => (
            <li key={group.number}>
              <span>{group.number}</span>
              <h2>{group.title}</h2>
              <p>{group.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <ContactBanner />
    </div>
  );
}
