import { useCallback, useEffect, useState } from 'react'
import type { ArcadeGame } from '@/App'
import {
  ARCADE_GAMES,
  getAllHighScores,
  resetHighScores,
  type ArcadeGameId,
} from '@/lib/arcade'

type GameId = Exclude<NonNullable<ArcadeGame>, 'arcade'>

const GAMES: { id: GameId; name: string; icon: string; desc: string; color: string }[] = [
  { id: 'snake', name: 'SNAKE', icon: '🐍', desc: 'Grow long, avoid yourself', color: '#7cc36b' },
  { id: 'tetris', name: 'TETRIS', icon: '🧱', desc: 'Stack the blocks, clear lines', color: '#4dd0e1' },
  { id: 'galaga', name: 'GALAGA', icon: '🚀', desc: 'Blast the alien formation', color: '#ffb74d' },
  { id: 'pacman', name: 'PAC-MAN', icon: '👻', desc: 'Chomp pellets, dodge ghosts', color: '#ffd54f' },
]

interface ArcadeLobbyProps {
  onSelect: (game: GameId) => void
}

function useScores(): Record<ArcadeGameId, number> {
  const [scores, setScores] = useState(() => getAllHighScores())
  useEffect(() => {
    const sync = () => setScores(getAllHighScores())
    sync()
    window.addEventListener('afnan-arcade-scores-change', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('afnan-arcade-scores-change', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])
  return scores
}

export function ArcadeLobby({ onSelect }: ArcadeLobbyProps) {
  const scores = useScores()

  const handleClear = useCallback(() => {
    resetHighScores()
  }, [])

  // Number keys 1-4 launch the matching game. preventDefault keeps the digits
  // out of the still-focused terminal input.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key)
      if (Number.isInteger(i) && i >= 1 && i <= GAMES.length) {
        e.preventDefault()
        onSelect(GAMES[i - 1].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onSelect])

  const hasScores = ARCADE_GAMES.some((g) => scores[g] > 0)

  return (
    <div style={{ width: 'min(80vw, 320px)', fontFamily: 'var(--font-mono)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ color: 'var(--vs-accent)', fontSize: 12, letterSpacing: '0.12em' }}>RETRO ARCADE</span>
        <span style={{ color: 'var(--vs-text-muted)', fontSize: 10 }}>press 1–4</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {GAMES.map((g, i) => (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 3,
              padding: '9px 10px',
              minWidth: 0,
              background: 'var(--vs-surface)',
              border: '1px solid var(--vs-border)',
              borderRadius: 3,
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'var(--font-mono)',
              color: 'var(--vs-text)',
              transition: 'border-color 0.12s, transform 0.12s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = g.color
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--vs-border)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, width: '100%' }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>{g.icon}</span>
              <span style={{ color: g.color, fontSize: 12, letterSpacing: '0.06em' }}>{g.name}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--vs-text-muted)', fontSize: 10 }}>{i + 1}</span>
            </span>
            <span style={{ color: 'var(--vs-text-muted)', fontSize: 10, lineHeight: 1.35 }}>{g.desc}</span>
            <span style={{ color: '#7cc36b', fontSize: 10, letterSpacing: '0.04em' }}>
              BEST {scores[g.id] > 0 ? scores[g.id] : '—'}
            </span>
          </button>
        ))}
      </div>

      <div
        style={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          color: 'var(--vs-text-muted)',
          fontSize: 10,
          opacity: 0.85,
        }}
      >
        <span>launch a game, then ⌂ in the title bar to come back</span>
        {hasScores && (
          <button
            onClick={handleClear}
            title="Clear all high scores"
            aria-label="Clear high scores"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--vs-text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
              flexShrink: 0,
            }}
          >
            clear scores
          </button>
        )}
      </div>
    </div>
  )
}
