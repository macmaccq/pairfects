import { useId, useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import { MailIcon, PhoneIcon, PinIcon, CheckIcon } from '../components/Icons.jsx'
import { emailHref, organization, phoneHref } from '../data/organization.js'
import { contactContent } from '../data/pageContent.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

const EMPTY = { name: '', email: '', subject: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateContactForm(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.subject.trim().length < 3) errors.subject = 'Please enter a subject (at least 3 characters).'
  if (values.message.trim().length < 10) errors.message = 'Please enter a message (at least 10 characters).'
  return errors
}

function buildMailto(values) {
  const subject = encodeURIComponent(values.subject.trim())
  const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`)
  return `${emailHref}?subject=${subject}&body=${body}`
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label} <span className="text-mint-deep" aria-hidden="true">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700" data-testid="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = (hasError) =>
  `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 transition focus:outline-none focus:ring-4 ${
    hasError ? 'border-red-600 focus:ring-red-100' : 'border-line focus:border-mint-deep focus:ring-mint-soft'
  }`

export default function Contact() {
  useDocumentTitle('Contact')
  const { hero, formNotice } = contactContent
  const formId = useId()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [mailto, setMailto] = useState('')

  const ids = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    subject: `${formId}-subject`,
    message: `${formId}-message`,
  }

  const onChange = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (submitted) setErrors(validateContactForm(next))
    if (mailto) setMailto('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus()
      setMailto('')
      return
    }
    setMailto(buildMailto(values))
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setSubmitted(false)
    setMailto('')
  }

  const describedBy = (field) => (errors[field] ? `${ids[field]}-error` : undefined)

  const contactItems = [
    { icon: MailIcon, label: 'Email', value: organization.email, href: emailHref, testId: 'contact-email' },
    { icon: PhoneIcon, label: 'Phone', value: organization.phone, href: phoneHref, testId: 'contact-phone' },
    { icon: PinIcon, label: 'Location', value: organization.location, testId: 'contact-location' },
  ].filter((item) => item.value)

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <aside className="space-y-4">
            <h2 className="text-2xl font-extrabold tracking-tight">Contact information</h2>
            <p className="text-muted">Reach {organization.name} directly using the details below.</p>
            <ul className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href, testId }) => {
                const content = (
                  <>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-ink">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</span>
                      <span className="mt-0.5 block break-all font-semibold text-ink" data-testid={testId}>
                        {value}
                      </span>
                    </span>
                  </>
                )
                const cardClass = 'flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card'
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className={`${cardClass} transition hover:-translate-y-0.5 hover:border-mint-deep/40`}>
                        {content}
                      </a>
                    ) : (
                      <div className={cardClass}>{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </aside>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight">Send us a message</h2>
            <p
              className="mt-3 rounded-2xl border border-mint-deep/20 bg-mint-soft/60 p-4 text-sm leading-relaxed text-ink"
              data-testid="form-notice"
            >
              <strong className="font-semibold">Please note:</strong> {formNotice}
            </p>

            <form noValidate onSubmit={onSubmit} className="mt-6 space-y-5" aria-label="Contact form">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={ids.name} label="Name" error={errors.name}>
                  <input
                    id={ids.name}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy('name')}
                    className={inputClass(errors.name)}
                  />
                </Field>
                <Field id={ids.email} label="Email" error={errors.email}>
                  <input
                    id={ids.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={values.email}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy('email')}
                    className={inputClass(errors.email)}
                  />
                </Field>
              </div>
              <Field id={ids.subject} label="Subject" error={errors.subject}>
                <input
                  id={ids.subject}
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={describedBy('subject')}
                  className={inputClass(errors.subject)}
                />
              </Field>
              <Field id={ids.message} label="Message" error={errors.message}>
                <textarea
                  id={ids.message}
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={describedBy('message')}
                  className={`${inputClass(errors.message)} resize-y`}
                />
              </Field>

              <Button type="submit" variant="dark" className="w-full sm:w-auto">
                Prepare Email
              </Button>
            </form>

            <div aria-live="polite">
              {mailto && (
                <div className="mt-6 rounded-2xl border border-line bg-paper p-5" data-testid="form-ready">
                  <p className="flex items-start gap-2 font-semibold text-ink">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-mint-deep" />
                    Your message is ready — it has not been sent yet.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Open your email app to review and send it to{' '}
                    <span className="break-all font-semibold text-ink">{organization.email}</span>.
                  </p>
                  <div className="mt-4 flex flex-col gap-3 min-[400px]:flex-row">
                    <Button href={mailto} data-testid="open-email-app">
                      Open Email App
                    </Button>
                    <Button type="button" variant="outline" onClick={reset}>
                      Clear Form
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
