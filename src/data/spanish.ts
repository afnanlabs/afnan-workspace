/**
 * Spanish learning progress.
 *
 * Update `level` as you move up the CEFR scale (A1 → A2 → B1 → B2 → C1 → C2).
 * Everything in the `lang` popup — the scale, the next milestone, the counter —
 * is derived from this one value.
 */

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const

export type CefrLevel = (typeof CEFR_LEVELS)[number]

export const SPANISH_PROGRESS: {
  language: string
  nativeName: string
  level: CefrLevel
} = {
  language: "Spanish",
  nativeName: "Español",
  level: "A1",
}

/** Index of the current level on the CEFR scale (-1 if misconfigured). */
export const SPANISH_LEVEL_INDEX = CEFR_LEVELS.indexOf(SPANISH_PROGRESS.level)

/** The next level up, or null once C2 is reached. */
export const SPANISH_NEXT_LEVEL: CefrLevel | null =
  SPANISH_LEVEL_INDEX >= 0 && SPANISH_LEVEL_INDEX < CEFR_LEVELS.length - 1
    ? CEFR_LEVELS[SPANISH_LEVEL_INDEX + 1]
    : null
