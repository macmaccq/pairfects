import PageHero from '../components/PageHero.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Button from '../components/Button.jsx'
import { aboutContent } from '../data/pageContent.js'
import { organization } from '../data/organization.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function About() {
  useDocumentTitle('About')
  const { hero, story, mission, vision, values, why, whatWeDo } = aboutContent

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />

      {/* Our Story */}
      <section className="py-20 sm:py-24" aria-labelledby="story-title">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint-deep">Founded {organization.founded}</p>
            <h2 id="story-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {story.title}
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {story.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="pb-20 sm:pb-24">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[mission, vision].map((block, index) => (
            <article
              key={block.title}
              className={`rounded-3xl p-8 sm:p-10 ${
                index === 0 ? 'bg-ink text-white' : 'border border-line bg-white shadow-card'
              }`}
            >
              <p className={`text-xs font-bold uppercase tracking-[0.18em] ${index === 0 ? 'text-mint' : 'text-mint-deep'}`}>
                Our {block.title}
              </p>
              <h2 className="sr-only">{block.title}</h2>
              <p className="mt-4 font-display text-2xl font-semibold leading-snug sm:text-[1.7rem]">{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="border-y border-line bg-white/60 py-20 sm:py-24">
        <div className="container-page">
          <SectionTitle eyebrow="What guides us" title={values.title} intro={values.intro} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.items.map((value, index) => (
              <li key={value.title} className="rounded-3xl border border-line bg-white p-6 shadow-card">
                <span className="font-display text-sm font-bold text-mint-deep">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-20 sm:py-24" aria-labelledby="why-title">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint-deep">Our purpose</p>
            <h2 id="why-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {why.title}
            </h2>
          </div>
          <div className="space-y-5 border-l-4 border-mint pl-6 text-base leading-relaxed text-muted sm:text-lg">
            {why.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="pb-20 sm:pb-24">
        <div className="container-page">
          <SectionTitle eyebrow="Our focus" title={whatWeDo.title} intro={whatWeDo.intro} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {whatWeDo.items.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
                <span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-full bg-mint ring-4 ring-mint-soft" />
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-3 min-[400px]:flex-row">
            <Button to="/members" variant="dark">
              Meet the Team
            </Button>
            <Button to="/contact" variant="outline">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
