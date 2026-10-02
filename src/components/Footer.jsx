import { Link } from 'react-router-dom'
import { emailHref, getActiveSocials, organization, phoneHref } from '../data/organization.js'
import { footerContent, navLinks } from '../data/pageContent.js'
import Logo from './Logo.jsx'
import SocialLinks from './SocialLinks.jsx'
import { MailIcon, PhoneIcon, PinIcon } from './Icons.jsx'

export default function Footer() {
  const hasSocials = getActiveSocials().length > 0

  return (
    <footer className="bg-ink text-white" data-testid="site-footer">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="inline-flex items-center gap-3" aria-label={`${organization.name} home`}>
            <Logo className="h-11 w-11" />
            <span className="font-display text-xl font-extrabold tracking-[0.08em]">{organization.displayName}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-dark">{footerContent.blurb}</p>
          {hasSocials && (
            <div className="mt-5">
              <h2 className="sr-only">Follow {organization.name}</h2>
              <SocialLinks />
            </div>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-mint">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-muted-dark transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-mint">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={emailHref} className="flex items-start gap-3 break-all text-muted-dark transition-colors hover:text-white">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                {organization.email}
              </a>
            </li>
            <li>
              <a href={phoneHref} className="flex items-start gap-3 text-muted-dark transition-colors hover:text-white">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                {organization.phone}
              </a>
            </li>
            {organization.location && (
              <li className="flex items-start gap-3 text-muted-dark">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                {organization.location}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {organization.name}. All rights reserved.
          </p>
          <p>Founded {organization.founded}</p>
        </div>
      </div>
    </footer>
  )
}
