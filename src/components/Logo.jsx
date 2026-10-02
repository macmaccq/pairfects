import { organization } from '../data/organization.js'

export default function Logo({ className = 'h-10 w-10', decorative = true }) {
  return (
    <img
      src={organization.logo}
      alt={decorative ? '' : organization.logoAlt}
      width="240"
      height="240"
      className={`shrink-0 rounded-xl object-cover ${className}`}
      data-testid="org-logo"
    />
  )
}
