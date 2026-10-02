import logo from '../assets/pairfect-logo.webp'

// Organization details for Pairfect.
//
// CONFIRMED facts (provided by the organization): name, founded, email, phone.
// Fields marked DRAFT were written for review and can be changed freely.
// Leave a field as an empty string to hide it on the site.

export const organization = {
  name: 'Pairfect',
  displayName: 'PAIRFECT',
  shortName: 'PF', // DRAFT
  tagline: 'Two perspectives. One perfect fit.', // DRAFT
  description:
    'Pairfect is a two-member creative and web team. We pair thoughtful design with careful development to create digital work that is clear, useful, and built to last.', // DRAFT
  focus: 'Creative design and web development', // DRAFT
  founded: 2026,
  email: 'pairfect@gmail.com',
  phone: '09338277364',
  location: '', // Not provided yet — hidden while blank.
  logo,
  logoAlt: 'Pairfect logo',

  // Official Pairfect organization accounts only — never personal accounts.
  // Blank URLs are hidden everywhere on the site.
  socials: {
    facebook: '',
    instagram: '',
    linkedin: '',
    github: '',
    tiktok: '',
  },
}

export const socialLabels = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  tiktok: 'TikTok',
}

export function getActiveSocials(socials = organization.socials) {
  return Object.entries(socials)
    .filter(([, url]) => typeof url === 'string' && url.trim() !== '')
    .map(([platform, url]) => ({ platform, url: url.trim(), label: socialLabels[platform] ?? platform }))
}

export const phoneHref = `tel:${organization.phone.replace(/[^\d+]/g, '')}`
export const emailHref = `mailto:${organization.email}`
