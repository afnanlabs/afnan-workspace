import { useEffect, useRef, useState, useCallback } from 'react'

const COLS = 10
const ROWS = 20
const CELL = 22

type Board = (string | null)[][]

const PIECES = [
  { shape: [[1,1,1,1]], color: '#4fc3f7' },           // I
  { shape: [[1,1],[1,1]], color: '#ffd54f' },          // O
  { shape: [[0,1,0],[1,1,1]], color: '#ce93d8' },      // T
  { shape: [[0,1,1],[1,1,0]], color: '#a5d6a7' },      // S
  { shape: [[1,1,0],[0,1,1]], color: '#ef9a9a' },      // Z
  { shape: [[1,0,0],[1,1,1]], color: '#ffb74d' },      // J
  { shape: [[0,0,1],[1,1,1]], color: '#80cbc4' },      // L
]

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
}

function rotate(shape: number[][]): number[][] {
  return shape[0].map((_, i) => shape.map((row) => row[i]).reverse())
}

function rndPiece() {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)]
  return { shape: p.shape, color: p.color, x: Math.floor(COLS / 2) - Math.floor(p.shape[0].length / 2), y: 0 }
}

type Piece = ReturnType<typeof rndPiece>

function fits(board: Board, piece: Piece, dx = 0, dy = 0, shape?: number[][]): boolean {
  const s = shape ?? piece.shape
  for (let r = 0; r < s.length; r++) {
    for (let c = 0; c < s[r].length; c++) {
      if (!s[r][c]) continue
      const nx = piece.x + c + dx
      const ny = piece.y + r + dy
      if (nx < 0 || nx >= COLS || ny >= ROWS) return false
      if (ny >= 0 && board[ny][nx]) return false
    }
  }
  return true
}

function place(board: Board, piece: Piece): Board {
  const next = board.map((row) => [...row])
  piece.shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        const ny = piece.y + r
        const nx = piece.x + c
        if (ny >= 0) next[ny][nx] = piece.color
      }
    })
  })
  return next
}

function clearLines(board: Board): { board: Board; lines: number } {
  const cleared = board.filter((row) => row.some((c) => !c))
  const lines = ROWS - cleared.length
  const empties = Array.from({ length: lines }, () => Array(COLS).fill(null))
  return { board: [...empties, ...cleared], lines }
}

function initState() {
  return {
    board: emptyBoard(),
    piece: rndPiece(),
    next: rndPiece(),
    score: 0,
    level: 1,
    lines: 0,
    dead: false,
  }
}

const SCORE_TABLE = [0, 100, 300, 500, 800]
function tickInterval(level: number) { return Math.max(80, 500 - (level - 1) * 40) }

export function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nextCanvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef(initState())
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [dead, setDead] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef(0)
  const softDropRef = useRef(false)

  const restart = useCallback(() => {
    stateRef.current = initState()
    setScore(0)
    setLevel(1)
    setDead(false)
    lastTickRef.current = 0
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current
      if (s.dead) return
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        if (fits(s.board, s.piece, -1, 0)) s.piece.x--
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        if (fits(s.board, s.piece, 1, 0)) s.piece.x++
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault()
        const rotated = rotate(s.piece.shape)
        if (fits(s.board, s.piece, 0, 0, rotated)) s.piece.shape = rotated
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault()
        softDropRef.current = true
      } else if (e.key === ' ') {
        e.preventDefault()
        // Hard drop
        while (fits(s.board, s.piece, 0, 1)) s.piece.y++
        lastTickRef.current = 0
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        softDropRef.current = false
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const nextCanvas = nextCanvasRef.current
    if (!canvas || !nextCanvas) return
    const ctx = canvas.getContext('2d')!
    const nctx = nextCanvas.getContext('2d')!

    const BG = getComputedStyle(document.documentElement).getPropertyValue('--vs-bg').trim() || '#1e1e1e'
    const GRID_C = getComputedStyle(document.documentElement).getPropertyValue('--vs-border').trim() || '#2d2d2d'

    function drawCell(c: CanvasRenderingContext2D, color: string, x: number, y: number, size: number) {
      c.fillStyle = color
      c.fillRect(x * size + 1, y * size + 1, size - 2, size - 2)
      c.fillStyle = 'rgba(255,255,255,0.12)'
      c.fillRect(x * size + 1, y * size + 1, size - 2, 3)
    }

    function drawGhost() {
      const s = stateRef.current
      let gy = 0
      while (fits(s.board, s.piece, 0, gy + 1)) gy++
      s.piece.shape.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (cell) {
            ctx.fillStyle = 'rgba(255,255,255,0.08)'
            ctx.fillRect((s.piece.x + c) * CELL + 1, (s.piece.y + r + gy) * CELL + 1, CELL - 2, CELL - 2)
          }
        })
      })
    }

    function draw() {
      const { board, piece, next } = stateRef.current

      // Main board
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL)
      ctx.strokeStyle = GRID_C
      ctx.lineWidth = 0.4
      ctx.globalAlpha = 0.25
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke()
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke()
      }
      ctx.globalAlpha = 1

      board.forEach((row, r) => {
        row.forEach((color, c) => { if (color) drawCell(ctx, color, c, r, CELL) })
      })

      drawGhost()

      piece.shape.forEach((row, r) => {
        row.forEach((cell, c) => { if (cell) drawCell(ctx, piece.color, piece.x + c, piece.y + r, CELL) })
      })

      // Next piece preview
      const NS = 16
      nctx.fillStyle = BG
      nctx.fillRect(0, 0, 4 * NS, 4 * NS)
      const ox = Math.floor((4 - next.shape[0].length) / 2)
      const oy = Math.floor((4 - next.shape.length) / 2)
      next.shape.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (cell) {
            nctx.fillStyle = next.color
            nctx.fillRect((ox + c) * NS + 1, (oy + r) * NS + 1, NS - 2, NS - 2)
          }
        })
      })
    }

    function tick(ts: number) {
      const s = stateRef.current
      if (s.dead) { draw(); return }

      const interval = softDropRef.current ? 40 : tickInterval(s.level)
      if (ts - lastTickRef.current >= interval) {
        lastTickRef.current = ts
        if (fits(s.board, s.piece, 0, 1)) {
          s.piece.y++
        } else {
          // Lock piece
          const placed = place(s.board, s.piece)
          const { board: cleared, lines } = clearLines(placed)
          s.board = cleared
          s.lines += lines
          s.score += SCORE_TABLE[lines] ?? 0
          s.level = Math.floor(s.lines / 10) + 1
          s.piece = s.next
          s.next = rndPiece()

          setScore(s.score)
          setLevel(s.level)

          if (!fits(s.board, s.piece, 0, 0)) {
            s.dead = true
            setDead(true)
            draw()
            return
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
    <div className="flex gap-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
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
              gap: 10, fontFamily: 'var(--font-mono)',
            }}
          >
            <div style={{ fontSize: '14px', color: '#ef9a9a', letterSpacing: '0.1em' }}>GAME OVER</div>
            <div style={{ color: 'var(--vs-text-muted)', fontSize: '11px' }}>score: {score}</div>
            <button
              onClick={restart}
              style={{
                marginTop: 4, padding: '4px 14px',
                background: 'var(--vs-surface)',
                border: '1px solid var(--vs-accent)',
                color: 'var(--vs-accent)',
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              [restart]
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3" style={{ minWidth: 72 }}>
        <div>
          <div style={{ color: 'var(--vs-text-muted)', marginBottom: 4 }}>NEXT</div>
          <canvas
            ref={nextCanvasRef}
            width={64}
            height={64}
            style={{ border: '1px solid var(--vs-border)', display: 'block' }}
          />
        </div>
        <div style={{ color: 'var(--vs-text-muted)' }}>
          <div>SCORE</div>
          <div style={{ color: 'var(--vs-accent)', fontSize: '13px' }}>{score}</div>
        </div>
        <div style={{ color: 'var(--vs-text-muted)' }}>
          <div>LEVEL</div>
          <div style={{ color: 'var(--vs-accent)', fontSize: '13px' }}>{level}</div>
        </div>
        <div style={{ color: 'var(--vs-text-muted)', lineHeight: 1.8, fontSize: '10px' }}>
          <div>← → move</div>
          <div>↑ rotate</div>
          <div>↓ soft drop</div>
          <div>SPC hard drop</div>
        </div>
      </div>
    </div>
  )
}
