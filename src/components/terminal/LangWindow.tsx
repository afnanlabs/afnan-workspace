import flagSpain from '@/assets/flag-es.svg'
import {
  CEFR_LEVELS,
  SPANISH_LEVEL_INDEX,
  SPANISH_NEXT_LEVEL,
  SPANISH_PROGRESS,
} from '@/data/spanish'
import { PersonalWindow } from './PersonalWindow'

interface LangWindowProps {
  onClose: () => void
}

/**
 * `lang` command popup — a quiet, editorial progress card. The flag is a real
 * image (the emoji renders as "ES" on Windows) and the CEFR scale is derived
 * from the single `level` value in `src/data/spanish.ts`.
 */
export function LangWindow({ onClose }: LangWindowProps) {
  const { language, nativeName, level } = SPANISH_PROGRESS

  return (
    <PersonalWindow title="learning://spanish" onClose={onClose} maxWidth={420}>
      <div style={{ padding: '22px 24px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <img
            src={flagSpain}
            alt="Flag of Spain"
            width={45}
            height={30}
            style={{
              width: 45,
              height: 30,
              flexShrink: 0,
              marginTop: 1,
              objectFit: 'cover',
              borderRadius: 3,
              boxShadow:
                '0 0 0 1px var(--vs-border), 0 2px 8px rgba(0, 0, 0, 0.22)',
            }}
          />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--vs-text-muted)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--reading-gold)',
                }}
              />
              Language learning
            </div>
            <h2
              style={{
                margin: '5px 0 0',
                fontSize: 16,
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: '0.01em',
                color: 'var(--vs-text)',
              }}
            >
              Learning {language}
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  color: 'var(--vs-text-muted)',
                }}
              >
                {nativeName}
              </span>
            </h2>
            <p
              style={{
                margin: '5px 0 0',
                fontSize: 12.5,
                lineHeight: 1.7,
                color: 'var(--vs-text-muted)',
              }}
            >
              Currently studying at the{' '}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '1px 6px',
                  borderRadius: 3,
                  fontSize: 10.5,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  letterSpacing: '0.04em',
                  verticalAlign: 'middle',
                  color: 'var(--reading-gold)',
                  background:
                    'color-mix(in srgb, var(--reading-gold) 14%, transparent)',
                  border:
                    '1px solid color-mix(in srgb, var(--reading-gold) 38%, transparent)',
                }}
              >
                {level}
              </span>{' '}
              level.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            height: 1,
            margin: '18px 0 16px',
            background: 'var(--vs-border)',
          }}
        />

        {/* CEFR scale */}
        <div
          role="list"
          aria-label="CEFR progress"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${CEFR_LEVELS.length}, 1fr)`,
            gap: 6,
          }}
        >
          {CEFR_LEVELS.map((step, index) => {
            const reached = index <= SPANISH_LEVEL_INDEX
            const current = index === SPANISH_LEVEL_INDEX

            return (
              <div
                key={step}
                role="listitem"
                aria-current={current ? 'step' : undefined}
                style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                <span
                  style={{
                    fontSize: 9.5,
                    lineHeight: 1,
                    textAlign: 'center',
                    letterSpacing: '0.08em',
                    fontWeight: current ? 700 : 500,
                    color: current
                      ? 'var(--reading-gold)'
                      : reached
                        ? 'var(--vs-text)'
                        : 'var(--vs-text-muted)',
                    opacity: reached || current ? 1 : 0.7,
                  }}
                >
                  {step}
                </span>
                <span
                  style={{
                    height: 4,
                    borderRadius: 2,
                    background: reached
                      ? 'var(--reading-gold)'
                      : 'var(--vs-border)',
                    opacity: current ? 1 : reached ? 0.45 : 1,
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Meta */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            marginTop: 18,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--vs-text-muted)',
              }}
            >
              Current level
            </div>
            <div
              style={{
                marginTop: 3,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--vs-text)',
              }}
            >
              {level}
            </div>
          </div>
          <div
            style={{
              paddingLeft: 16,
              borderLeft: '1px solid var(--vs-border)',
            }}
          >
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--vs-text-muted)',
              }}
            >
              Next milestone
            </div>
            <div
              style={{
                marginTop: 3,
                fontSize: 13,
                fontWeight: 600,
                color: SPANISH_NEXT_LEVEL
                  ? 'var(--vs-text)'
                  : 'var(--reading-gold)',
              }}
            >
              {SPANISH_NEXT_LEVEL ?? 'Complete'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            marginTop: 16,
            paddingTop: 10,
            borderTop: '1px solid var(--vs-border)',
            fontSize: 9,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: 'var(--vs-text-muted)',
          }}
        >
          <span>CEFR · Common European Framework</span>
          <span
            style={{
              flexShrink: 0,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--reading-gold)',
            }}
          >
            {SPANISH_LEVEL_INDEX + 1}/{CEFR_LEVELS.length}
          </span>
        </div>
      </div>
    </PersonalWindow>
  )
}
