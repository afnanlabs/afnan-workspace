import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Touch affordances for the arcade games.
 *
 * Everything here renders only on coarse-pointer (touch) devices, so desktop
 * play stays keyboard-only and uncluttered. Games can additionally spread
 * {@link useArcadeSwipe}'s handlers onto their canvas for gesture input.
 */

export type ArcadeDir = 'up' | 'down' | 'left' | 'right'

/** True when the primary pointer is coarse (finger/stylus). */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return coarse
}

/**
 * Turns a pointer drag on an element into a single directional input.
 * Returns props to spread onto the target element.
 */
export function useArcadeSwipe(onDirection: (dir: ArcadeDir) => void, threshold = 24) {
  const startRef = useRef<{ x: number; y: number } | null>(null)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    startRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const start = startRef.current
      startRef.current = null
      if (!start) return
      const dx = e.clientX - start.x
      const dy = e.clientY - start.y
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return
      onDirection(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up')
    },
    [onDirection, threshold]
  )

  return { onPointerDown, onPointerUp }
}

const padBtn: React.CSSProperties = {
  width: 44,
  height: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--vs-surface)',
  border: '1px solid var(--vs-border)',
  borderRadius: 4,
  color: 'var(--vs-text)',
  fontFamily: 'var(--font-mono)',
  fontSize: 16,
  cursor: 'pointer',
  userSelect: 'none',
  touchAction: 'none',
}

/** A compact on-screen D-pad. Renders only on touch devices. */
export function ArcadeDPad({ onDirection }: { onDirection: (dir: ArcadeDir) => void }) {
  const coarse = useCoarsePointer()
  if (!coarse) return null

  const press = (dir: ArcadeDir) => (e: React.PointerEvent) => {
    e.preventDefault()
    onDirection(dir)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 44px)',
        gridTemplateRows: 'repeat(3, 44px)',
        gap: 4,
        marginTop: 8,
        touchAction: 'none',
      }}
      aria-label="Directional pad"
    >
      <span />
      <button type="button" style={padBtn} onPointerDown={press('up')} aria-label="Up">
        ▲
      </button>
      <span />
      <button type="button" style={padBtn} onPointerDown={press('left')} aria-label="Left">
        ◀
      </button>
      <span />
      <button type="button" style={padBtn} onPointerDown={press('right')} aria-label="Right">
        ▶
      </button>
      <span />
      <button type="button" style={padBtn} onPointerDown={press('down')} aria-label="Down">
        ▼
      </button>
      <span />
    </div>
  )
}

export interface ArcadeButtonSpec {
  key: string
  label: string
  ariaLabel?: string
  onPress: () => void
  onRelease?: () => void
}

/** A row of labelled action buttons. Renders only on touch devices. */
export function ArcadeButtonBar({ items }: { items: ArcadeButtonSpec[] }) {
  const coarse = useCoarsePointer()
  if (!coarse) return null

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8, touchAction: 'none' }}
      aria-label="Game controls"
    >
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          aria-label={item.ariaLabel ?? item.label}
          onPointerDown={(e) => {
            e.preventDefault()
            item.onPress()
          }}
          onPointerUp={() => item.onRelease?.()}
          onPointerLeave={() => item.onRelease?.()}
          onPointerCancel={() => item.onRelease?.()}
          style={{
            minWidth: 52,
            padding: '10px 12px',
            background: 'var(--vs-surface)',
            border: '1px solid var(--vs-border)',
            borderRadius: 4,
            color: 'var(--vs-text)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            cursor: 'pointer',
            userSelect: 'none',
            touchAction: 'none',
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
