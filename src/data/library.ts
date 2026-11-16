import atomicHabitsCover from "@/assets/books/atomic-habits.jpg"
import influenceCover from "@/assets/books/influence.jpg"
import thinkingFastAndSlowCover from "@/assets/books/thinking-fast-and-slow.jpg"
import thinkingInSystemsCover from "@/assets/books/thinking-in-systems.jpg"

export interface Book {
  title: string
  author: string
  /** Portrait (2:3) cover image. Open Library covers work well. */
  cover: string
  /** Optional detail link — the tile becomes clickable when present. */
  url?: string
}

/**
 * Books on the reading desk.
 *
 * Append to this array as you finish more books — the reading window lays them
 * out two per row automatically.
 */
export const BOOK_LIBRARY: Book[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    cover: atomicHabitsCover,
    url: "https://openlibrary.org/isbn/9780735211292",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: thinkingFastAndSlowCover,
    url: "https://openlibrary.org/isbn/9780374533557",
  },
  {
    title: "Influence",
    author: "Robert B. Cialdini",
    cover: influenceCover,
    url: "https://openlibrary.org/isbn/9780061241895",
  },
  {
    title: "Thinking in Systems",
    author: "Donella H. Meadows",
    cover: thinkingInSystemsCover,
    url: "https://openlibrary.org/isbn/9781603580557",
  },
]
