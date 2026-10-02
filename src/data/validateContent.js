import { organization } from './organization.js'
import { members, REQUIRED_MEMBER_COUNT } from './members.js'
import { projects } from './projects.js'

const isFilled = (value) => typeof value === 'string' && value.trim() !== ''
const isNonEmptyArray = (value) => Array.isArray(value) && value.length > 0
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateOrganization(org) {
  const errors = []
  for (const field of ['name', 'displayName', 'description', 'email', 'phone', 'logo', 'logoAlt']) {
    if (!isFilled(org?.[field])) errors.push(`organization.${field} is required`)
  }
  if (isFilled(org?.email) && !EMAIL_PATTERN.test(org.email)) errors.push('organization.email is not a valid email')
  if (!Number.isInteger(org?.founded)) errors.push('organization.founded must be a year number')
  if (typeof org?.location !== 'string') errors.push('organization.location must be a string (blank hides it)')

  const socials = org?.socials ?? {}
  for (const platform of ['facebook', 'instagram', 'linkedin', 'github', 'tiktok']) {
    const url = socials[platform]
    if (typeof url !== 'string') {
      errors.push(`organization.socials.${platform} must be a string (blank hides it)`)
    } else if (url.trim() !== '' && !/^https:\/\/.+\/.+/.test(url.trim())) {
      errors.push(`organization.socials.${platform} must be a full https:// profile URL, not a homepage`)
    }
  }
  return errors
}

export function validateMembers(list, requiredCount = REQUIRED_MEMBER_COUNT) {
  const errors = []
  if (!Array.isArray(list)) return ['members must be an array']
  if (list.length !== requiredCount) {
    errors.push(`Pairfect must have exactly ${requiredCount} members (found ${list.length})`)
  }

  const ids = new Set()
  const images = new Set()
  list.forEach((member, index) => {
    const label = `members[${index}]${member?.name ? ` (${member.name})` : ''}`
    for (const field of ['id', 'name', 'role', 'summary', 'bio', 'image', 'imageAlt']) {
      if (!isFilled(member?.[field])) errors.push(`${label}.${field} is required`)
    }
    if (!isNonEmptyArray(member?.skills)) errors.push(`${label}.skills must list at least one skill`)
    if (member?.tools !== undefined && !Array.isArray(member.tools)) errors.push(`${label}.tools must be an array`)

    if (isFilled(member?.id)) {
      if (ids.has(member.id)) errors.push(`Duplicate member id "${member.id}"`)
      ids.add(member.id)
    }
    if (isFilled(member?.image)) {
      if (images.has(member.image)) errors.push(`${label} reuses another member's image`)
      images.add(member.image)
      if (!/\.(jpe?g|png|webp|avif)(\?.*)?$/i.test(member.image) && !member.image.startsWith('data:image/')) {
        errors.push(`${label}.image does not reference an image file`)
      }
    }
    if (isFilled(member?.name) && isFilled(member?.imageAlt) && !member.imageAlt.includes(member.name)) {
      errors.push(`${label}.imageAlt must name the same person as the member`)
    }
  })
  return errors
}

export function validateProjects(list, memberImages = []) {
  const errors = []
  if (!Array.isArray(list)) return ['projects must be an array']

  const slugs = new Set()
  list.forEach((project, index) => {
    const label = `projects[${index}]${project?.title ? ` (${project.title})` : ''}`
    for (const field of ['slug', 'title', 'summary', 'category']) {
      if (!isFilled(project?.[field])) errors.push(`${label}.${field} is required`)
    }
    if (!Number.isInteger(project?.year)) errors.push(`${label}.year must be a year number`)
    if (!isNonEmptyArray(project?.description)) errors.push(`${label}.description must have at least one paragraph`)

    if (isFilled(project?.slug)) {
      if (!SLUG_PATTERN.test(project.slug)) errors.push(`${label}.slug must be lowercase-kebab-case`)
      if (slugs.has(project.slug)) errors.push(`Duplicate project slug "${project.slug}"`)
      slugs.add(project.slug)
    }
    if (project?.image) {
      if (!isFilled(project.imageAlt)) errors.push(`${label}.imageAlt is required when an image is set`)
      if (memberImages.includes(project.image)) errors.push(`${label} must not use a member photo as a project image`)
    }
  })
  return errors
}

export function validateContent({ org = organization, memberList = members, projectList = projects } = {}) {
  return [
    ...validateOrganization(org),
    ...validateMembers(memberList),
    ...validateProjects(projectList, Array.isArray(memberList) ? memberList.map((m) => m?.image) : []),
  ]
}
