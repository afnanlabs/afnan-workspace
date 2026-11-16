import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  GraduationCap,
  Mail,
  MapPin,
} from 'lucide-react'
import { PersonalWindow } from './terminal/PersonalWindow'
import { copyText } from '@/lib/clipboard'
import { downloadResume } from '@/lib/resume'
import {
  RECRUITER_METRICS,
  RECRUITER_PROFILE,
  RECRUITER_PROJECTS,
  RECRUITER_SKILLS,
  type RecruiterProject,
} from '@/data/recruiter'

interface RecruiterWindowProps {
  onClose: () => void
  /** Opens an existing project file in Standard view. */
  onOpenProject: (fileId: string) => void
}

type CopyState = 'idle' | 'copied' | 'failed'

/**
 * `recruiter://quick-view` — the one-screen answer to "who is this, what has
 * he built, and how do I reach him?".
 *
 * Uses the same draggable frame as the other personal popups so the terminal
 * keeps one consistent window language, but the content is intentionally
 * visual and scannable rather than terminal output.
 */
export function RecruiterWindow({ onClose, onOpenProject }: RecruiterWindowProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  useEffect(() => {
    if (copyState === 'idle') return
    const id = window.setTimeout(() => setCopyState('idle'), 2400)
    return () => window.clearTimeout(id)
  }, [copyState])

  async function handleCopyEmail() {
    const ok = await copyText(RECRUITER_PROFILE.email)
    setCopyState(ok ? 'copied' : 'failed')
  }

  return (
    <PersonalWindow title="recruiter://quick-view" onClose={onClose} maxWidth={780}>
      <div className="recruiter-body">
        <header>
          <div className="recruiter-eyebrow">
            <span className="recruiter-dot" aria-hidden="true" />
            Recruiter quick view
          </div>

          <h2 className="recruiter-name">{RECRUITER_PROFILE.name}</h2>
          <div className="recruiter-role">{RECRUITER_PROFILE.role}</div>

          <div className="recruiter-meta">
            <span className="recruiter-meta-item">
              <MapPin size={11} aria-hidden="true" />
              {RECRUITER_PROFILE.location}
            </span>
            <span className="recruiter-meta-sep" aria-hidden="true" />
            <span>{RECRUITER_PROFILE.focus.join(' · ')}</span>
          </div>

          <p className="recruiter-pitch">{RECRUITER_PROFILE.pitch}</p>

          <div className="recruiter-actions">
            <button
              type="button"
              className="recruiter-action recruiter-action-primary"
              onClick={() => downloadResume()}
            >
              <Download size={13} aria-hidden="true" />
              Download resume
            </button>

            <button
              type="button"
              className="recruiter-action"
              onClick={handleCopyEmail}
            >
              {copyState === 'copied' ? (
                <Check size={13} aria-hidden="true" />
              ) : (
                <Copy size={13} aria-hidden="true" />
              )}
              {copyState === 'copied' ? 'Copied' : 'Copy email'}
            </button>

            <a
              className="recruiter-action"
              href={`mailto:${RECRUITER_PROFILE.email}`}
            >
              <Mail size={13} aria-hidden="true" />
              Email
            </a>

            <a
              className="recruiter-action"
              href={RECRUITER_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              LinkedIn
            </a>

            <a
              className="recruiter-action"
              href={RECRUITER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>

          <div className="recruiter-copy-status" role="status" aria-live="polite">
            {copyState === 'copied' && 'Email copied to clipboard.'}
            {copyState === 'failed' &&
              `Could not copy automatically — ${RECRUITER_PROFILE.email}`}
          </div>
        </header>

        <section aria-label="Proof points">
          <div className="recruiter-metrics">
            {RECRUITER_METRICS.map((metric) => (
              <div key={metric.label} className="recruiter-metric">
                <div className="recruiter-metric-value">{metric.value}</div>
                <div className="recruiter-metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="recruiter-projects-title">
          <div className="recruiter-section-head">
            <h3 id="recruiter-projects-title">Featured work</h3>
            <span>{RECRUITER_PROJECTS.length} case studies</span>
          </div>

          <div className="recruiter-projects">
            {RECRUITER_PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => onOpenProject(project.id)}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="recruiter-skills-title">
          <div className="recruiter-section-head">
            <h3 id="recruiter-skills-title">Core skills</h3>
          </div>

          <div className="recruiter-skills">
            {RECRUITER_SKILLS.map((group) => (
              <div key={group.label}>
                <div className="recruiter-skill-label">{group.label}</div>
                <div className="recruiter-chips">
                  {group.items.map((item) => (
                    <span key={item} className="recruiter-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="recruiter-footer">
          <span className="recruiter-education">
            <GraduationCap size={13} aria-hidden="true" />
            {RECRUITER_PROFILE.education}
            <span className="recruiter-meta-sep" aria-hidden="true" />
            {RECRUITER_PROFILE.certifications}
          </span>
          <span className="recruiter-terminal-hint">
            Prefer the terminal? Run <code>hire</code>.
          </span>
        </footer>
      </div>
    </PersonalWindow>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: RecruiterProject
  onOpen: () => void
}) {
  return (
    <article className="recruiter-project">
      <div className="recruiter-project-head">
        <h4>{project.name}</h4>
        <button type="button" className="recruiter-case-link" onClick={onOpen}>
          Case study
          <ArrowUpRight size={12} aria-hidden="true" />
        </button>
      </div>

      <p className="recruiter-project-tagline">{project.tagline}</p>

      <div className="recruiter-chips">
        {project.stack.map((item) => (
          <span key={item} className="recruiter-chip recruiter-chip-stack">
            {item}
          </span>
        ))}
      </div>

      <p className="recruiter-project-proof">{project.proof}</p>

      {project.source && (
        <a
          className="recruiter-source"
          href={project.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon size={12} />
          Source
          <ArrowUpRight size={11} aria-hidden="true" />
        </a>
      )}
    </article>
  )
}

function GitHubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedInIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
