import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ALL_FILES, fileContents, type FileType } from "@/data/content";
import { fileIcon } from "./EditorComponents";

interface Match {
  fileId: string;
  displayName: string;
  extension: FileType;
  line: number;
  text: string;
}

const MAX_RESULTS = 150;

export function SearchPanel({
  onFileSelect,
}: {
  onFileSelect: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const matches = useMemo<Match[]>(() => {
    const raw = query.trim();
    if (!raw) return [];
    const needle = caseSensitive ? raw : raw.toLowerCase();
    const out: Match[] = [];

    for (const file of ALL_FILES) {
      if (file.extension === "pdf") continue;
      const content = fileContents[file.id];
      if (!content) continue;
      const lines = content.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const hay = caseSensitive ? lines[i] : lines[i].toLowerCase();
        if (hay.includes(needle)) {
          out.push({
            fileId: file.id,
            displayName: file.displayName,
            extension: file.extension,
            line: i + 1,
            text: lines[i].trim().slice(0, 160),
          });
          if (out.length >= MAX_RESULTS) return out;
        }
      }
    }
    return out;
  }, [query, caseSensitive]);

  // Group matches by file while preserving order of first appearance.
  const groups = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const m of matches) {
      const list = map.get(m.fileId);
      if (list) list.push(m);
      else map.set(m.fileId, [m]);
    }
    return Array.from(map.entries());
  }, [matches]);

  return (
    <div
      className="flex flex-col shrink-0 overflow-hidden w-[200px] lg:w-[240px]"
      style={{
        background: "var(--vs-surface)",
        borderRight: "1px solid var(--vs-border)",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
      }}
    >
      <div
        className="px-3 py-2 uppercase select-none shrink-0"
        style={{
          color: "var(--vs-text-muted)",
          fontSize: "10px",
          letterSpacing: "0.1em",
        }}
      >
        Search
      </div>

      {/* Query input */}
      <div className="px-2 pb-2 shrink-0">
        <div
          className="flex items-center gap-1 px-2"
          style={{
            background: "var(--vs-bg)",
            border: "1px solid var(--vs-border)",
            borderRadius: 3,
            height: 26,
          }}
        >
          <Search size={12} style={{ color: "var(--vs-text-muted)", flexShrink: 0 }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files"
            aria-label="Search files"
            style={{
              flex: 1,
              minWidth: 0,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--vs-text)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              style={{
                display: "flex",
                alignItems: "center",
                background: "transparent",
                border: "none",
                color: "var(--vs-text-muted)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <X size={12} />
            </button>
          )}
        </div>

        <label
          className="flex items-center gap-1 mt-2 select-none"
          style={{ color: "var(--vs-text-muted)", fontSize: "10px", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            style={{ accentColor: "var(--vs-accent)" }}
          />
          Match case
        </label>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {query.trim() === "" ? (
          <div
            className="px-3 py-4"
            style={{ color: "var(--vs-text-muted)", fontSize: "11px", opacity: 0.7 }}
          >
            Search across every file in the workspace.
          </div>
        ) : matches.length === 0 ? (
          <div
            className="px-3 py-4"
            style={{ color: "var(--vs-text-muted)", fontSize: "11px", opacity: 0.7 }}
          >
            No results found.
          </div>
        ) : (
          <>
            <div
              className="px-3 py-1"
              style={{ color: "var(--vs-text-muted)", fontSize: "10px" }}
            >
              {matches.length}
              {matches.length >= MAX_RESULTS ? "+" : ""} results in {groups.length} files
            </div>
            {groups.map(([fileId, items]) => (
              <div key={fileId} className="mb-1">
                <button
                  onClick={() => onFileSelect(fileId)}
                  className="flex items-center gap-2 w-full px-3 py-1 text-left hover:opacity-90"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--vs-text)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  {fileIcon(items[0].extension, 12)}
                  <span>{items[0].displayName}</span>
                  <span style={{ marginLeft: "auto", color: "var(--vs-text-muted)" }}>
                    {items.length}
                  </span>
                </button>
                {items.map((m, idx) => (
                  <button
                    key={`${fileId}-${m.line}-${idx}`}
                    onClick={() => onFileSelect(fileId)}
                    className="block w-full px-3 py-[3px] text-left truncate hover:bg-white/5"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--vs-text-muted)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                    }}
                    title={`${fileId}:${m.line}  ${m.text}`}
                  >
                    <span style={{ color: "var(--vs-text-muted)", opacity: 0.7 }}>
                      {m.line}
                    </span>
                    <span style={{ marginLeft: 8 }}>{m.text || "\u00a0"}</span>
                  </button>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
