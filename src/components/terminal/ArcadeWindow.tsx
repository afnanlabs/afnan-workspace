import { lazy, Suspense, useRef } from 'react'
import { X, LayoutGrid } from 'lucide-react'
import { useDraggable } from '@/hooks/use-draggable'
import { ArcadeLobby } from './ArcadeLobby'
import type { ArcadeGame } from '@/App'

// The four canvas games are code-split so they stay out of the main bundle and
// are only fetched when the player actually opens one.
const SnakeGame = lazy(() => import('./SnakeGame').then((m) => ({ default: m.SnakeGame })))
const TetrisGame = lazy(() => import('./TetrisGame').then((m) => ({ default: m.TetrisGame })))
const GalagaGame = lazy(() => import('./GalagaGame').then((m) => ({ default: m.GalagaGame })))
const PacmanGame = lazy(() => import('./PacmanGame').then((m) => ({ default: m.PacmanGame })))

interface ArcadeWindowProps {
  game: ArcadeGame
  onClose: () => void
  onSelectGame: (game: NonNullable<ArcadeGame>) => void
}

const TITLES: Record<NonNullable<ArcadeGame>, string> = {
  arcade: 'retro-arcade://arcade',
  snake: 'retro-arcade://snake',
  tetris: 'retro-arcade://tetris',
  galaga: 'retro-arcade://galaga',
  pacman: 'retro-arcade://pacman',
}

export function ArcadeWindow({ game, onClose, onSelectGame }: ArcadeWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const { pos, isDragging, onMouseDown } = useDraggable(windowRef, { edgePadding: 20, minVisible: 80 })

  if (!game) return null

  return (
    <div
      ref={windowRef}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate3d(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px), 0)`,
        willChange: 'transform',
        zIndex: 10000,
        userSelect: isDragging ? 'none' : undefined,
        background: 'var(--vs-bg)',
        border: '1px solid var(--vs-border)',
        borderRadius: '3px',
        boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
        fontFamily: 'var(--font-mono)',
        minWidth: 0,
        maxWidth: 'min(95vw, 500px)',
      }}
    >
      {/* Title bar — drag handle */}
      <div
        onMouseDown={onMouseDown}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 6px',
          height: 28,
          background: 'var(--vs-surface)',
          borderBottom: '1px solid var(--vs-border)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          borderRadius: '3px 3px 0 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          {game !== 'arcade' && (
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => onSelectGame('arcade')}
              aria-label="Back to arcade lobby"
              title="Back to arcade lobby"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--vs-text-muted)',
                borderRadius: '2px',
                padding: 0,
                transition: 'background 0.1s, color 0.1s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--vs-border)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--vs-text)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--vs-text-muted)'
              }}
            >
              <LayoutGrid size={12} strokeWidth={1.5} />
            </button>
          )}
          <span style={{ fontSize: 'clamp(10px, 2.5vw, 11px)', color: 'var(--vs-text-muted)', letterSpacing: '0.03em' }}>
            {TITLES[game]}
          </span>
        </div>
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onClose}
          aria-label="Close"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--vs-text-muted)',
            borderRadius: '2px',
            padding: 0,
            transition: 'background 0.1s, color 0.1s',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = '#e81123'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--vs-text-muted)'
          }}
        >
          <X size={12} strokeWidth={1.5} />
        </button>
      </div>

      {/* Game content */}
      <div style={{ padding: '6px' }}>
        {game === 'arcade' && <ArcadeLobby onSelect={onSelectGame} />}
        {game !== 'arcade' && (
          <Suspense
            fallback={
              <div
                style={{
                  width: 'min(80vw, 320px)',
                  padding: '24px 0',
                  textAlign: 'center',
                  color: 'var(--vs-text-muted)',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                loading game…
              </div>
            }
          >
            {game === 'snake' && <SnakeGame />}
            {game === 'tetris' && <TetrisGame />}
            {game === 'galaga' && <GalagaGame />}
            {game === 'pacman' && <PacmanGame />}
          </Suspense>
        )}
      </div>
    </div>
  )
}
