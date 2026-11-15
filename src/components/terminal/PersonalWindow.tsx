import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { useDraggable } from '@/hooks/use-draggable'

interface PersonalWindowProps {
  /** Shown in the title bar, e.g. "learning://languages". */
  title: string
  onClose: () => void
  children: ReactNode
  maxWidth?: number
}

/**
 * Floating window used by the personal terminal commands (`lang`, `reading`).
 * Same frame, drag behaviour and close affordance as the arcade window, so the
 * terminal opens one consistent kind of popup.
 */
export function PersonalWindow({
  title,
  onClose,
  children,
  maxWidth = 440,
}: PersonalWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const { pos, isDragging, onMouseDown } = useDraggable(windowRef, {
    edgePadding: 20,
    minVisible: 80,
  })

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="personal-popup-in"
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
        width: `min(95vw, ${maxWidth}px)`,
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
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
          flexShrink: 0,
          background: 'var(--vs-surface)',
          borderBottom: '1px solid var(--vs-border)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          borderRadius: '3px 3px 0 0',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(10px, 2.5vw, 11px)',
            color: 'var(--vs-text-muted)',
            letterSpacing: '0.03em',
            paddingLeft: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
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
            flexShrink: 0,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--vs-text-muted)',
            borderRadius: '2px',
            padding: 0,
            transition: 'background 0.1s, color 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e81123'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--vs-text-muted)'
          }}
        >
          <X size={12} strokeWidth={1.5} />
        </button>
      </div>

      <div style={{ minHeight: 0, overflowY: 'auto' }}>{children}</div>
    </div>
  )
}
