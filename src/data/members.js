import angelPhoto from '../assets/members/angel-kate-dela-cruz.jpg'
import marcPhoto from '../assets/members/marc-lorenz-dela-cruz.jpg'

// Pairfect has EXACTLY 2 members (enforced by validateContent.js).
//
// CONFIRMED: each member's name and photo.
// DRAFT: role, summary, bio, skills, tools, motto — written for review.
//
// Each photo is imported directly above and attached to its own member
// object, so a name and a photo can never drift apart by array order.
// Source files: new-assets/Angel kate.jpg and new-assets/Marc Lorenz.jpg.

export const members = [
  {
    id: 'angel-kate-dela-cruz',
    name: 'Angel Kate Dela Cruz',
    firstName: 'Angel',
    image: angelPhoto,
    imageAlt: 'Portrait of Angel Kate Dela Cruz',
    imagePosition: '50% 30%',
    role: 'Creative & Project Lead', // DRAFT
    summary:
      "Shapes Pairfect's visual direction and keeps our work organized from first idea to final delivery.", // DRAFT
    bio: "Angel Kate Dela Cruz leads the creative side of Pairfect. Angel focuses on how our work looks, reads, and feels — shaping visual direction, layout, and written content — while also keeping projects planned, on schedule, and clearly communicated between the team and the people we work with.", // DRAFT
    skills: ['Visual design', 'Branding & layout', 'Content writing', 'Project planning', 'Team coordination'], // DRAFT
    tools: ['Canva', 'Figma', 'Google Workspace'], // DRAFT
    motto: 'Clarity is a design decision.', // DRAFT
  },
  {
    id: 'marc-lorenz-dela-cruz',
    name: 'Marc Lorenz Dela Cruz',
    firstName: 'Marc',
    image: marcPhoto,
    imageAlt: 'Portrait of Marc Lorenz Dela Cruz',
    imagePosition: '50% 0%',
    role: 'Web & Technical Lead', // DRAFT
    summary: "Turns Pairfect's ideas into fast, accessible, and responsive websites.", // DRAFT
    bio: 'Marc Lorenz Dela Cruz leads the technical side of Pairfect. Marc focuses on turning designs into working websites — writing clean front-end code, making layouts responsive across screen sizes, testing for accessibility and quality, and preparing each build for launch.', // DRAFT
    skills: ['Front-end development', 'Responsive web design', 'Web accessibility', 'Testing & QA', 'Deployment'], // DRAFT
    tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Git & GitHub'], // DRAFT
    motto: 'Build it right, then make it better.', // DRAFT
  },
]

export const REQUIRED_MEMBER_COUNT = 2
