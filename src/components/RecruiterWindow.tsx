import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  GraduationCap,
  Linkedin,
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
              <Linkedin size={13} aria-hidden="true" />
              LinkedIn
            </a>

            <a
              className="recruiter-action"
              href={RECRUITER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={13} aria-hidden="true" />
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
          <Github size={12} aria-hidden="true" />
          Source
          <ArrowUpRight size={11} aria-hidden="true" />
        </a>
      )}
    </article>
  )
}
