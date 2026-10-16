import { useEffect, useRef, useState, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
const CELL = 18
const COLS = 19
const ROWS = 21
const W = COLS * CELL
const H = ROWS * CELL

// Legend: '#' wall  '.' dot  'o' power pellet  '-' ghost-house door  'G' house floor
const MAZE = [
  '###################',
  '#o.......#.......o#',
  '#.##.###.#.###.##.#',
  '#.................#',
  '#.##.#.#####.#.##.#',
  '#....#...#...#....#',
  '####.###.#.###.####',
  '####.#.......#.####',
  '####.#.##-##.#.####',
  '.....#.#GGG#.#.....',
  '####...#GGG#...####',
  '####.#.#####.#.####',
  '####.#.......#.####',
  '####.###.#.###.####',
  '#....#...#...#....#',
  '#.##.#.#####.#.##.#',
  '#.................#',
  '#.##.###.#.###.##.#',
  '#o.......#.......o#',
  '#.###############.#',
  '###################',
]

const PAC_START = { c: 9, r: 16 }

// ---------------------------------------------------------------------------
// Tuning
// ---------------------------------------------------------------------------
const PAC_SPEED = 90
const GHOST_SPEED = 80
const FRIGHT_SPEED = 58
const EATEN_SPEED = 170
const FRIGHT_MS = 7000
const READY_MS = 1800

const DOT_POINTS = 10
const POWER_POINTS = 50
const GHOST_POINTS = [200, 400, 800, 1600]

const PAC_COLOR = '#ffd54f'
const WALL_COLOR = '#4c5fd5'
const WALL_EDGE = '#7d8ce8'
const FRIGHT_COLOR = '#2b4bd6'
const DOOR_COLOR = '#ffb3c1'

type Dir = 'up' | 'down' | 'left' | 'right'
type Pt = { c: number; r: number }
type GhostKind = 'chaser' | 'ambusher' | 'wanderer' | 'shy'
type GhostState = 'normal' | 'frightened' | 'eaten'

interface Ghost {
  x: number
  y: number
  dir: Dir
  kind: GhostKind
  color: string
  state: GhostState
  home: Pt
  lastTile: string
}

interface GameState {
  grid: string[][]
  pellets: number
  pac: { x: number; y: number; dir: Dir; desired: Dir; anim: number; moving: boolean }
  ghosts: Ghost[]
  score: number
  lives: number
  level: number
  dead: boolean
  readyUntil: number
  frightUntil: number
  combo: number
  wanderUntil: number
  wander: Pt
  lastTs: number
}

const DIRS: Record<Dir, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' }

const GHOST_DEFS: { kind: GhostKind; color: string; spawn: Pt; home: Pt }[] = [
  { kind: 'chaser', color: '#ff4d4d', spawn: { c: 9, r: 7 }, home: { c: 9, r: 7 } },
  { kind: 'ambusher', color: '#ff9ecb', spawn: { c: 8, r: 7 }, home: { c: 8, r: 7 } },
  { kind: 'wanderer', color: '#4dd0e1', spawn: { c: 10, r: 7 }, home: { c: 10, r: 7 } },
  { kind: 'shy', color: '#ffb74d', spawn: { c: 11, r: 7 }, home: { c: 11, r: 7 } },
]

const wrapCol = (c: number) => ((c % COLS) + COLS) % COLS
const cellCenter = (i: number) => i * CELL + CELL / 2

function parseMaze(): { grid: string[][]; pellets: number } {
  const grid = MAZE.map((row) => row.split(''))
  let pellets = 0
  for (const row of grid) for (const ch of row) if (ch === '.' || ch === 'o') pellets++
  // Pac-Man's start tile has no pellet (as in the arcade original)
  const startCh = grid[PAC_START.r][PAC_START.c]
  if (startCh === '.' || startCh === 'o') {
    grid[PAC_START.r][PAC_START.c] = ' '
    pellets--
  }
  return { grid, pellets }
}

function initState(now: number): GameState {
  const { grid, pellets } = parseMaze()
  return {
    grid,
    pellets,
    pac: { x: cellCenter(PAC_START.c), y: cellCenter(PAC_START.r), dir: 'left', desired: 'left', anim: 0, moving: false },
    ghosts: GHOST_DEFS.map((d) => ({
      x: cellCenter(d.spawn.c),
      y: cellCenter(d.spawn.r),
      dir: 'left',
      kind: d.kind,
      color: d.color,
      state: 'normal',
      home: { ...d.home },
      lastTile: '',
    })),
    score: 0,
    lives: 3,
    level: 1,
    dead: false,
    readyUntil: now + READY_MS,
    frightUntil: 0,
    combo: 0,
    wanderUntil: 0,
    wander: { c: 1, r: 1 },
    lastTs: 0,
  }
}

// ---------------------------------------------------------------------------
// Walkability (walls + ghost-house rules, with tunnel wrap on columns)
// ---------------------------------------------------------------------------
function isWalkable(grid: string[][], c: number, r: number, forGhost: boolean): boolean {
  if (r < 0 || r >= ROWS) return false
  const ch = grid[r][wrapCol(c)]
  if (ch === '#') return false
  // The ghost-house door is sealed: ghosts spawn outside the house and never
  // need to pass through it, and leaving it open lets them get trapped inside.
  if (ch === '-') return false
  if (ch === 'G') return forGhost
  return true
}

function resetPositions(s: GameState, now: number) {
  s.pac.x = cellCenter(PAC_START.c)
  s.pac.y = cellCenter(PAC_START.r)
  s.pac.dir = 'left'
  s.pac.desired = 'left'
  s.pac.anim = 0
  s.pac.moving = false
  s.ghosts.forEach((g) => {
    g.x = cellCenter(g.home.c)
    g.y = cellCenter(g.home.r)
    g.dir = 'left'
    g.state = 'normal'
    g.lastTile = ''
  })
  s.frightUntil = 0
  s.combo = 0
  s.readyUntil = now + READY_MS
}

function ghostSpeedFor(s: GameState, g: Ghost): number {
  if (g.state === 'eaten') return EATEN_SPEED
  if (g.state === 'frightened') return FRIGHT_SPEED
  return Math.min(GHOST_SPEED + (s.level - 1) * 4, 112)
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function PacmanGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<GameState | null>(null)
  const lastScoreRef = useRef(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [dead, setDead] = useState(false)

  if (!stateRef.current) stateRef.current = initState(performance.now())

  const restart = useCallback(() => {
    stateRef.current = initState(performance.now())
    lastScoreRef.current = 0
    setScore(0)
    setLives(3)
    setLevel(1)
    setDead(false)
  }, [])

  // ---- keyboard ----
  useEffect(() => {
    const map: Record<string, Dir> = {
      ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
      w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right',
    }
    const onKey = (e: KeyboardEvent) => {
      const dir = map[e.key]
      if (dir) {
        e.preventDefault()
        const s = stateRef.current
        if (s) {
          s.pac.desired = dir
          s.pac.moving = true
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // ---- game loop ----
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const cs = getComputedStyle(document.documentElement)
    const BG = cs.getPropertyValue('--vs-bg').trim() || '#1e1e1e'
    const DOT_C = cs.getPropertyValue('--vs-text-muted').trim() || '#9aa0a6'
    const POWER_C = cs.getPropertyValue('--vs-accent').trim() || '#569cd6'

    function updatePac(s: GameState, dt: number) {
      const pac = s.pac
      if (!pac.moving) return
      const eps = Math.max(2.5, PAC_SPEED * dt + 1.5)
      const tx = Math.floor(pac.x / CELL)
      const ty = Math.floor(pac.y / CELL)
      const cx = cellCenter(tx)
      const cy = cellCenter(ty)

      if (pac.desired !== pac.dir) {
        if (pac.desired === OPPOSITE[pac.dir]) {
          // reversing is always allowed, and should feel instant
          pac.dir = pac.desired
        } else if (isWalkable(s.grid, tx + DIRS[pac.desired][0], ty + DIRS[pac.desired][1], false)) {
          const [cdx, cdy] = DIRS[pac.dir]
          if (cdx !== 0 && Math.abs(pac.x - cx) <= eps) {
            pac.dir = pac.desired
            pac.x = cx
          } else if (cdy !== 0 && Math.abs(pac.y - cy) <= eps) {
            pac.dir = pac.desired
            pac.y = cy
          }
        }
      }

      const [dx, dy] = DIRS[pac.dir]
      let nx = pac.x + dx * PAC_SPEED * dt
      let ny = pac.y + dy * PAC_SPEED * dt
      if (dx > 0 && !isWalkable(s.grid, tx + 1, ty, false)) nx = Math.min(nx, cx)
      else if (dx < 0 && !isWalkable(s.grid, tx - 1, ty, false)) nx = Math.max(nx, cx)
      if (dy > 0 && !isWalkable(s.grid, tx, ty + 1, false)) ny = Math.min(ny, cy)
      else if (dy < 0 && !isWalkable(s.grid, tx, ty - 1, false)) ny = Math.max(ny, cy)

      pac.x = nx
      pac.y = ny
      if (pac.x < 0) pac.x += W
      else if (pac.x >= W) pac.x -= W
      pac.anim += dt
    }

    function eatPellet(s: GameState, now: number) {
      const tx = wrapCol(Math.floor(s.pac.x / CELL))
      const ty = Math.floor(s.pac.y / CELL)
      const ch = s.grid[ty]?.[tx]
      if (ch === '.') {
        s.grid[ty][tx] = ' '
        s.pellets--
        s.score += DOT_POINTS
      } else if (ch === 'o') {
        s.grid[ty][tx] = ' '
        s.pellets--
        s.score += POWER_POINTS
        s.frightUntil = now + Math.max(3500, FRIGHT_MS - (s.level - 1) * 600)
        s.combo = 0
        s.ghosts.forEach((g) => {
          if (g.state !== 'eaten') {
            g.state = 'frightened'
            g.dir = OPPOSITE[g.dir]
            g.lastTile = ''
          }
        })
      }
    }

    function fleeDir(s: GameState, tx: number, ty: number, valid: Dir[]): Dir {
      const ptx = Math.floor(s.pac.x / CELL)
      const pty = Math.floor(s.pac.y / CELL)
      let best = valid[0]
      let bd = -1
      for (const d of valid) {
        const [dx, dy] = DIRS[d]
        const dist = (tx + dx - ptx) ** 2 + (ty + dy - pty) ** 2
        if (dist > bd) { bd = dist; best = d }
      }
      return best
    }

    function targetFor(s: GameState, g: Ghost): Pt | null {
      const ptx = Math.floor(s.pac.x / CELL)
      const pty = Math.floor(s.pac.y / CELL)
      if (g.state === 'eaten') return g.home
      switch (g.kind) {
        case 'chaser':
          return { c: ptx, r: pty }
        case 'ambusher': {
          const [dx, dy] = DIRS[s.pac.dir]
          return { c: ptx + dx * 4, r: pty + dy * 4 }
        }
        case 'wanderer':
          return s.wander
        case 'shy': {
          const gtx = Math.floor(g.x / CELL)
          const gty = Math.floor(g.y / CELL)
          const far = Math.abs(gtx - ptx) + Math.abs(gty - pty) > 8
          return far ? { c: ptx, r: pty } : { c: 1, r: 18 }
        }
      }
      return null
    }

    function chooseGhostDir(s: GameState, g: Ghost, tx: number, ty: number) {
      const fleeing = g.state === 'frightened'
      let valid = (['up', 'left', 'down', 'right'] as Dir[]).filter((d) => {
        if (d === OPPOSITE[g.dir]) return false
        const [dx, dy] = DIRS[d]
        return isWalkable(s.grid, tx + dx, ty + dy, true)
      })
      if (valid.length === 0) valid = [OPPOSITE[g.dir]]

      g.dir = fleeing ? fleeDir(s, tx, ty, valid) : (() => {
        const target = targetFor(s, g)
        if (!target) return valid[0]
        let best = valid[0]
        let bd = Infinity
        for (const d of valid) {
          const [dx, dy] = DIRS[d]
          const dist = (tx + dx - target.c) ** 2 + (ty + dy - target.r) ** 2
          if (dist < bd) { bd = dist; best = d }
        }
        return best
      })()
    }

    function updateGhost(s: GameState, g: Ghost, dt: number) {
      // eaten ghosts travel home, then revive
      if (g.state === 'eaten' && Math.abs(g.x - cellCenter(g.home.c)) < 3 && Math.abs(g.y - cellCenter(g.home.r)) < 3) {
        g.state = 'normal'
        g.lastTile = ''
      }
      const spd = ghostSpeedFor(s, g)
      const eps = Math.max(2.5, spd * dt + 1)
      const tx = Math.round((g.x - CELL / 2) / CELL)
      const ty = Math.round((g.y - CELL / 2) / CELL)
      const cx = cellCenter(tx)
      const cy = cellCenter(ty)

      if (Math.abs(g.x - cx) <= eps && Math.abs(g.y - cy) <= eps && g.lastTile !== `${tx},${ty}`) {
        g.x = cx
        g.y = cy
        g.lastTile = `${tx},${ty}`
        chooseGhostDir(s, g, tx, ty)
      }

      const [dx, dy] = DIRS[g.dir]
      let nx = g.x + dx * spd * dt
      let ny = g.y + dy * spd * dt
      if (dx > 0 && !isWalkable(s.grid, tx + 1, ty, true)) nx = Math.min(nx, cx)
      else if (dx < 0 && !isWalkable(s.grid, tx - 1, ty, true)) nx = Math.max(nx, cx)
      if (dy > 0 && !isWalkable(s.grid, tx, ty + 1, true)) ny = Math.min(ny, cy)
      else if (dy < 0 && !isWalkable(s.grid, tx, ty - 1, true)) ny = Math.max(ny, cy)

      g.x = nx
      g.y = ny
      if (g.x < 0) g.x += W
      else if (g.x >= W) g.x -= W
    }

    function loseLife(s: GameState, now: number) {
      s.lives--
      setLives(s.lives)
      if (s.lives <= 0) {
        s.dead = true
        setDead(true)
      } else {
        resetPositions(s, now)
      }
    }

    function updateWander(s: GameState, now: number) {
      if (now >= s.wanderUntil) {
        const corners: Pt[] = [{ c: 1, r: 1 }, { c: 17, r: 1 }, { c: 1, r: 18 }, { c: 17, r: 18 }]
        s.wander = corners[Math.floor(Math.random() * corners.length)]
        s.wanderUntil = now + 4000
      }
    }

    function update(s: GameState, dt: number, now: number) {
      // frightened timers expire
      if (s.frightUntil && now >= s.frightUntil) {
        s.frightUntil = 0
        s.combo = 0
        s.ghosts.forEach((g) => { if (g.state === 'frightened') g.state = 'normal' })
      }

      updatePac(s, dt)
      eatPellet(s, now)
      updateWander(s, now)

      for (const g of s.ghosts) {
        updateGhost(s, g, dt)
        // collision with pacman
        const d = Math.hypot(g.x - s.pac.x, g.y - s.pac.y)
        if (d < CELL * 0.55) {
          if (g.state === 'frightened') {
            const pts = GHOST_POINTS[Math.min(s.combo, GHOST_POINTS.length - 1)]
            s.combo++
            s.score += pts
            g.state = 'eaten'
            g.lastTile = ''
          } else if (g.state === 'normal') {
            loseLife(s, now)
            break
          }
        }
      }

      if (s.dead) return

      // level clear
      if (s.pellets <= 0) {
        s.level++
        setLevel(s.level)
        const fresh = parseMaze()
        s.grid = fresh.grid
        s.pellets = fresh.pellets
        resetPositions(s, now)
        s.readyUntil = now + 1400
      }
    }

    // ---- drawing ----
    function drawWalls(s: GameState) {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const ch = s.grid[r][c]
          const x = c * CELL
          const y = r * CELL
          if (ch === '#') {
            ctx.fillStyle = WALL_COLOR
            ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2)
            ctx.strokeStyle = WALL_EDGE
            ctx.lineWidth = 1
            ctx.strokeRect(x + 2.5, y + 2.5, CELL - 5, CELL - 5)
          } else if (ch === '-') {
            ctx.fillStyle = DOOR_COLOR
            ctx.fillRect(x, y + CELL / 2 - 1.5, CELL, 3)
          }
        }
      }
    }

    function drawPellets(s: GameState, now: number) {
      const pulse = 0.75 + 0.25 * Math.sin(now / 200)
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const ch = s.grid[r][c]
          const x = cellCenter(c)
          const y = cellCenter(r)
          if (ch === '.') {
            ctx.fillStyle = DOT_C
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fill()
          } else if (ch === 'o') {
            ctx.fillStyle = POWER_C
            ctx.beginPath()
            ctx.arc(x, y, 4.5 * pulse, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    function drawPac(s: GameState) {
      const r = CELL * 0.42
      const open = Math.abs(Math.sin(s.pac.anim / 90)) * 0.9 + 0.12
      const angle = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 }[s.pac.dir]
      ctx.fillStyle = PAC_COLOR
      ctx.beginPath()
      ctx.moveTo(s.pac.x, s.pac.y)
      ctx.arc(s.pac.x, s.pac.y, r, angle + open, angle - open + Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }

    function drawGhost(s: GameState, g: Ghost, now: number) {
      const r = CELL * 0.42
      const cx = g.x
      const cy = g.y
      const eaten = g.state === 'eaten'
      const flashing = g.state === 'frightened' && s.frightUntil - now < 2000 && Math.floor(now / 180) % 2 === 0
      const body = eaten ? null : (g.state === 'frightened' ? (flashing ? '#ffffff' : FRIGHT_COLOR) : g.color)

      if (body) {
        ctx.fillStyle = body
        ctx.beginPath()
        ctx.arc(cx, cy - r * 0.1, r, Math.PI, 0, false)
        const bottom = cy + r * 0.8
        ctx.lineTo(cx + r, bottom)
        const step = (2 * r) / 3
        ctx.lineTo(cx + r - step * 0.5, bottom - r * 0.3)
        ctx.lineTo(cx + r - step, bottom)
        ctx.lineTo(cx + r - step * 1.5, bottom - r * 0.3)
        ctx.lineTo(cx + r - step * 2, bottom)
        ctx.lineTo(cx + r - step * 2.5, bottom - r * 0.3)
        ctx.lineTo(cx - r, bottom)
        ctx.closePath()
        ctx.fill()
      }

      // eyes
      const [dx, dy] = DIRS[g.dir]
      const ex = dx * r * 0.35
      const ey = dy * r * 0.35
      if (g.state === 'frightened' && !eaten) {
        ctx.fillStyle = flashing ? '#ff4d4d' : '#ffffff'
        ctx.fillRect(cx - r * 0.45, cy - r * 0.25, r * 0.3, r * 0.3)
        ctx.fillRect(cx + r * 0.15, cy - r * 0.25, r * 0.3, r * 0.3)
        // wavy mouth
        ctx.strokeStyle = flashing ? '#ff4d4d' : '#ffffff'
        ctx.lineWidth = 1.4
        ctx.beginPath()
        for (let i = 0; i <= 4; i++) {
          const px = cx - r * 0.6 + (r * 1.2 * i) / 4
          const py = cy + r * 0.35 + (i % 2 === 0 ? -2 : 2)
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.stroke()
      } else {
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(cx - r * 0.38 + ex, cy - r * 0.15 + ey, r * 0.3, 0, Math.PI * 2)
        ctx.arc(cx + r * 0.38 + ex, cy - r * 0.15 + ey, r * 0.3, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#1b1b3a'
        ctx.beginPath()
        ctx.arc(cx - r * 0.38 + ex * 1.6, cy - r * 0.15 + ey * 1.6, r * 0.15, 0, Math.PI * 2)
        ctx.arc(cx + r * 0.38 + ex * 1.6, cy - r * 0.15 + ey * 1.6, r * 0.15, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function draw(s: GameState, now: number) {
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, W, H)
      drawWalls(s)
      drawPellets(s, now)
      s.ghosts.forEach((g) => drawGhost(s, g, now))
      drawPac(s)
      if (now < s.readyUntil) {
        ctx.fillStyle = '#ffd54f'
        ctx.font = 'bold 13px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('READY!', W / 2, cellCenter(11.5))
      }
    }

    let raf: number | null = null
    function tick(ts: number) {
      const s = stateRef.current!
      if (s.dead) { draw(s, ts); return }
      const dt = s.lastTs ? Math.min(50, ts - s.lastTs) / 1000 : 1 / 60
      s.lastTs = ts

      if (ts >= s.readyUntil) update(s, dt, ts)
      draw(s, ts)

      if (s.score !== lastScoreRef.current) {
        lastScoreRef.current = s.score
        setScore(s.score)
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => { if (raf !== null) cancelAnimationFrame(raf) }
  }, [dead])

  return (
    <div className="flex gap-3 flex-wrap" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(10px, 2.5vw, 11px)' }}>
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ display: 'block', border: '1px solid var(--vs-border)', maxWidth: '100%', height: 'auto' }}
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
        <div style={{ color: 'var(--vs-text-muted)' }}>
          <div>SCORE</div>
          <div style={{ color: 'var(--vs-accent)', fontSize: '13px' }}>{score}</div>
        </div>
        <div style={{ color: 'var(--vs-text-muted)' }}>
          <div>LEVEL</div>
          <div style={{ color: 'var(--vs-accent)', fontSize: '13px' }}>{level}</div>
        </div>
        <div style={{ color: 'var(--vs-text-muted)' }}>
          <div>LIVES</div>
          <div style={{ color: 'var(--vs-accent)', fontSize: '13px' }}>{lives}</div>
        </div>
        <div style={{ color: 'var(--vs-text-muted)', lineHeight: 1.8, fontSize: '10px' }}>
          <div>← ↑ ↓ →</div>
          <div>or WASD</div>
          <div>eat power</div>
          <div>pellets to</div>
          <div>hunt ghosts</div>
        </div>
      </div>
    </div>
  )
}
