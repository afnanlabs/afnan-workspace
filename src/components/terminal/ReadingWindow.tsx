import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { BOOK_LIBRARY, type Book } from '@/data/library'
import { PersonalWindow } from './PersonalWindow'

interface ReadingWindowProps {
  onClose: () => void
}

/**
 * `reading` command popup — the books on the desk, two per row, each with its
 * cover. Grid columns stay at two as the library grows.
 */
export function ReadingWindow({ onClose }: ReadingWindowProps) {
  return (
    <PersonalWindow title="library://reading-desk" onClose={onClose} maxWidth={460}>
      <div style={{ padding: '16px 18px 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            marginBottom: 12,
            color: 'var(--reading-gold)',
          }}
        >
          <BookOpen size={13} />
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            At the Reading Desk
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 10,
              color: 'var(--vs-text-muted)',
              letterSpacing: 0,
              textTransform: 'none',
            }}
          >
            {BOOK_LIBRARY.length} books
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
          }}
        >
          {BOOK_LIBRARY.map((book) => (
            <BookTile key={`${book.title}-${book.author}`} book={book} />
          ))}
        </div>
      </div>
    </PersonalWindow>
  )
}

function BookTile({ book }: { book: Book }) {
  const [failed, setFailed] = useState(false)

  const inner = (
    <>
      <div
        className="book-cover"
        style={{
          position: 'relative',
          aspectRatio: '2 / 3',
          overflow: 'hidden',
          borderRadius: 4,
          background: 'var(--vs-surface)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.28)',
        }}
      >
        {failed ? (
          <div
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '0 12px',
              textAlign: 'center',
              color: 'var(--reading-gold)',
            }}
          >
            <BookOpen size={20} />
            <span
              style={{
                fontSize: 10.5,
                lineHeight: 1.4,
                color: 'var(--vs-text-muted)',
              }}
            >
              {book.title}
            </span>
          </div>
        ) : (
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            loading="eager"
            onError={() => setFailed(true)}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
      </div>

      <div style={{ marginTop: 9 }}>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 600,
            lineHeight: 1.35,
            color: 'var(--vs-text)',
          }}
        >
          {book.title}
        </div>
        <div
          style={{
            marginTop: 2,
            fontSize: 11,
            lineHeight: 1.4,
            color: 'var(--vs-text-muted)',
          }}
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
        className="book-tile"
        aria-label={`${book.title} by ${book.author}`}
        style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
      >
        {inner}
      </a>
    )
  }

  return <div className="book-tile">{inner}</div>
}
