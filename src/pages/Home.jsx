import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import MemberCard from '../components/MemberCard.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ComingSoon from '../components/ComingSoon.jsx'
import Logo from '../components/Logo.jsx'
import { ArrowRightIcon, CalendarIcon, SparkIcon, UsersIcon } from '../components/Icons.jsx'
import { organization } from '../data/organization.js'
import { members } from '../data/members.js'
import { projects } from '../data/projects.js'
import { homeContent, projectsContent } from '../data/pageContent.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

function HeroVisual() {
  const [first, second] = members
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-label="The Pairfect team" role="group">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[first, second].map((member, index) => (
          <figure
            key={member.id}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-ink-soft shadow-2xl sm:rounded-3xl ${
              index === 1 ? 'mt-10 sm:mt-14' : ''
            }`}
            data-testid="hero-member"
            data-member-id={member.id}
          >
            <img
              src={member.image}
              alt={member.imageAlt}
              className="aspect-[3/4] w-full object-cover"
              style={{ objectPosition: member.imagePosition }}
              fetchPriority="high"
            />
            <figcaption className="p-3 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-gradient-to-t sm:from-ink sm:via-ink/80 sm:to-transparent sm:p-4 sm:pt-12">
              <span className="block text-sm font-bold leading-tight text-white sm:text-base">{member.name}</span>
              <span className="mt-0.5 block text-[0.7rem] font-medium text-mint sm:text-xs">{member.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-ink p-1.5 shadow-xl ring-4 ring-ink sm:block">
        <Logo className="h-14 w-14" decorative={false} />
      </div>
    </div>
  )
}

const highlights = [
  { icon: CalendarIcon, value: String(organization.founded), label: 'Founded' },
  { icon: UsersIcon, value: String(members.length), label: 'Members' },
  { icon: SparkIcon, value: 'Coming soon', label: 'Projects', show: projects.length === 0 },
].filter((item) => item.show !== false)

export default function Home() {
  useDocumentTitle()
  const { about, team, finalCta } = homeContent

  return (
    <>
      {/* Hero */}
      <section className="dot-grid relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-mint/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />
        <div className="container-page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-mint sm:text-xs">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mint" />
              {homeContent.badge}
            </p>
            <h1 className="mt-6 font-display text-[3.4rem] font-extrabold leading-[0.95] tracking-tight min-[400px]:text-[4.2rem] sm:text-7xl lg:text-8xl">
              {organization.displayName}
            </h1>
            <p className="mt-4 font-display text-xl font-semibold text-mint sm:text-2xl">{organization.tagline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-dark sm:text-lg">{homeContent.intro}</p>
            <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
              <Button to={homeContent.primaryCta.to}>{homeContent.primaryCta.label}</Button>
              <Button to={homeContent.secondaryCta.to} variant="ghostLight">
                {homeContent.secondaryCta.label}
              </Button>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3 border-t border-white/10 pt-6" data-testid="hero-highlights">
              {highlights.map(({ icon: Icon, value, label }) => (
                <div key={label} className="min-w-0">
                  <dt className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-dark">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-mint" />
                    <span>{label}</span>
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-bold leading-tight text-white sm:text-2xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-rise [animation-delay:120ms]">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <SectionTitle eyebrow={about.eyebrow} title={about.title} />
          <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link
              to={about.cta.to}
              className="group inline-flex items-center gap-2 pt-2 font-semibold text-ink hover:text-mint-deep"
            >
              {about.cta.label}
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects / coming soon */}
      <section className="border-y border-line bg-white/60 py-20 sm:py-24">
        <div className="container-page">
          <SectionTitle eyebrow={homeContent.projects.eyebrow} title={homeContent.projects.title} />
          <div className="mt-10">
            {projects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 3).map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <ComingSoon {...projectsContent.comingSoon} cta={homeContent.projects.cta} />
            )}
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle eyebrow={team.eyebrow} title={team.title} intro={team.body} />
            <Button to={team.cta.to} variant="outline" className="self-start sm:self-auto">
              {team.cta.label}
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2" data-testid="team-preview">
            {members.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-20 sm:pb-24">
        <div className="container-page">
          <div className="dot-grid relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 rounded-full bg-mint/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{finalCta.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-dark sm:text-lg">{finalCta.body}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 min-[400px]:flex-row">
                <Button to={finalCta.primary.to}>{finalCta.primary.label}</Button>
                <Button href={`mailto:${organization.email}`} variant="ghostLight" className="max-w-full break-all">
                  {organization.email}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
