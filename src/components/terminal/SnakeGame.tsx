import { useEffect, useRef, useState, useCallback } from 'react'

const COLS = 20
const ROWS = 16
const CELL = 18
const TICK_MS = 130

type Dir = 'U' | 'D' | 'L' | 'R'
type Point = { x: number; y: number }

function rng(max: number) { return Math.floor(Math.random() * max) }

function newApple(snake: Point[]): Point {
  let p: Point
  do { p = { x: rng(COLS), y: rng(ROWS) } }
  while (snake.some((s) => s.x === p.x && s.y === p.y))
  return p
}

function initState() {
  const snake: Point[] = [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }]
  return { snake, dir: 'R' as Dir, apple: newApple(snake), score: 0, dead: false }
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef(initState())
  const nextDir = useRef<Dir>('R')
  const [score, setScore] = useState(0)
  const [dead, setDead] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef(0)

  const restart = useCallback(() => {
    stateRef.current = initState()
    nextDir.current = 'R'
    setScore(0)
    setDead(false)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'U', w: 'U', W: 'U',
        ArrowDown: 'D', s: 'D', S: 'D',
        ArrowLeft: 'L', a: 'L', A: 'L',
        ArrowRight: 'R', d: 'R', D: 'R',
      }
      const d = map[e.key]
      if (!d) return
      e.preventDefault()
      const cur = stateRef.current.dir
      const opp: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' }
      if (d !== opp[cur]) nextDir.current = d
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const BG = getComputedStyle(document.documentElement).getPropertyValue('--vs-bg').trim() || '#1e1e1e'
    const GRID_C = getComputedStyle(document.documentElement).getPropertyValue('--vs-border').trim() || '#333'
    const SNAKE_C = getComputedStyle(document.documentElement).getPropertyValue('--vs-accent').trim() || '#569cd6'
    const APPLE_C = '#e74c3c'
    const HEAD_C = '#ffffff'

    function draw() {
      const { snake, apple } = stateRef.current
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL)

      // Grid
      ctx.strokeStyle = GRID_C
      ctx.lineWidth = 0.3
      ctx.globalAlpha = 0.3
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke()
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke()
      }
      ctx.globalAlpha = 1

      // Apple
      ctx.fillStyle = APPLE_C
      ctx.fillRect(apple.x * CELL + 2, apple.y * CELL + 2, CELL - 4, CELL - 4)

      // Snake
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? HEAD_C : SNAKE_C
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2)
      })
    }

    function tick(ts: number) {
      if (ts - lastTickRef.current >= TICK_MS) {
        lastTickRef.current = ts
        const s = stateRef.current
        if (!s.dead) {
          s.dir = nextDir.current
          const head = s.snake[0]
          const delta: Record<Dir, Point> = {
            U: { x: 0, y: -1 }, D: { x: 0, y: 1 },
            L: { x: -1, y: 0 }, R: { x: 1, y: 0 }
          }
          const d = delta[s.dir]
          const next: Point = { x: (head.x + d.x + COLS) % COLS, y: (head.y + d.y + ROWS) % ROWS }

          // Self-collision
          if (s.snake.some((seg) => seg.x === next.x && seg.y === next.y)) {
            s.dead = true
            setDead(true)
            draw()
            return
          }

          const ate = next.x === s.apple.x && next.y === s.apple.y
          s.snake = [next, ...s.snake]
          if (!ate) s.snake.pop()
          else {
            s.apple = newApple(s.snake)
            s.score++
            setScore(s.score)
          }
        }
      }
      draw()
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [dead])

  return (
    <div className="flex flex-col items-center gap-2" style={{ fontFamily: 'var(--font-mono)' }}>
      <div className="flex w-full justify-between items-center px-1" style={{ fontSize: '11px', color: 'var(--vs-text-muted)' }}>
        <span>WASD / Arrows to move</span>
        <span style={{ color: 'var(--vs-accent)' }}>score: {score}</span>
      </div>
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          style={{ display: 'block', border: '1px solid var(--vs-border)' }}
        />
        {dead && (
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.72)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 12,
              fontFamily: 'var(--font-mono)',
              color: 'var(--vs-text)',
            }}
          >
            <div style={{ fontSize: '15px', color: '#e74c3c', letterSpacing: '0.1em' }}>GAME OVER</div>
            <div style={{ fontSize: '12px', color: 'var(--vs-text-muted)' }}>score: {score}</div>
            <button
              onClick={restart}
              style={{
                marginTop: 4,
                padding: '4px 14px',
                background: 'var(--vs-surface)',
                border: '1px solid var(--vs-accent)',
                color: 'var(--vs-accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              [restart]
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
