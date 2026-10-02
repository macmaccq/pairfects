export default function SectionTitle({ eyebrow, title, intro, align = 'left', tone = 'light', as: Heading = 'h2' }) {
  const centered = align === 'center'
  const dark = tone === 'dark'

  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p
          className={`mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${
            dark ? 'text-mint' : 'text-mint-deep'
          }`}
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-mint" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={`text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </Heading>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-muted-dark' : 'text-muted'}`}>{intro}</p>
      )}
    </div>
  )
}
