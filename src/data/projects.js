// Pairfect has no confirmed projects yet, so this list is intentionally empty.
// While it is empty, /projects shows a "Projects Coming Soon" state and every
// /projects/:slug URL shows the not-found page.
//
// To add a real project, append an object like this (validated in development):
//
// {
//   slug: 'unique-url-slug',          // required, lowercase-kebab-case, unique
//   title: 'Project title',           // required
//   summary: 'One or two sentences.', // required
//   category: 'Web design',           // required
//   year: 2026,                       // required
//   description: ['Paragraph one.', 'Paragraph two.'], // required
//   image: importedProjectImage,      // optional — never a member photo
//   imageAlt: 'Describe the image',   // required when image is set
//   tags: ['React', 'Branding'],      // optional
//   link: 'https://…',                // optional live link
// }

export const projects = []

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
