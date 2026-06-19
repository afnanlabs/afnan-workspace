import { useRef } from 'react'
import { X } from 'lucide-react'
import { useDraggable } from '@/hooks/use-draggable'
import { SnakeGame } from './SnakeGame'
import { TetrisGame } from './TetrisGame'
import type { ArcadeGame } from '@/App'

interface ArcadeWindowProps {
  game: ArcadeGame
  onClose: () => void
}

const TITLES: Record<NonNullable<ArcadeGame>, string> = {
  snake: 'retro-arcade://snake',
  tetris: 'retro-arcade://tetris',
}

export function ArcadeWindow({ game, onClose }: ArcadeWindowProps) {
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
      }}
    >
      {/* Title bar — drag handle */}
      <div
        onMouseDown={onMouseDown}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          height: 32,
          background: 'var(--vs-surface)',
          borderBottom: '1px solid var(--vs-border)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          borderRadius: '3px 3px 0 0',
        }}
      >
        <span style={{ fontSize: '11px', color: 'var(--vs-text-muted)', letterSpacing: '0.03em' }}>
          {TITLES[game]}
        </span>
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
      <div style={{ padding: '10px' }}>
        {game === 'snake' && <SnakeGame />}
        {game === 'tetris' && <TetrisGame />}
      </div>
    </div>
  )
}
