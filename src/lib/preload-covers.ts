import { BOOK_LIBRARY } from "@/data/library"

let started = false

/**
 * Warm the browser cache for the reading-desk covers.
 *
 * Covers are local, hashed assets, so a single fetch is enough — the service
 * worker keeps them cache-first afterwards. Runs once, after the app is idle,
 * so it never competes with the initial render.
 */
export function preloadBookCovers(): void {
  if (started || typeof window === "undefined") return
  started = true

  const load = () => {
    for (const book of BOOK_LIBRARY) {
      const image = new Image()
      image.decoding = "async"
      image.src = book.cover
      if (typeof image.decode === "function") {
        void image.decode().catch(() => {})
      }
    }
  }

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(load, { timeout: 1500 })
  } else {
    window.setTimeout(load, 800)
  }
}
