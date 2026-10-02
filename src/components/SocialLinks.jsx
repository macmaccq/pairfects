import { getActiveSocials, organization } from '../data/organization.js'

// Organization social platform icons (filled glyphs).
const glyph = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, focusable: false }

const socialIcons = {
  facebook: (props) => (
    <svg {...glyph} {...props}>
      <path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14 2c-3.3 0-4 2.4-4 4v2.5H8V12h2v10h4V12h2.7l.4-3.5H14Z" />
    </svg>
  ),
  instagram: (props) => (
    <svg {...glyph} {...props}>
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 2c-2.7 0-3.1 0-4.1.1C4.5 2.2 2.2 4.5 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.1 3.4 2.4 5.7 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.4-.1 5.7-2.4 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.1-3.4-2.4-5.7-5.8-5.8C15.1 2 14.7 2 12 2Zm0 1.8c2.7 0 3 0 4 .1 2.5.1 3.9 1.5 4 4 .1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.5-1.5 3.9-4 4-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.5-.1-3.9-1.5-4-4-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-2.5 1.5-3.9 4-4 1-.1 1.3-.1 4-.1Z" />
    </svg>
  ),
  linkedin: (props) => (
    <svg {...glyph} {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.75Z" />
    </svg>
  ),
  github: (props) => (
    <svg {...glyph} {...props}>
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  tiktok: (props) => (
    <svg {...glyph} {...props}>
      <path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2-2.8V9.2a6.2 6.2 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.4 1.4V6.7a4.6 4.6 0 0 1-4.4-4.7Z" />
    </svg>
  ),
}


// Renders only the Pairfect organization accounts that have a real URL.
// Returns nothing at all when every URL is blank.
export default function SocialLinks({ className = '' }) {
  const socials = getActiveSocials()
  if (socials.length === 0) return null

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={`${organization.name} social media`}>
      {socials.map(({ platform, url, label }) => {
        const Icon = socialIcons[platform]
        return (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${organization.name} on ${label}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-mint hover:text-mint"
            >
              {Icon ? <Icon className="h-5 w-5" /> : label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
