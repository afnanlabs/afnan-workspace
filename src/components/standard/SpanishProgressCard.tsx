import { SPANISH_PROGRESS } from "@/data/spanish"

/**
 * A deliberately small, quiet card — informational rather than a project
 * dashboard. Uses the workspace's own type, spacing and colour tokens so it
 * reads as part of the editor rather than an embedded widget.
 */
export function SpanishProgressCard() {
  const { flag, language, level } = SPANISH_PROGRESS

  return (
    <div className="flex min-h-full items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-[360px]">
        <div className="flex items-start gap-4">
          <span aria-hidden="true" className="text-3xl leading-none">
            {flag}
          </span>
          <div className="min-w-0">
            <h2
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--vs-text)",
                letterSpacing: "0.01em",
              }}
            >
              Learning {language}
            </h2>
            <p
              className="mt-1.5"
              style={{
                fontSize: "12.5px",
                lineHeight: 1.7,
                color: "var(--vs-text-muted)",
              }}
            >
              Currently studying at the{" "}
              <span style={{ color: "var(--vs-text)", fontWeight: 600 }}>
                {level}
              </span>{" "}
              level.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
