/**
 * Structured content for the Recruiter Quick View (`hire` command).
 *
 * Everything a recruiter needs in one place: identity, proof points, featured
 * projects, skills and contact links. Keeping it here means the overlay has no
 * hard-coded copy and the portfolio content stays editable in one file.
 */

import { SKILL_GROUPS } from './content'

export interface RecruiterMetric {
  /** The number or outcome, shown large. */
  value: string
  /** Short explanation, shown underneath. */
  label: string
}

export interface RecruiterProject {
  /** Existing file id in `src/data/content.ts` — opens the case study. */
  id: string
  name: string
  tagline: string
  stack: string[]
  /** One measurable or differentiating outcome. */
  proof: string
  /** Public repository, when one exists. */
  source?: string
}

export interface RecruiterSkillGroup {
  label: string
  items: string[]
}

export const RECRUITER_PROFILE = {
  name: 'Afnan Khan',
  role: 'Full-Stack Developer',
  location: 'Mumbai, India',
  pitch:
    'I build software that solves real problems — productivity systems, developer tooling, and full-stack applications with deliberate architecture.',
  focus: ['Full-stack', 'Developer tools', 'Systems thinking'],
  email: 'khanafnan1108@gmail.com',
  phone: '+91 73041 42536',
  phoneHref: 'tel:+917304142536',
  linkedin: 'https://www.linkedin.com/in/afnankhan1108-dev',
  github: 'https://github.com/afnanlabs',
  education: 'BSc IT · D.G. Ruparel College, Mumbai · 2026',
  certifications: '12 certifications',
} as const

export const RECRUITER_METRICS: RecruiterMetric[] = [
  {
    value: '98.75–99.6%',
    label: 'faster letter generation',
  },
  {
    value: '34 hrs',
    label: 'saved per month',
  },
  {
    value: '25+',
    label: 'production bugs fixed',
  },
  {
    value: '31',
    label: 'framework tests, zero deps',
  },
]

/**
 * Ordered by signal strength for a recruiter: framework depth first, then
 * business impact, then tooling and collaboration.
 */
export const RECRUITER_PROJECTS: RecruiterProject[] = [
  {
    id: 'afnkit',
    name: 'Afnkit',
    tagline: 'Express-inspired HTTP framework in strict TypeScript',
    stack: ['TypeScript', 'Node.js', 'npm'],
    proof: 'Zero runtime dependencies · 31 tests',
    source: 'https://github.com/afnanlabs/afnkit-core',
  },
  {
    id: 'hrms',
    name: 'HRMS',
    tagline: 'Internal HR platform with automated letter generation',
    stack: ['Vue', 'Express', 'MariaDB', 'OCR'],
    proof: '98.75–99.6% faster letters · 34 hrs/month saved',
  },
  {
    id: 'codeglow',
    name: 'CodeGlow',
    tagline: 'VS Code extension for persistent code highlighting',
    stack: ['TypeScript', 'VS Code API'],
    proof: 'Highlights survive edits, undo/redo and restarts',
    source: 'https://github.com/afnanlabs/CodeGlow-exe',
  },
  {
    id: 'thinktrack',
    name: 'ThinkTrack',
    tagline: 'Collaborative learning and group productivity platform',
    stack: ['PHP', 'MySQL', 'Google OAuth'],
    proof: 'RBAC and 3NF schema designed before feature work',
    source: 'https://github.com/afnanlabs/thinktrack',
  },
  {
    id: 'somnus',
    name: 'Somnus',
    tagline: 'Sleep quality analyzer that makes sleep data readable',
    stack: ['Web Application', 'Vercel'],
    proof: 'Publicly deployed · turns sleep data into a readable signal',
  },
  {
    id: 'fitscore',
    name: 'FitScore',
    tagline: 'Resume-to-role match analyzer',
    stack: ['Web Application'],
    proof: 'Turns resume comparison into an actionable result',
  },
]

const SKILL_LABELS: Record<keyof typeof SKILL_GROUPS, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops_cloud: 'DevOps & Cloud',
  agentic_systems: 'Agentic systems',
  tools: 'Tools',
}

/**
 * Derived from the same canonical `SKILL_GROUPS` that powers the `skills`
 * command, so the quick view can never show a different stack.
 */
export const RECRUITER_SKILLS: RecruiterSkillGroup[] = (
  Object.keys(SKILL_GROUPS) as Array<keyof typeof SKILL_GROUPS>
).map((key) => ({
  label: SKILL_LABELS[key],
  items: [...SKILL_GROUPS[key]],
}))
