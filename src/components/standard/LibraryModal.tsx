import { useEffect, useRef, useState } from "react"
import { BookOpen, X } from "lucide-react"
import type { Book } from "@/data/library"

interface LibraryModalProps {
  books: Book[]
  onClose: () => void
}

/**
 * Compact, dark, gold-accented library. Rendered inside the workspace window
 * (the window's transform makes `fixed` relative to it), so it reads as a
 * refined sheet over the editor rather than a full-page takeover.
 */
export function LibraryModal({ books, onClose }: LibraryModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation()
        onClose()
      }
    }

    document.addEventListener("keydown", onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: "rgba(6, 5, 3, 0.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="reading-modal-in flex w-full flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="library-title"
        onClick={(event) => event.stopPropagation()}
        style={{
          maxWidth: 840,
          maxHeight: "100%",
          borderRadius: 18,
          background: "linear-gradient(165deg, #1b1710 0%, #110e09 100%)",
          border: "1px solid rgba(201, 162, 75, 0.28)",
          boxShadow:
            "0 30px 90px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 240, 200, 0.05)",
        }}
      >
        <header
          className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5"
          style={{ borderBottom: "1px solid rgba(201, 162, 75, 0.16)" }}
        >
          <div>
            <div
              className="flex items-center gap-2"
              style={{
                color: "#d8b25f",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              <BookOpen size={13} />
              <span>The Library</span>
            </div>
            <h2
              id="library-title"
              className="mt-2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 20,
                fontWeight: 600,
                color: "#f4ecda",
                lineHeight: 1.2,
              }}
            >
              Books I&apos;ve read
            </h2>
            <p className="mt-1" style={{ fontSize: 12, color: "#a99d84" }}>
              {books.length} {books.length === 1 ? "title" : "titles"} and
              counting.
            </p>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close library"
            className="flex shrink-0 items-center justify-center rounded-full transition-colors"
            style={{
              width: 32,
              height: 32,
              color: "#cfc2a4",
              background: "rgba(216, 178, 95, 0.08)",
              border: "1px solid rgba(201, 162, 75, 0.22)",
              cursor: "pointer",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "rgba(216, 178, 95, 0.18)"
              event.currentTarget.style.color = "#f4ecda"
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "rgba(216, 178, 95, 0.08)"
              event.currentTarget.style.color = "#cfc2a4"
            }}
          >
            <X size={16} />
          </button>
        </header>

        <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
            {books.map((book) => (
              <BookTile key={`${book.title}-${book.author}`} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BookTile({ book }: { book: Book }) {
  const [failed, setFailed] = useState(false)

  const inner = (
    <>
      <div
        className="relative overflow-hidden rounded-md"
        style={{
          aspectRatio: "2 / 3",
          background: "#221b12",
          border: "1px solid rgba(201, 162, 75, 0.18)",
          boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-3 text-center">
            <BookOpen size={20} style={{ color: "#7d6a41" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                lineHeight: 1.4,
                color: "#a99d84",
              }}
            >
              {book.title}
            </span>
          </div>
        ) : (
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="mt-2.5">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12.5,
            fontWeight: 500,
            lineHeight: 1.35,
            color: "#f4ecda",
          }}
        >
          {book.title}
        </div>
        <div
          className="mt-0.5"
          style={{ fontSize: 11.5, lineHeight: 1.4, color: "#a99d84" }}
        >
          {book.author}
        </div>
      </div>
    </>
  )

  if (book.url) {
    return (
      <a
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        className="library-tile group block"
        aria-label={`${book.title} by ${book.author}`}
      >
        {inner}
      </a>
    )
  }

  return <div className="group block">{inner}</div>
}
