import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { organization } from '../data/organization.js'
import { navLinks } from '../data/pageContent.js'
import Logo from './Logo.jsx'
import { CloseIcon, MenuIcon } from './Icons.jsx'

const desktopLink = ({ isActive }) =>
  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-white/10 text-white' : 'text-muted-dark hover:text-white'
  }`

const mobileLink = ({ isActive }) =>
  `flex min-h-12 items-center justify-between rounded-xl px-4 text-base font-semibold transition-colors ${
    isActive ? 'bg-mint text-ink' : 'text-white hover:bg-white/5'
  }`

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/85">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
          <Link to="/" onClick={close} className="flex min-w-0 items-center gap-2.5" aria-label={`${organization.name} home`}>
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg font-extrabold tracking-[0.08em] text-white">{organization.displayName}</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === '/'} className={desktopLink}>
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <span aria-hidden="true" className="absolute inset-x-4 -bottom-[1px] h-0.5 rounded-full bg-mint" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become the
          containing block for this fixed-position panel. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-ink md:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-5">
            <ul className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === '/'} className={mobileLink} onClick={close}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <p className="mt-6 break-words px-4 text-sm text-muted-dark">{organization.email}</p>
          </nav>
        </div>
      )}
    </>
  )
}
