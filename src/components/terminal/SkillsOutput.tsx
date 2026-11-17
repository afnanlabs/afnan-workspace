import { RECRUITER_SKILLS } from '@/data/recruiter'
import { TechBadge } from '@/components/TechBadge'

/**
 * Visual `skills` command output. Uses the same grouped data and badge
 * component as the Recruiter Quick View, so the two never drift apart.
 */
export function SkillsOutput() {
  return (
    <div className="terminal-skills">
      <div className="terminal-skills-title">Technical Stack</div>

      {RECRUITER_SKILLS.map((group) => (
        <div key={group.label} className="terminal-skill-group">
          <div className="terminal-skill-label">{group.label}</div>
          <div className="terminal-skill-badges">
            {group.items.map((item) => (
              <TechBadge key={item} label={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
