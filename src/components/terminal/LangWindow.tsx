import { SPANISH_PROGRESS } from '@/data/spanish'
import { PersonalWindow } from './PersonalWindow'

interface LangWindowProps {
  onClose: () => void
}

/**
 * `lang` command popup. Deliberately quiet: one flag, one line of status.
 */
export function LangWindow({ onClose }: LangWindowProps) {
  const { flag, language, level } = SPANISH_PROGRESS

  return (
    <PersonalWindow title="learning://spanish" onClose={onClose} maxWidth={380}>
      <div style={{ padding: '24px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <span aria-hidden="true" style={{ fontSize: 30, lineHeight: 1 }}>
            {flag}
          </span>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--vs-text-muted)',
              }}
            >
              Language learning
            </div>
            <h2
              style={{
                margin: '4px 0 0',
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--vs-text)',
                letterSpacing: '0.01em',
              }}
            >
              Learning {language}
            </h2>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: 12.5,
                lineHeight: 1.7,
                color: 'var(--vs-text-muted)',
              }}
            >
              Currently studying at the{' '}
              <span style={{ color: 'var(--vs-text)', fontWeight: 600 }}>
                {level}
              </span>{' '}
              level.
            </p>
          </div>
        </div>
      </div>
    </PersonalWindow>
  )
}
