import { useEffect, useState } from 'react'
import { Sun, Moon, Download } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { useAudio } from '@/hooks/use-audio.ts'

interface HeaderProps {
  mode: 'terminal' | 'standard'
  onModeChange: (mode: 'terminal' | 'standard') => void
  onDragStart?: (e: React.MouseEvent) => void
  isDragging?: boolean
}

function useClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function useTemperature() {
  const [temp, setTemp] = useState<string | null>(null)
  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=19.076&longitude=72.8777&current=temperature_2m&temperature_unit=fahrenheit'
    )
      .then((r) => r.json())
      .then((data) => {
        const t = Math.round(data?.current?.temperature_2m)
        if (!isNaN(t)) setTemp(`${t}°F`)
      })
      .catch(() => {})
  }, [])
  return temp
}

export function Header({ mode, onModeChange, onDragStart, isDragging }: HeaderProps) {
  const clock = useClock()
  const temp = useTemperature()
  const { theme, setTheme } = useTheme()
  const audio = useAudio()

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  function toggleTheme() {
    setTheme(isDark ? 'light' : 'dark')
    audio.play('themeToggle')
  }

  return (
    <header
      className="flex items-center justify-between px-4 h-10 shrink-0 border-b select-none"
      onMouseDown={onDragStart}
      style={{
        background: 'var(--vs-surface)',
        borderColor: 'var(--vs-border)',
        fontFamily: 'var(--font-mono)',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Left: hostname | clock | location temp */}
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--vs-text-muted)' }}>
        <button
          onClick={() => onModeChange('terminal')}
          className="hover:opacity-80 transition-opacity"
          style={{ color: 'var(--vs-accent)', fontWeight: 500 }}
        >
          afnan@workspace
        </button>
        <span className="opacity-40">|</span>
        <span>{clock}</span>
        <span className="opacity-40">|</span>
        <span>Mumbai{temp ? `, ${temp}` : ''}</span>
      </div>

      {/* Right: icon row + view switch */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <IconButton onClick={toggleTheme} title="Toggle theme">
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </IconButton>

        {/* Gmail */}
        <IconButton as="a" href="mailto:afnan@email.com" title="Email">
          <MailIcon />
        </IconButton>

        {/* LinkedIn */}
        <IconButton
          as="a"
          href="https://www.linkedin.com/in/afnankhan1108-dev"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <LinkedInIcon />
        </IconButton>

        {/* GitHub */}
        <IconButton
          as="a"
          href="https://github.com/afnanlabs"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <GitHubIcon />
        </IconButton>

        {/* Resume download */}
        <IconButton as="a" href="/resume.pdf" download title="Download resume">
          <Download size={14} />
        </IconButton>

        {/* Divider */}
        <div className="w-px h-4 mx-1" style={{ background: 'var(--vs-border)' }} />

        {/* View switch — text button */}
        <button
          onClick={() => onModeChange(mode === 'terminal' ? 'standard' : 'terminal')}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors hover:opacity-80"
          style={{
            background: 'var(--vs-surface-alt)',
            color: 'var(--vs-text)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '0.01em',
          }}
        >
          {mode === 'terminal' ? 'Standard View →' : 'Terminal View →'}
        </button>
      </div>
    </header>
  )
}

function IconButton({
  children,
  as: Tag = 'button',
  title,
  ...props
}: {
  children: React.ReactNode
  as?: 'button' | 'a'
  title?: string
  [key: string]: unknown
}) {
  return (
    <Tag
      title={title}
      className="flex items-center justify-center w-7 h-7 rounded transition-colors hover:opacity-75"
      style={{ color: 'var(--vs-text-muted)' }}
      {...props}
    >
      {children}
    </Tag>
  )
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
