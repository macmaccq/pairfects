import Button from './Button.jsx'
import { CheckIcon, SparkIcon } from './Icons.jsx'

export default function ComingSoon({ badge, title, body, points = [], cta }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10 lg:p-12"
      data-testid="projects-coming-soon"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-mint-soft" />
      <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-mint">
            <SparkIcon className="h-3.5 w-3.5" />
            {badge}
          </p>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">{body}</p>
          {cta && (
            <Button to={cta.to} variant="dark" className="mt-7">
              {cta.label}
            </Button>
          )}
        </div>
        {points.length > 0 && (
          <ul className="space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 text-sm font-medium">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-ink">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
