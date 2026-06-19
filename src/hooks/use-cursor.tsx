import { useState, useEffect, useRef } from 'react'

type Mode = 'terminal' | 'standard'

interface CursorManagerProps {
  mode: Mode
}

export function CursorManager({ mode }: CursorManagerProps) {
  if (mode === 'terminal') return <TerminalCursor />
  return (
    <>
      <EngineeringCrosshair />
      <FollowerBox />
    </>
  )
}

function TerminalCursor() {
  const [position, setPosition] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef({ x: -200, y: -200 })
  const mountedRef = useRef(true)

  useEffect(() => {
    document.documentElement.classList.add('terminal-mode')
    return () => {
      document.documentElement.classList.remove('terminal-mode')
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true

    const coarsePointer = window.matchMedia('(pointer: coarse)')
    if (coarsePointer.matches) return

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const animate = () => {
      if (!mountedRef.current) return
      setPosition(prev => {
        const dx = targetRef.current.x - prev.x
        const dy = targetRef.current.y - prev.y
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return targetRef.current
        return { x: prev.x + dx * 0.4, y: prev.y + dy * 0.4 }
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      mountedRef.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      aria-hidden="true"
      className="terminal-block-cursor pointer-events-none fixed top-0 left-0"
      style={{
        zIndex: 99999,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: 'transform',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.1s',
        width: 10,
        height: 18,
        background: 'var(--vs-cursor)',
        borderRadius: 1,
        marginLeft: -1,
        marginTop: -14,
      }}
    />
  )
}

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [role="tab"], input, select, textarea, label, [data-interactive]'

function EngineeringCrosshair() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const targetRef = useRef({ x: -100, y: -100 })
  const mountedRef = useRef(true)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    document.body.classList.add('cursor-hide')
    return () => document.body.classList.remove('cursor-hide')
  }, [])

  useEffect(() => {
    mountedRef.current = true

    const coarsePointer = window.matchMedia('(pointer: coarse)')
    if (coarsePointer.matches) return

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const animate = () => {
      if (!mountedRef.current) return
      setPosition(prev => {
        if (reducedMotion.matches) return targetRef.current
        const dx = targetRef.current.x - prev.x
        const dy = targetRef.current.y - prev.y
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return targetRef.current
        return { x: prev.x + dx * 0.35, y: prev.y + dy * 0.35 }
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      mountedRef.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0"
      style={{
        zIndex: 99999,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: 'transform',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.1s',
      }}
    >
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        style={{ transform: 'translate(-50%, -50%)', opacity: 0.8 }}
      >
        <line x1="0" y1="8" x2="16" y2="8" stroke="var(--vs-accent)" strokeWidth="1" />
        <line x1="8" y1="0" x2="8" y2="16" stroke="var(--vs-accent)" strokeWidth="1" />
      </svg>
    </div>
  )
}

function FollowerBox() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const targetRef = useRef({ x: -100, y: -100 })
  const mountedRef = useRef(true)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    mountedRef.current = true

    const coarsePointer = window.matchMedia('(pointer: coarse)')
    if (coarsePointer.matches) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
      const el = e.target as Element | null
      setHovered(!!el?.closest(INTERACTIVE_SELECTOR))
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const animate = () => {
      if (!mountedRef.current) return
      setPosition(prev => {
        if (reducedMotion.matches) return targetRef.current
        const dx = targetRef.current.x - prev.x
        const dy = targetRef.current.y - prev.y
        if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) return targetRef.current
        return { x: prev.x + dx * 0.14, y: prev.y + dy * 0.14 }
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      mountedRef.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const size = hovered ? 44 : 34

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0"
      style={{
        zIndex: 99998,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: 'transform',
        opacity: visible ? (hovered ? 0.8 : 0.55) : 0,
        width: size,
        height: size,
        border: '1px solid var(--vs-accent)',
        borderRadius: 1,
        marginLeft: -(size / 2),
        marginTop: -(size / 2),
        transition: 'opacity 0.1s, width 150ms ease, height 150ms ease, margin 150ms ease',
      }}
    />
  )
}
