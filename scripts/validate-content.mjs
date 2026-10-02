// Validates Pairfect content (organization, members, projects) outside the browser.
// Uses Vite's SSR loader so image imports resolve exactly as they do in the app.
// Also self-tests the validator: 0, 1 and 3 members must be rejected.
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
let failed = false
try {
  const { validateContent, validateMembers, validateProjects } = await server.ssrLoadModule('/src/data/validateContent.js')
  const { members } = await server.ssrLoadModule('/src/data/members.js')

  const problems = validateContent()
  if (problems.length) {
    failed = true
    console.error(`Content validation failed:\n- ${problems.join('\n- ')}`)
  } else {
    console.log(`✓ Content valid: ${members.length} members (${members.map((m) => m.name).join(', ')})`)
  }

  const clone = (m, id) => ({ ...m, id, image: `${m.image}?${id}` })
  const cases = [
    ['0 members', [], true],
    ['1 member', [members[0]], true],
    ['2 members', members, false],
    ['3 members', [...members, clone(members[0], 'extra')], true],
    ['duplicate ids', [members[0], { ...members[1], id: members[0].id }], true],
    ['shared photo', [members[0], { ...members[1], image: members[0].image }], true],
  ]
  for (const [label, list, shouldFail] of cases) {
    const rejected = validateMembers(list).length > 0
    const ok = rejected === shouldFail
    if (!ok) failed = true
    console.log(`${ok ? '✓' : '✗'} members rule — ${label}: ${rejected ? 'rejected' : 'accepted'}`)
  }

  const project = { slug: 'demo', title: 'T', summary: 'S', category: 'C', year: 2026, description: ['P'] }
  const projectCases = [
    ['valid project', [project], false],
    ['duplicate slugs', [project, { ...project }], true],
    ['member photo as project image', [{ ...project, image: members[0].image, imageAlt: 'x' }], true],
  ]
  for (const [label, list, shouldFail] of projectCases) {
    const rejected = validateProjects(list, members.map((m) => m.image)).length > 0
    const ok = rejected === shouldFail
    if (!ok) failed = true
    console.log(`${ok ? '✓' : '✗'} projects rule — ${label}: ${rejected ? 'rejected' : 'accepted'}`)
  }
} finally {
  await server.close()
}
process.exit(failed ? 1 : 0)
