import { ContactBanner } from "../components/ContactBanner";
import { PageIntro } from "../components/PageIntro";
import { WorkProjectShowcase } from "../components/WorkProjectShowcase";
import { featuredProjects, projectArchive } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

export function ProjectsPage() {
  usePageMeta(
    "Work",
    "Selected Canvas furniture projects for hotels and restaurants in Europe and beyond.",
    { path: "/projects", image: featuredProjects[0].images[0].src },
  );

  return (
    <div className="projects-page page-enter">
      <PageIntro
        eyebrow="Work"
        title="Selected projects."
        copy={
          <p>
            Furniture supplied for hotels and restaurants in Europe and beyond.
          </p>
        }
        side={<span className="page-count">International</span>}
      />

      <section className="work-showcase" aria-label="Selected work">
        {featuredProjects.map((project, index) => (
          <WorkProjectShowcase
            project={project}
            index={index}
            priority={index === 0}
            key={project.slug}
          />
        ))}
      </section>

      <section className="project-index shell" aria-labelledby="project-index-title">
        <div className="project-index__intro">
          <p className="eyebrow">Archive</p>
          <h2 id="project-index-title">Project record.</h2>
          <p>A wider selection of hospitality and private projects.</p>
        </div>
        <ol>
          {projectArchive.map((project, index) => (
            <li key={`${project.name}-${project.location}`}>
              <span className="project-index__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{project.name}</strong>
              <span>{project.location}</span>
              <span>{project.scope}</span>
            </li>
          ))}
        </ol>
      </section>

      <ContactBanner />
    </div>
  );
}
