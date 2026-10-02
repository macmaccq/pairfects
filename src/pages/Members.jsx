import PageHero from '../components/PageHero.jsx'
import MemberCard from '../components/MemberCard.jsx'
import Button from '../components/Button.jsx'
import { members } from '../data/members.js'
import { organization } from '../data/organization.js'
import { membersContent } from '../data/pageContent.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function Members() {
  useDocumentTitle('Members')
  const { hero } = membersContent

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {members.map((member) => (
            <li key={member.id}>
              <a
                href={`#${member.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-mint hover:text-mint"
              >
                {member.firstName} · {member.role}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="container-page space-y-8" data-testid="members-list">
          {members.map((member, index) => (
            <div key={member.id} className="scroll-mt-24">
              <MemberCard member={member} variant="profile" index={index} />
            </div>
          ))}
        </div>
        <div className="container-page mt-14 text-center">
          <p className="text-muted">Want to work with us?</p>
          <Button to="/contact" variant="dark" className="mt-4">
            Contact {organization.name}
          </Button>
        </div>
      </section>
    </>
  )
}
