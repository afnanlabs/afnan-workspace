import { SPANISH_PROGRESS } from './spanish'

export interface Language {
  /** English name shown as the tile label. */
  name: string
  /** Name in its own script. Hidden when it matches `name`. */
  nativeName: string
  /** ISO 639-1 code, shown as a small badge. */
  code: string
  /** Text direction for the native name. */
  dir?: 'ltr' | 'rtl'
  /** True for the language currently being studied. */
  learning?: boolean
}

/**
 * Languages shown in the `lang` popup, laid out two per row.
 *
 * The learning entry is derived from `SPANISH_PROGRESS`, so the name and the
 * CEFR level always stay in sync with `src/data/spanish.ts`.
 */
export const LANGUAGES: Language[] = [
  {
    name: 'English',
    nativeName: 'English',
    code: 'en',
  },
  {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    code: 'hi',
  },
  {
    name: 'Marathi',
    nativeName: 'मराठी',
    code: 'mr',
  },
  {
    name: 'Urdu',
    nativeName: 'اردو',
    code: 'ur',
    dir: 'rtl',
  },
  {
    name: SPANISH_PROGRESS.language,
    nativeName: SPANISH_PROGRESS.nativeName,
    code: 'es',
    learning: true,
  },
]
