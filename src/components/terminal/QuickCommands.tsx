interface QuickCommand {
  label: string
  command: string
  accent?: boolean
}

const QUICK_COMMANDS: QuickCommand[] = [
  { label: 'About', command: 'about' },
  { label: 'Projects', command: 'projects' },
  { label: 'Skills', command: 'skills' },
  { label: 'Contact', command: 'contact' },
  { label: 'Resume', command: 'resume' },
  { label: 'Recruiter view', command: 'hire', accent: true },
]

/**
 * Clickable onboarding for visitors who do not know the command set.
 * Every chip runs a real command, so the output stays in the same history and
 * the visitor learns the command name. The block is pinned in place, so it
 * remains available after the first command runs.
 */
export function QuickCommands({
  onRun,
}: {
  onRun: (command: string) => void
}) {
  return (
    <div className="quick-commands" role="group" aria-label="Quick actions">
      <span className="quick-commands-label">Quick actions</span>
      <div className="quick-commands-row">
        {QUICK_COMMANDS.map((item) => (
          <button
            key={item.command}
            type="button"
            className={`quick-command${item.accent ? ' quick-command-accent' : ''}`}
            onClick={() => onRun(item.command)}
            title={`Run '${item.command}'`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
