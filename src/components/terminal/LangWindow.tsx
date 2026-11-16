import flagSpain from '@/assets/flag/flag-es.svg'
import { LANGUAGES, type Language } from '@/data/languages'
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
 * `lang` command popup — the languages Afnan speaks, laid out two per row.
 *
 * Spanish is the language in progress, so it gets a full-width highlighted
 * card with the "Currently Learning" tag and the CEFR scale. The scale is
 * derived from the single `level` value in `src/data/spanish.ts`.
 */
export function LangWindow({ onClose }: LangWindowProps) {
  const { language } = SPANISH_PROGRESS

  return (
    <PersonalWindow title="learning://languages" onClose={onClose} maxWidth={460}>
      <div style={{ padding: '20px 22px 18px' }}>
        {/* Header */}
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
          Languages
        </h2>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: 11.5,
            lineHeight: 1.6,
            color: 'var(--vs-text-muted)',
          }}
        >
          {LANGUAGES.length} languages · {language} in progress
        </p>

        <div
          aria-hidden="true"
          style={{
            height: 1,
            margin: '16px 0 14px',
            background: 'var(--vs-border)',
          }}
        />

        {/* Two per row; the learning language spans the full width */}
        <div
          role="list"
          aria-label="Languages"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}
        >
          {LANGUAGES.map((entry) =>
            entry.learning ? (
              <LearningLanguageCard key={entry.code} language={entry} />
            ) : (
              <LanguageTile key={entry.code} language={entry} />
            ),
          )}
        </div>
      </div>
    </PersonalWindow>
  )
}

function LanguageTile({ language }: { language: Language }) {
  return (
    <div
      role="listitem"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 58,
        padding: '9px 12px',
        borderRadius: 5,
        border: '1px solid var(--vs-border)',
        background: 'var(--vs-surface)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 7,
          right: 7,
          padding: '0 3px',
          borderRadius: 2,
          border: '1px solid var(--vs-border)',
          fontSize: 8,
          lineHeight: 1.5,
          letterSpacing: '0.08em',
          color: 'var(--vs-text-muted)',
        }}
      >
        {language.code.toUpperCase()}
      </span>

      <div
        style={{
          paddingRight: 26,
          fontSize: 12.5,
          fontWeight: 600,
          lineHeight: 1.35,
          color: 'var(--vs-text)',
        }}
      >
        {language.name}
      </div>

      {language.nativeName !== language.name && (
        <div
          style={{
            marginTop: 2,
            fontSize: 11,
            lineHeight: 1.45,
            color: 'var(--vs-text-muted)',
          }}
        >
          <span
            lang={language.code}
            dir={language.dir ?? 'ltr'}
            style={{ unicodeBidi: 'isolate' }}
          >
            {language.nativeName}
          </span>
        </div>
      )}
    </div>
  )
}

function LearningLanguageCard({ language }: { language: Language }) {
  const { level } = SPANISH_PROGRESS

  return (
    <div
      role="listitem"
      style={{
        gridColumn: '1 / -1',
        padding: '12px 14px 10px',
        borderRadius: 5,
        border:
          '1px solid color-mix(in srgb, var(--reading-gold) 34%, var(--vs-border))',
        background:
          'color-mix(in srgb, var(--reading-gold) 7%, var(--vs-surface))',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <img
          src={flagSpain}
          alt="Flag of Spain"
          width={36}
          height={24}
          style={{
            width: 36,
            height: 24,
            flexShrink: 0,
            objectFit: 'cover',
            borderRadius: 2,
            boxShadow:
              '0 0 0 1px var(--vs-border), 0 2px 6px rgba(0, 0, 0, 0.2)',
          }}
        />

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.3,
              color: 'var(--vs-text)',
            }}
          >
            {language.name}
            <span
              lang={language.code}
              style={{
                fontSize: 10.5,
                fontWeight: 400,
                color: 'var(--vs-text-muted)',
              }}
            >
              {language.nativeName}
            </span>
          </div>
          <div
            style={{
              marginTop: 1,
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'var(--vs-text-muted)',
            }}
          >
            CEFR {level}
            {SPANISH_NEXT_LEVEL ? ` · next ${SPANISH_NEXT_LEVEL}` : ' · complete'}
          </div>
        </div>

        <span
          style={{
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '2px 7px',
            borderRadius: 999,
            border:
              '1px solid color-mix(in srgb, var(--reading-gold) 36%, transparent)',
            background:
              'color-mix(in srgb, var(--reading-gold) 13%, transparent)',
            fontSize: 9,
            fontWeight: 600,
            lineHeight: 1.6,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            color: 'var(--reading-gold)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'var(--reading-gold)',
            }}
          />
          Currently Learning
        </span>
      </div>

      {/* CEFR scale */}
      <div
        role="list"
        aria-label="CEFR progress"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${CEFR_LEVELS.length}, 1fr)`,
          gap: 5,
          marginTop: 12,
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
              style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
            >
              <span
                style={{
                  fontSize: 9,
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

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          marginTop: 10,
          paddingTop: 8,
          borderTop:
            '1px solid color-mix(in srgb, var(--reading-gold) 20%, var(--vs-border))',
          fontSize: 8.5,
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
  )
}
