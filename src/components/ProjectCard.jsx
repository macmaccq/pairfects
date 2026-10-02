import { Link } from 'react-router-dom'
import { ArrowRightIcon } from './Icons.jsx'

// Reusable card for real Pairfect projects. Not rendered while projects.js is empty.
export default function ProjectCard({ project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      {project.image && (
        <div className="aspect-[16/10] overflow-hidden bg-mint-soft">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-mint-deep">
          {project.category} · {project.year}
        </p>
        <h3 className="mt-2 text-xl font-bold leading-tight">{project.title}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
        <Link
          to={`/projects/${project.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink after:absolute after:inset-0 hover:text-mint-deep"
        >
          View project <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
