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
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    url: "https://openlibrary.org/isbn/9780735211292",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg",
    url: "https://openlibrary.org/isbn/9780374533557",
  },
]
