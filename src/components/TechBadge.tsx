import { getTechBadge } from '@/data/techBadges'

/**
 * Shared tech badge used by the Recruiter Quick View and the terminal's
 * `skills` output, so both surfaces always render the same asset.
 */
export function TechBadge({ label }: { label: string }) {
  return (
    <img
      className="tech-badge"
      src={getTechBadge(label)}
      alt={label}
      title={label}
      loading="lazy"
      decoding="async"
    />
  )
}
