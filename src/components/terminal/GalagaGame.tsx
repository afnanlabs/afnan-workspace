import { useEffect, useRef, useState, useCallback } from 'react'
import { useAudio } from '@/hooks/use-audio.ts'
import { useHighScore } from '@/lib/arcade'
import { ArcadeButtonBar } from './ArcadeControls'

const COLS = 22
const ROWS = 25
const CELL = 16
const W = COLS * CELL
const H = ROWS * CELL

const FORM_COLS = 8
const FORM_ROWS = 5
const SPX = 34
const SPY = 26
const FORM_X0 = 40
const FORM_Y0 = 28
const MARGIN = 8
const STEP = 6
const DOWN_STEP = 14

const PLAYER_W = 26
const PLAYER_H = 14
const PLAYER_Y = H - 30
const PLAYER_SPEED = 3.4
const BULLET_W = 3
const PLAYER_BULLET_V = -6.5
const ENEMY_BULLET_V = 4.2
const TICK = 16

// Fire tuning: tapping Space fires instantly; holding it fires on a cadence.
const MAX_BULLETS = 4
const HOLD_FIRE_COOLDOWN = 150

const ENEMY_W = 20
const ENEMY_H = 16

const POINTS = [100, 80, 50]
const COLORS = ['#ff6b6b', '#4dd0e1', '#aed581']

type Enemy = { x: number; y: number; row: number; col: number; alive: boolean; type: number }
type Bullet = { x: number; y: number; vy: number; from: 'player' | 'enemy' }

function spawnWave(): Enemy[] {
  const enemies: Enemy[] = []
  const rows = [0, 1, 1, 2, 2]
  for (let r = 0; r < FORM_ROWS; r++) {
    for (let c = 0; c < FORM_COLS; c++) {
      enemies.push({
        row: r,
        col: c,
        x: FORM_X0 + c * SPX,
        y: FORM_Y0 + r * SPY,
        alive: true,
        type: rows[r],
      })
    }
  }
  return enemies
}

function marchInterval(wave: number, alive: number) {
  const base = 520 - (wave - 1) * 50 - (FORM_ROWS * FORM_COLS - alive) * 10
  return Math.max(90, base)
}

function fireInterval(wave: number) {
  return Math.max(300, 900 - (wave - 1) * 80)
}

function centerOf(e: Enemy) {
  return { x: e.x + ENEMY_W / 2, y: e.y + ENEMY_H / 2 }
}

function hit(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
}

function initState() {
  return {
    px: W / 2 - PLAYER_W / 2,
    enemies: spawnWave(),
    pBullets: [] as Bullet[],
    eBullets: [] as Bullet[],
    dir: 1,
    wave: 1,
    score: 0,
    lives: 3,
    dead: false,
    invUntil: 0,
    marchAcc: 0,
    fireAcc: 0,
    lastTs: 0,
    lastShot: 0,
  }
}

export function GalagaGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef(initState())
  const keysRef = useRef<Set<string>>(new Set())
  const fireRef = useRef(false)
  const spaceHeldRef = useRef(false)
  const [score, setScore] = useState(0)
  const [wave, setWave] = useState(1)
  const [lives, setLives] = useState(3)
  const [dead, setDead] = useState(false)
  const [paused, setPaused] = useState(false)
  const [newBest, setNewBest] = useState(false)
  const rafRef = useRef<number | null>(null)
  const pausedRef = useRef(false)

  const audio = useAudio()
  const { best, submit } = useHighScore('galaga')
  const audioRef = useRef(audio)
  audioRef.current = audio
  const submitRef = useRef(submit)
  submitRef.current = submit

  const restart = useCallback(() => {
    stateRef.current = initState()
    keysRef.current.clear()
    fireRef.current = false
    spaceHeldRef.current = false
    pausedRef.current = false
    setPaused(false)
    setNewBest(false)
    setScore(0)
    setWave(1)
    setLives(3)
    setDead(false)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key
      if (k === 'p' || k === 'P' || k === 'Escape') {
        if (stateRef.current.dead) return
        e.preventDefault()
        pausedRef.current = !pausedRef.current
        setPaused(pausedRef.current)
        stateRef.current.lastTs = 0
        return
      }
      if (pausedRef.current) return
      if (k === 'ArrowLeft' || k === 'a' || k === 'A' || k === 'ArrowRight' || k === 'd' || k === 'D') {
        e.preventDefault()
        keysRef.current.add(k)
      } else if (k === ' ') {
        e.preventDefault()
        spaceHeldRef.current = true
        if (!e.repeat) fireRef.current = true
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key)
      if (e.key === ' ') spaceHeldRef.current = false
    }
    const onBlur = () => {
      keysRef.current.clear()
      spaceHeldRef.current = false
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const BG = getComputedStyle(document.documentElement).getPropertyValue('--vs-bg').trim() || '#1e1e1e'
    const GRID_C = getComputedStyle(document.documentElement).getPropertyValue('--vs-border').trim() || '#2d2d2d'
    const PLAYER_C = getComputedStyle(document.documentElement).getPropertyValue('--vs-accent').trim() || '#569cd6'
    const BULLET_C = '#ffe082'

    function drawPlayer(p: { x: number }, now: number) {
      if (now < stateRef.current.invUntil && Math.floor(now / 90) % 2 === 0) return
      const x = p.x
      const y = PLAYER_Y
      ctx.fillStyle = PLAYER_C
      // fuselage
      ctx.fillRect(x + PLAYER_W / 2 - 3, y, 6, PLAYER_H)
      // wings
      ctx.beginPath()
      ctx.moveTo(x, y + PLAYER_H)
      ctx.lineTo(x + PLAYER_W / 2, y + 2)
      ctx.lineTo(x + PLAYER_W, y + PLAYER_H)
      ctx.closePath()
      ctx.fill()
      // cockpit
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.fillRect(x + PLAYER_W / 2 - 1.5, y + 1, 3, 5)
    }

    function drawEnemy(e: Enemy) {
      const c = COLORS[e.type]
      const x = e.x
      const y = e.y
      ctx.fillStyle = c
      // body
      ctx.fillRect(x + 3, y + 2, ENEMY_W - 6, ENEMY_H - 6)
      // wings
      ctx.fillRect(x, y + 6, 4, 6)
      ctx.fillRect(x + ENEMY_W - 4, y + 6, 4, 6)
      // top nub
      ctx.fillRect(x + ENEMY_W / 2 - 2, y, 4, 3)
      // eyes
      ctx.fillStyle = BG
      ctx.fillRect(x + 6, y + 6, 3, 3)
      ctx.fillRect(x + ENEMY_W - 9, y + 6, 3, 3)
    }

    function drawBullet(b: Bullet) {
      ctx.fillStyle = b.from === 'player' ? BULLET_C : '#ff8a65'
      ctx.fillRect(b.x - BULLET_W / 2, b.y, BULLET_W, 8)
    }

    function draw(now: number) {
      const s = stateRef.current
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, W, H)

      ctx.strokeStyle = GRID_C
      ctx.lineWidth = 0.3
      ctx.globalAlpha = 0.2
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke()
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke()
      }
      ctx.globalAlpha = 1

      s.enemies.forEach((e) => { if (e.alive) drawEnemy(e) })
      s.pBullets.forEach(drawBullet)
      s.eBullets.forEach(drawBullet)
      drawPlayer({ x: s.px }, now)
    }

    function loseLife(now: number) {
      const s = stateRef.current
      s.lives--
      setLives(s.lives)
      s.eBullets = []
      s.pBullets = []
      s.px = W / 2 - PLAYER_W / 2
      s.invUntil = now + 1600
      audioRef.current.play('explode')
      if (s.lives <= 0) {
        s.dead = true
        setDead(true)
        audioRef.current.play('gameover')
        setNewBest(submitRef.current(s.score))
      }
    }

    function tick(ts: number) {
      const s = stateRef.current
      if (s.dead) { draw(ts); return }
      if (pausedRef.current) { draw(ts); rafRef.current = requestAnimationFrame(tick); return }
      const dt = s.lastTs ? Math.min(50, ts - s.lastTs) : TICK
      s.lastTs = ts

      // --- player movement ---
      if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a') || keysRef.current.has('A')) {
        s.px = Math.max(4, s.px - PLAYER_SPEED * (dt / TICK))
      }
      if (keysRef.current.has('ArrowRight') || keysRef.current.has('d') || keysRef.current.has('D')) {
        s.px = Math.min(W - PLAYER_W - 4, s.px + PLAYER_SPEED * (dt / TICK))
      }

      // --- fire ---
      // Tap Space -> immediate single shot (fireRef). Hold Space -> repeated shots on a cooldown (spaceHeldRef).
      if (fireRef.current) {
        fireRef.current = false
        if (s.pBullets.length < MAX_BULLETS) {
          s.pBullets.push({ x: s.px + PLAYER_W / 2, y: PLAYER_Y - 4, vy: PLAYER_BULLET_V, from: 'player' })
          s.lastShot = ts
          audioRef.current.play('shoot')
        }
      } else if (spaceHeldRef.current && ts - s.lastShot >= HOLD_FIRE_COOLDOWN) {
        if (s.pBullets.length < MAX_BULLETS) {
          s.pBullets.push({ x: s.px + PLAYER_W / 2, y: PLAYER_Y - 4, vy: PLAYER_BULLET_V, from: 'player' })
          s.lastShot = ts
          audioRef.current.play('shoot')
        }
      }

      // --- move bullets ---
      s.pBullets = s.pBullets.filter((b) => (b.y += b.vy * (dt / TICK)) > -10)
      s.eBullets = s.eBullets.filter((b) => (b.y += b.vy * (dt / TICK)) < H + 10)

      // --- formation march ---
      s.marchAcc += dt
      const aliveEnemies = s.enemies.filter((e) => e.alive)
      if (aliveEnemies.length > 0) {
        if (s.marchAcc >= marchInterval(s.wave, aliveEnemies.length)) {
          s.marchAcc = 0
          let minX = Infinity
          let maxX = -Infinity
          aliveEnemies.forEach((e) => { minX = Math.min(minX, e.x); maxX = Math.max(maxX, e.x) })
          const nextMin = minX + s.dir * STEP
          const nextMax = maxX + s.dir * STEP
          if (nextMin <= MARGIN || nextMax >= W - MARGIN - ENEMY_W) {
            s.dir *= -1
            aliveEnemies.forEach((e) => { e.y += DOWN_STEP })
          } else {
            aliveEnemies.forEach((e) => { e.x += s.dir * STEP })
          }
        }
      }

      // --- enemy fire ---
      s.fireAcc += dt
      if (aliveEnemies.length > 0 && s.fireAcc >= fireInterval(s.wave)) {
        s.fireAcc = 0
        // bottom-most alive enemy per column
        const byCol = new Map<number, Enemy>()
        aliveEnemies.forEach((e) => {
          const cur = byCol.get(e.col)
          if (!cur || e.y > cur.y) byCol.set(e.col, e)
        })
        const shooters = Array.from(byCol.values())
        const shooter = shooters[Math.floor(Math.random() * shooters.length)]
        if (shooter) {
          const c = centerOf(shooter)
          s.eBullets.push({ x: c.x, y: c.y + ENEMY_H / 2, vy: ENEMY_BULLET_V, from: 'enemy' })
        }
      }

      // --- player bullets vs enemies ---
      s.pBullets = s.pBullets.filter((b) => {
        for (const e of s.enemies) {
          if (e.alive && hit(b.x - BULLET_W / 2, b.y, BULLET_W, 8, e.x, e.y, ENEMY_W, ENEMY_H)) {
            e.alive = false
            s.score += POINTS[e.type]
            setScore(s.score)
            audioRef.current.play('hit')
            return false
          }
        }
        return true
      })

      // --- wave clear ---
      if (s.enemies.every((e) => !e.alive)) {
        s.wave++
        setWave(s.wave)
        s.enemies = spawnWave()
        s.eBullets = []
        s.pBullets = []
        s.px = W / 2 - PLAYER_W / 2
        s.marchAcc = 0
        s.fireAcc = 0
        s.invUntil = ts + 900
        audioRef.current.play('clear')
      }

      // --- enemy bullets vs player ---
      const px = s.px
      s.eBullets = s.eBullets.filter((b) => {
        if (hit(b.x - BULLET_W / 2, b.y, BULLET_W, 8, px, PLAYER_Y, PLAYER_W, PLAYER_H)) {
          if (ts >= s.invUntil) {
            loseLife(ts)
            return false
          }
          return false
        }
        return true
      })

      // --- enemies reach player ---
      for (const e of s.enemies) {
        if (e.alive && e.y + ENEMY_H >= PLAYER_Y) {
          loseLife(ts)
          break
        }
      }

      draw(ts)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [dead])

  // ---- touch: drag to move, hold to fire ----
  const pointerActiveRef = useRef(false)
  const onPointerDown = (e: React.PointerEvent) => {
    if (stateRef.current.dead || pausedRef.current) return
    pointerActiveRef.current = true
    spaceHeldRef.current = true
    fireRef.current = true
    try { (e.currentTarget as Element).setPointerCapture(e.pointerId) } catch { /* ignore */ }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointerActiveRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const scale = canvas.clientWidth ? canvas.clientWidth / W : 1
    const s = stateRef.current
    s.px = Math.max(4, Math.min(W - PLAYER_W - 4, s.px + e.movementX / scale))
  }
  const onPointerUp = () => {
    pointerActiveRef.current = false
    spaceHeldRef.current = false
  }
  const touchPause = () => {
    if (stateRef.current.dead) return
    pausedRef.current = !pausedRef.current
    setPaused(pausedRef.current)
    stateRef.current.lastTs = 0
  }

  return (
    <div className="flex gap-3 flex-wrap" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(10px, 2.5vw, 11px)' }}>
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ display: 'block', border: '1px solid var(--vs-border)', maxWidth: '100%', height: 'auto', touchAction: 'none' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
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
            {newBest && <div style={{ fontSize: '11px', color: '#7cc36b', letterSpacing: '0.08em' }}>★ NEW BEST</div>}
            <div style={{ color: 'var(--vs-text-muted)', fontSize: '11px' }}>score: {score} · best: {best}</div>
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
        {paused && !dead && (
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 6,
              fontFamily: 'var(--font-mono)', color: 'var(--vs-text)',
            }}
          >
            <div style={{ fontSize: '15px', color: 'var(--vs-accent)', letterSpacing: '0.2em' }}>PAUSED</div>
            <div style={{ fontSize: '11px', color: 'var(--vs-text-muted)' }}>press P to resume</div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3" style={{ minWidth: 72 }}>
        <div style={{ color: 'var(--vs-text-muted)' }}>
          <div>SCORE</div>
          <div style={{ color: 'var(--vs-accent)', fontSize: '13px' }}>{score}</div>
        </div>
        <div style={{ color: 'var(--vs-text-muted)' }}>
          <div>BEST</div>
          <div style={{ color: '#7cc36b', fontSize: '13px' }}>{best}</div>
        </div>
        <div style={{ color: 'var(--vs-text-muted)' }}>
          <div>WAVE</div>
          <div style={{ color: 'var(--vs-accent)', fontSize: '13px' }}>{wave}</div>
        </div>
        <div style={{ color: 'var(--vs-text-muted)' }}>
          <div>LIVES</div>
          <div style={{ color: 'var(--vs-accent)', fontSize: '13px' }}>{lives}</div>
        </div>
        <div style={{ color: 'var(--vs-text-muted)', lineHeight: 1.8, fontSize: '10px' }}>
          <div>← → move</div>
          <div>SPC fire</div>
          <div>hold = auto</div>
          <div>P pause</div>
        </div>
      </div>

      <div style={{ flexBasis: '100%' }}>
        <ArcadeButtonBar
          items={[
            {
              key: 'fire',
              label: 'FIRE',
              ariaLabel: 'Fire',
              onPress: () => { fireRef.current = true; spaceHeldRef.current = true },
              onRelease: () => { spaceHeldRef.current = false },
            },
            { key: 'pause', label: 'II', ariaLabel: 'Pause', onPress: touchPause },
          ]}
        />
      </div>
    </div>
  )
}
