import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import { getProjectBySlug } from '../data/projects.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import NotFound from './NotFound.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />
  return <ProjectView project={project} />
}

function ProjectView({ project }) {
  useDocumentTitle(project.title)

  return (
    <>
      <PageHero eyebrow={`${project.category} · ${project.year}`} title={project.title} intro={project.summary}>
        {project.link && (
          <Button href={project.link} target="_blank" rel="noopener noreferrer" className="mt-8">
            Visit project
          </Button>
        )}
      </PageHero>
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-4xl">
          {project.image && (
            <img src={project.image} alt={project.imageAlt} className="mb-10 w-full rounded-3xl border border-line object-cover shadow-card" />
          )}
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {project.tags?.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Project tags">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-mint-soft px-3 py-1 text-sm font-medium text-mint-deep">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <Link to="/projects" className="mt-12 inline-block font-semibold text-ink hover:text-mint-deep">
            ← Back to all projects
          </Link>
        </div>
      </section>
    </>
  )
}
