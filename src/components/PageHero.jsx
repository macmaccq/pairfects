export default function PageHero({ eyebrow, title, intro, children }) {
  return (
    <section className="dot-grid relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mint/20 blur-3xl"
      />
      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl animate-rise">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-mint">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-dark sm:text-lg">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
