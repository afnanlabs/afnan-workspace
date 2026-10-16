import { useCallback, useEffect, useState } from 'react'

/**
 * Personal-best (high score) storage for the retro arcade.
 *
 * Scores live in localStorage so they survive closing the arcade window and
 * reloading the page. Components subscribe to {@link CHANGE_EVENT} so the
 * lobby and any open game stay in sync, and the `storage` event keeps multiple
 * tabs consistent.
 */

export type ArcadeGameId = 'snake' | 'tetris' | 'galaga' | 'pacman'

export const ARCADE_GAMES: ArcadeGameId[] = ['snake', 'tetris', 'galaga', 'pacman']

export const ARCADE_GAME_LABELS: Record<ArcadeGameId, string> = {
  snake: 'SNAKE',
  tetris: 'TETRIS',
  galaga: 'GALAGA',
  pacman: 'PAC-MAN',
}

const STORAGE_KEY = 'afnan-arcade-highscores'
const CHANGE_EVENT = 'afnan-arcade-scores-change'

type ScoreMap = Partial<Record<ArcadeGameId, number>>

function readAll(): ScoreMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    const out: ScoreMap = {}
    for (const game of ARCADE_GAMES) {
      const value = (parsed as Record<string, unknown>)[game]
      if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
        out[game] = Math.floor(value)
      }
    }
    return out
  } catch {
    return {}
  }
}

function writeAll(scores: ScoreMap) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
  } catch {
    // Storage may be unavailable (private mode / disabled). Fail silently.
  }
}

/** Current personal best for a single game (0 when never played). */
export function getHighScore(game: ArcadeGameId): number {
  return readAll()[game] ?? 0
}

/** Current personal best for every game. */
export function getAllHighScores(): Record<ArcadeGameId, number> {
  const all = readAll()
  const out = {} as Record<ArcadeGameId, number>
  for (const game of ARCADE_GAMES) out[game] = all[game] ?? 0
  return out
}

/**
 * Records a score if it beats the stored personal best.
 * Returns `true` when a new best was set.
 */
export function submitHighScore(game: ArcadeGameId, score: number): boolean {
  const value = Math.floor(score)
  if (value <= 0) return false
  const all = readAll()
  if (value <= (all[game] ?? 0)) return false
  all[game] = value
  writeAll(all)
  return true
}

/** Clears every stored high score. */
export function resetHighScores() {
  writeAll({})
}

/**
 * Tracks the personal best for one game and exposes a submit function.
 * The value re-syncs whenever any tab (or this one) changes the scores.
 */
export function useHighScore(game: ArcadeGameId) {
  const [best, setBest] = useState(() => getHighScore(game))

  useEffect(() => {
    const sync = () => setBest(getHighScore(game))
    sync()
    window.addEventListener(CHANGE_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [game])

  const submit = useCallback((score: number) => submitHighScore(game, score), [game])

  return { best, submit }
}
