export interface Book {
  title: string
  author: string
  /** Portrait (2:3) cover image. Open Library covers work well. */
  cover: string
  /** Optional detail link — the tile becomes clickable when present. */
  url?: string
}

/**
 * The book currently on the desk.
 * Swap title / author / cover when you move on to the next one.
 */
export const CURRENTLY_READING: Book = {
  title: "Crime and Punishment",
  author: "Fyodor Dostoevsky",
  cover: "https://covers.openlibrary.org/b/isbn/9780143058144-L.jpg",
  url: "https://openlibrary.org/isbn/9780143058144",
}

/**
 * Books I've finished. Append to this array as you read more —
 * the library modal grows automatically.
 */
export const BOOK_LIBRARY: Book[] = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    url: "https://openlibrary.org/isbn/9780062315007",
  },
  {
    title: "1984",
    author: "George Orwell",
    cover: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    url: "https://openlibrary.org/isbn/9780451524935",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    url: "https://openlibrary.org/isbn/9780061120084",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    url: "https://openlibrary.org/isbn/9780743273565",
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    url: "https://openlibrary.org/isbn/9780062316097",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    url: "https://openlibrary.org/isbn/9780735211292",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    url: "https://openlibrary.org/isbn/9780857197689",
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    cover: "https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg",
    url: "https://openlibrary.org/isbn/9780807014295",
  },
]
