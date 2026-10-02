import { QuoteIcon } from './Icons.jsx'

function Portrait({ member, className = '' }) {
  return (
    <img
      src={member.image}
      alt={member.imageAlt}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: member.imagePosition }}
      data-testid="member-photo"
    />
  )
}

function TagList({ label, items, tone = 'mint' }) {
  if (!items?.length) return null
  const chip =
    tone === 'mint'
      ? 'bg-mint-soft text-mint-deep'
      : 'border border-line bg-white text-ink'
  return (
    <div>
      <h4 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</h4>
      <ul className="mt-2.5 flex flex-wrap gap-2" aria-label={`${label}`}>
        {items.map((item) => (
          <li key={item} className={`rounded-full px-3 py-1 text-[0.8rem] font-medium ${chip}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Every piece of a member card reads from the same `member` object, so the
// name, role, bio, and photo always belong to the same person.
export default function MemberCard({ member, variant = 'preview', index = 0 }) {
  const number = String(index + 1).padStart(2, '0')

  if (variant === 'preview') {
    return (
      <article
        className="group overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
        data-testid="member-card"
        data-member-id={member.id}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-mint-soft sm:aspect-square">
          <Portrait member={member} className="transition duration-500 group-hover:scale-[1.03]" />
          <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 font-display text-xs font-bold text-mint">
            {number}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold leading-tight" data-testid="member-name">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-mint-deep">{member.role}</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{member.summary}</p>
        </div>
      </article>
    )
  }

  return (
    <article
      className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-card md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      data-testid="member-card"
      data-member-id={member.id}
      id={member.id}
    >
      <div className="relative aspect-[4/5] bg-mint-soft md:aspect-auto md:min-h-full">
        <Portrait member={member} className="md:absolute md:inset-0" />
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 font-display text-xs font-bold text-mint">
          {number}
        </span>
      </div>
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint-deep">{member.role}</p>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl" data-testid="member-name">
            {member.name}
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-ink">{member.summary}</p>
        </header>
        <p className="leading-relaxed text-muted">{member.bio}</p>
        <TagList label="Skills" items={member.skills} />
        <TagList label="Tools & Technology" items={member.tools} tone="plain" />
        {member.motto && (
          <blockquote className="mt-auto flex items-start gap-3 rounded-2xl bg-paper p-4 text-sm font-medium italic text-ink">
            <QuoteIcon className="mt-0.5 h-4 w-4 shrink-0 text-mint-deep" />
            <span>{member.motto}</span>
          </blockquote>
        )}
      </div>
    </article>
  )
}
