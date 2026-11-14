import { useState } from "react"
import { ArrowUpRight, BookOpen } from "lucide-react"
import { BOOK_LIBRARY, CURRENTLY_READING } from "@/data/library"
import { LibraryModal } from "./LibraryModal"

/**
 * "At the Reading Desk" — one small, quiet card with the current book and a
 * way into the full library. Independent of the Spanish progress card.
 */
export function ReadingDesk() {
  const [libraryOpen, setLibraryOpen] = useState(false)
  const book = CURRENTLY_READING

  return (
    <div className="flex min-h-full items-center justify-center p-6 sm:p-10">
      <div
        className="w-full max-w-[440px] rounded-xl p-6 sm:p-7"
        style={{
          background: "var(--vs-surface)",
          border: "1px solid var(--vs-border)",
          boxShadow: "0 14px 40px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div
          className="flex items-center gap-2"
          style={{ color: "var(--reading-gold)" }}
        >
          <BookOpen size={14} />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            At the Reading Desk
          </span>
        </div>

        <div className="mt-5">
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--vs-text-muted)",
            }}
          >
            Currently reading
          </p>
          <h2
            className="mt-1.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 18,
              fontWeight: 600,
              lineHeight: 1.3,
              color: "var(--vs-text)",
            }}
          >
            {book.title}
          </h2>
          <p
            className="mt-1"
            style={{ fontSize: 13, color: "var(--vs-text-muted)" }}
          >
            by {book.author}
          </p>
        </div>

        <div
          className="mt-6"
          style={{ borderTop: "1px solid var(--vs-border)" }}
        />

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <button
            type="button"
            onClick={() => setLibraryOpen(true)}
            className="inline-flex items-center gap-1.5 rounded transition-opacity hover:opacity-80"
            style={{
              color: "var(--reading-gold)",
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: "0.02em",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-haspopup="dialog"
          >
            Browse Library
            <ArrowUpRight size={14} />
          </button>
          <span style={{ fontSize: 11, color: "var(--vs-text-muted)" }}>
            {BOOK_LIBRARY.length} books
          </span>
        </div>
      </div>

      {libraryOpen && (
        <LibraryModal
          books={BOOK_LIBRARY}
          onClose={() => setLibraryOpen(false)}
        />
      )}
    </div>
  )
}
