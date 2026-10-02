import PageHero from '../components/PageHero.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ComingSoon from '../components/ComingSoon.jsx'
import { projects } from '../data/projects.js'
import { projectsContent } from '../data/pageContent.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function Projects() {
  useDocumentTitle('Projects')
  const { hero, comingSoon } = projectsContent

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          {projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <ComingSoon {...comingSoon} />
          )}
        </div>
      </section>
    </>
  )
}
