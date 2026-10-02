// Page copy for the Pairfect site.
//
// ALL wording in this file is DRAFT content written for review. It describes
// what Pairfect intends to do and believes in — it deliberately makes no claims
// about clients, completed projects, awards, experience, or statistics.

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/members', label: 'Members' },
  { to: '/contact', label: 'Contact' },
]

export const homeContent = {
  badge: 'Creative & Web Team · Est. 2026',
  intro:
    'We are a two-member team pairing thoughtful design with careful development. Every idea we take on gets both perspectives from the very first step — so it looks right and works right.',
  primaryCta: { label: 'Get in Touch', to: '/contact' },
  secondaryCta: { label: 'Meet the Team', to: '/members' },
  about: {
    eyebrow: 'About Pairfect',
    title: 'Design and development, in the same conversation.',
    body: [
      'We believe the right pair, working in step, can create work that neither could create alone.',
      'One of us leads creative direction and planning; the other leads the web and technical build. Together we keep how something looks and how it works moving forward as one.',
    ],
    cta: { label: 'Read Our Story', to: '/about' },
  },
  projects: {
    eyebrow: 'Our Work',
    title: 'Real work, coming soon.',
    cta: { label: 'View Projects Page', to: '/projects' },
  },
  team: {
    eyebrow: 'The Team',
    title: 'Two members. Complementary strengths.',
    body: 'Pairfect is made up of two people with different strengths who share one standard for quality.',
    cta: { label: 'View Full Profiles', to: '/members' },
  },
  finalCta: {
    title: 'Have an idea worth building?',
    body: 'Tell us what you have in mind. We would be glad to hear about it.',
    primary: { label: 'Contact Us', to: '/contact' },
  },
}

export const aboutContent = {
  hero: {
    eyebrow: 'About Us',
    title: 'The right pair makes the work better.',
    intro:
      'Pairfect brings creative direction and technical development together in one small, focused team.',
  },
  story: {
    title: 'Our Story',
    body: [
      'Pairfect was founded in 2026.',
      'We started with a simple idea: good work happens when design and development are planned together rather than handed off from one to the other. From the beginning, we have believed that bringing creative and technical perspectives together can make the work stronger.',
      'We are at the beginning of our journey. This site is where we will share our work as it takes shape.',
    ],
  },
  mission: {
    title: 'Mission',
    body: 'To create clear, thoughtful, and well-built digital work by combining creative design with reliable web development.',
  },
  vision: {
    title: 'Vision',
    body: 'To grow into a trusted creative and technical team known for work that is both beautiful and dependable.',
  },
  values: {
    title: 'Core Values',
    intro: 'The principles we hold ourselves to on every piece of work.',
    items: [
      { title: 'Collaboration', body: 'We plan, decide, and review together, so every part of the work fits.' },
      { title: 'Clarity', body: 'We keep our designs, our code, and our communication simple and easy to follow.' },
      { title: 'Craft', body: 'We care about the details — spacing, wording, performance, and accessibility.' },
      { title: 'Integrity', body: 'We are honest about what we can do, what we have done, and how long things take.' },
      { title: 'Growth', body: 'We keep learning, and we treat every project as a chance to improve.' },
    ],
  },
  why: {
    title: 'Why We Exist',
    body: [
      'Good ideas often get lost in the gap between how something looks and how it works.',
      'We exist to close that gap — keeping design and development in the same conversation from the start, so the final result is both attractive and dependable.',
    ],
  },
  whatWeDo: {
    title: 'What We Do',
    intro: 'The areas we focus on as a team.',
    items: [
      { title: 'Brand & Visual Design', body: 'Visual identities, layouts, and graphics that communicate clearly.' },
      { title: 'Website Design & Development', body: 'Responsive, accessible websites built with modern web tools.' },
      { title: 'Content & Layout', body: 'Clear, well-structured writing and pages that are easy to read.' },
      { title: 'Planning & Collaboration', body: 'Organized timelines and open communication from start to finish.' },
    ],
  },
}

export const projectsContent = {
  hero: {
    eyebrow: 'Projects',
    title: 'Real work, shared when it is ready.',
    intro: 'This is where Pairfect’s projects will live.',
  },
  comingSoon: {
    badge: 'Projects Coming Soon',
    title: 'Our first projects are in the works.',
    body: 'We are preparing our first projects now. Rather than show sample or placeholder work, we will publish real projects here as soon as they are complete.',
    points: [
      'Only real Pairfect projects will appear here',
      'Each project will include its own detail page',
      'Check back soon, or reach out to talk about an idea',
    ],
    cta: { label: 'Start a Conversation', to: '/contact' },
  },
}

export const membersContent = {
  hero: {
    eyebrow: 'Our Members',
    title: 'Meet the pair behind Pairfect.',
    intro: 'Two members with complementary strengths — one creative, one technical — working as one team.',
  },
}

export const contactContent = {
  hero: {
    eyebrow: 'Contact',
    title: 'Let’s talk about your idea.',
    intro: 'Reach us by email or phone, or use the form to prepare a message.',
  },
  formNotice:
    "This form does not send messages directly. When you submit it, we'll prepare your message so you can open it in your email app and send it to our organization email yourself.",
}

export const footerContent = {
  blurb:
    'A two-member creative and web team pairing thoughtful design with careful development.',
}

export const notFoundContent = {
  title: 'Page not found',
  body: 'The page you are looking for does not exist or may have moved.',
}
