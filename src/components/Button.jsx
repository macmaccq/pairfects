import { Link } from 'react-router-dom'

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-[0.95rem] font-semibold leading-tight transition duration-200 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-mint text-ink shadow-[0_8px_20px_-10px_rgb(28_231_135/0.8)] hover:-translate-y-0.5 hover:bg-[#3df09a]',
  dark: 'bg-ink text-white hover:-translate-y-0.5 hover:bg-ink-soft',
  outline: 'border border-ink/15 bg-white text-ink hover:-translate-y-0.5 hover:border-ink/40',
  ghostLight: 'border border-white/25 text-white hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/5',
}

export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
