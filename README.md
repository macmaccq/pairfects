# Pairfect — Organization Portfolio Website

Independent portfolio website for **Pairfect** (founded 2026), a two-member organization:
Angel Kate Dela Cruz and Marc Lorenz Dela Cruz.

Built with React 19, Vite, Tailwind CSS 4, react-router-dom, and ESLint.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start the local dev server (http://localhost:5173)
npm run lint         # ESLint
npm run build        # production build into dist/
npm run preview      # serve the production build locally
npm run validate     # validate content data (exactly 2 members, required fields, slugs…)
npm run test:e2e     # Playwright browser tests (uses your installed Google Chrome)
```

`npm run test:e2e` builds the site, serves it, runs every check, and writes review
screenshots to `screenshots/`.

## Editing content

All organization-specific content lives in `src/data/`:

| File | What it holds |
| --- | --- |
| `organization.js` | Name, tagline, description, founded year, email, phone, location, logo, social links |
| `members.js` | The 2 members — name, photo, role, summary, bio, skills, tools, motto |
| `projects.js` | Real projects (currently empty → "Projects Coming Soon") |
| `pageContent.js` | Page headings and copy for every page |
| `validateContent.js` | Rules checked in development and by `npm run validate` |

Anything marked `// DRAFT` was written as review copy and should be confirmed or replaced.

- **Location / social links:** leave as `''` to hide; add a full profile URL to show it.
- **Members:** Pairfect must have exactly 2 members — validation fails for 0, 1, or 3+.
- **Projects:** add an object to `projects` (see the template comment in `projects.js`);
  it will appear on Home and /projects and get its own `/projects/<slug>` page.

## Assets

Original files are kept untouched in `new-assets/`. Web copies used by the site:

| Site file | Source |
| --- | --- |
| `src/assets/pairfect-logo.webp`, `public/favicon.webp` | `new-assets/pairfect.webp` |
| `src/assets/members/angel-kate-dela-cruz.jpg` | `new-assets/Angel kate.jpg` (resized to 960×1280) |
| `src/assets/members/marc-lorenz-dela-cruz.jpg` | `new-assets/Marc Lorenz.jpg` (phone-screenshot black bars cropped off) |

## Deployment

Not deployed. `vercel.json` contains only the SPA rewrite needed for client-side routes.
This project must be deployed to its **own** new Vercel project.
