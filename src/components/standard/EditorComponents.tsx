import { useState } from "react";
import {
  FileText,
  FileCode2,
  Braces,
  File,
  FileImage,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import {
  EXPLORER_FOLDERS,
  ALL_FILES,
  fileContents,
  type FileEntry,
  type FileType,
} from "@/data/content";

// ─── Explorer ───────────────────────────────────────────────────────────────

interface ExplorerProps {
  activeFile: string;
  onFileSelect: (id: string) => void;
  onFileOpen?: (id: string) => void;
  onFolderToggle?: (folderName: string) => void;
}

export function fileIcon(extension: FileType, size = 13) {
  switch (extension) {
    case "md":
      return (
        <FileText size={size} style={{ color: "#519aba", flexShrink: 0 }} />
      );
    case "ts":
      return (
        <FileCode2 size={size} style={{ color: "#3178c6", flexShrink: 0 }} />
      );
    case "json":
      return <Braces size={size} style={{ color: "#f5a623", flexShrink: 0 }} />;
    case "pdf":
      return <File size={size} style={{ color: "#e74c3c", flexShrink: 0 }} />;
    case "webp":
      return (
        <FileImage size={size} style={{ color: "#a8b5c8", flexShrink: 0 }} />
      );
  }
}

export function Explorer({
  activeFile,
  onFileSelect,
  onFileOpen,
  onFolderToggle,
}: ExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(
    EXPLORER_FOLDERS.map((f) => f.name),
  );

  function toggleFolder(name: string) {
    setExpandedFolders((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
    onFolderToggle?.(name);
  }

  return (
    <div
      className="flex flex-col shrink-0 overflow-y-auto"
      style={{
        width: 220,
        background: "var(--vs-surface)",
        borderRight: "1px solid var(--vs-border)",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
      }}
    >
      {/* Section header */}
      <div
        className="flex items-center gap-1 px-3 py-2 uppercase select-none"
        style={{
          color: "var(--vs-text-muted)",
          fontSize: "10px",
          letterSpacing: "0.1em",
        }}
      >
        <ChevronDown size={10} />
        <span>Explorer</span>
      </div>

      {/* Folders */}
      {EXPLORER_FOLDERS.map((folder) => {
        const isExpanded = expandedFolders.includes(folder.name);
        return (
          <div key={folder.name}>
            {/* Folder header */}
            <button
              className="flex items-center gap-1 px-3 py-1 w-full text-left select-none"
              style={{
                color: "var(--vs-text)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => toggleFolder(folder.name)}
            >
              {isExpanded ? (
                <ChevronDown size={10} />
              ) : (
                <ChevronRight size={10} />
              )}
              <span>{folder.name}</span>
            </button>

            {/* Folder files */}
            {isExpanded && (
              <div className="flex flex-col">
                {folder.files.map((file) => (
                  <ExplorerItem
                    key={file.id}
                    file={file}
                    isActive={file.id === activeFile}
                    onClick={() => {
                      if (file.extension === "pdf") {
                        const a = document.createElement("a");
                        a.href = "/resume.pdf";
                        a.download = "AfnanKhan_Resume.pdf";
                        a.click();
                      } else if (file.extension !== "webp") {
                        onFileSelect(file.id);
                        onFileOpen?.(file.id);
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ExplorerItem({
  file,
  isActive,
  onClick,
}: {
  file: FileEntry;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-[3px] w-full text-left transition-colors"
      style={{
        background: isActive ? "var(--vs-surface-alt)" : "transparent",
        color: isActive ? "var(--vs-text)" : "var(--vs-text-muted)",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {fileIcon(file.extension)}
      <span>{file.displayName}</span>
    </button>
  );
}

// ─── Tab Bar ────────────────────────────────────────────────────────────────

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
  onTabSwitch?: (id: string) => void;
}

export function TabBar({
  tabs,
  activeTab,
  onTabSelect,
  onTabClose,
  onTabSwitch,
}: TabBarProps) {
  return (
    <div
      className="flex items-end border-b shrink-0 overflow-x-auto"
      style={{
        background: "var(--vs-surface)",
        borderColor: "var(--vs-border)",
        height: 35,
      }}
    >
      {tabs.map((id) => {
        const file = ALL_FILES.find((f) => f.id === id);
        if (!file) return null;
        const isActive = id === activeTab;
        return (
          <div
            key={id}
            className="flex items-center gap-2 px-3 h-full cursor-pointer select-none shrink-0"
            style={{
              background: isActive ? "var(--vs-bg)" : "var(--vs-surface)",
              color: isActive ? "var(--vs-text)" : "var(--vs-text-muted)",
              borderRight: "1px solid var(--vs-border)",
              borderTop: isActive
                ? "1px solid var(--vs-accent)"
                : "1px solid transparent",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            }}
            onClick={() => {
              onTabSelect(id);
              onTabSwitch?.(id);
            }}
          >
            {fileIcon(file.extension)}
            <span>{file.displayName}</span>
            <button
              className="flex items-center justify-center w-4 h-4 rounded hover:opacity-70 transition-opacity"
              style={{
                color: "var(--vs-text-muted)",
                flexShrink: 0,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(id);
              }}
              title="Close tab"
            >
              <X size={10} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ─── Editor Content ──────────────────────────────────────────────────────────

interface EditorContentProps {
  fileId: string;
}

export function EditorContent({ fileId }: EditorContentProps) {
  const file = ALL_FILES.find((f) => f.id === fileId);
  const content = fileContents[fileId] ?? "";

  if (!file) return null;

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{
        background: "var(--vs-bg)",
        fontFamily:
          file.extension === "md" ? "var(--font-sans)" : "var(--font-mono)",
      }}
    >
      {file.extension === "md" && <MarkdownRenderer content={content} />}
      {file.extension === "ts" && <TypeScriptRenderer content={content} />}
      {file.extension === "json" && <JsonRenderer content={content} />}
    </div>
  );
}

// ─── Line Number Gutter ───────────────────────────────────────────────────────

function LineGutter({ count }: { count: number }) {
  return (
    <div
      className="select-none shrink-0 py-4 text-right"
      style={{
        color: "var(--vs-text-muted)",
        fontFamily: "var(--font-mono)",
        fontSize: "13px",
        lineHeight: 1.6,
        borderRight: "1px solid var(--vs-border)",
        minWidth: 48,
        paddingLeft: 8,
        paddingRight: 12,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i + 1}>{i + 1}</div>
      ))}
    </div>
  );
}

// ─── Markdown Renderer ───────────────────────────────────────────────────────

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="flex h-full">
      <LineGutter count={lines.length} />
      <div
        className="flex-1 px-8 py-4 overflow-y-auto"
        style={{ maxWidth: 740 }}
      >
        {renderMarkdownLines(lines)}
      </div>
    </div>
  );
}

function renderMarkdownLines(lines: string[]): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      nodes.push(
        <h1
          key={i}
          className="mt-0 mb-4"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "18px",
            fontWeight: 700,
            color: "var(--vs-text)",
            lineHeight: 1.4,
          }}
        >
          <span style={{ color: "var(--vs-accent)" }}># </span>
          {line.slice(2)}
        </h1>,
      );
    } else if (line.startsWith("## ")) {
      nodes.push(
        <h2
          key={i}
          className="mt-6 mb-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--vs-text)",
            lineHeight: 1.4,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "var(--vs-accent)" }}>## </span>
          {line.slice(3)}
        </h2>,
      );
    } else if (line === "---") {
      nodes.push(
        <hr
          key={i}
          className="my-4"
          style={{ borderColor: "var(--vs-border)", borderWidth: "1px 0 0 0" }}
        />,
      );
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <ul
          key={`list-${i}`}
          className="mb-3 ml-4"
          style={{ listStyle: "none", padding: 0 }}
        >
          {listItems.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-2 mb-1"
              style={{
                color: "var(--vs-text)",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              <span
                style={{
                  color: "var(--vs-accent)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                ·
              </span>
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    } else if (line.startsWith("| ") && line.endsWith(" |")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      nodes.push(<MarkdownTable key={`table-${i}`} rows={tableLines} />);
      continue;
    } else if (line === "") {
      nodes.push(<div key={i} style={{ height: "6px" }} />);
    } else {
      nodes.push(
        <p
          key={i}
          className="mb-1"
          style={{
            color: "var(--vs-text)",
            fontSize: "13px",
            lineHeight: 1.7,
          }}
        >
          {renderInlineMarkdown(line)}
        </p>,
      );
    }

    i++;
  }

  return nodes;
}

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^(.*?)\*\*(.*?)\*\*(.*)$/);
    const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)(.*)$/);
    const codeMatch = remaining.match(/^(.*?)`([^`]+)`(.*)$/);

    const boldPos = boldMatch ? boldMatch[1].length : Infinity;
    const linkPos = linkMatch ? linkMatch[1].length : Infinity;
    const codePos = codeMatch ? codeMatch[1].length : Infinity;

    if (boldPos <= linkPos && boldPos <= codePos && boldMatch) {
      if (boldMatch[1]) parts.push(<span key={key++}>{boldMatch[1]}</span>);
      parts.push(
        <strong
          key={key++}
          style={{ color: "var(--vs-text)", fontWeight: 600 }}
        >
          {boldMatch[2]}
        </strong>,
      );
      remaining = boldMatch[3];
    } else if (linkPos <= codePos && linkMatch) {
      if (linkMatch[1]) parts.push(<span key={key++}>{linkMatch[1]}</span>);
      parts.push(
        <a
          key={key++}
          href={linkMatch[3]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--vs-accent)",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          {linkMatch[2]}
        </a>,
      );
      remaining = linkMatch[4];
    } else if (codeMatch) {
      if (codeMatch[1]) parts.push(<span key={key++}>{codeMatch[1]}</span>);
      parts.push(
        <code
          key={key++}
          style={{
            background: "var(--vs-surface-alt)",
            color: "var(--vs-string)",
            padding: "1px 4px",
            borderRadius: 3,
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
          }}
        >
          {codeMatch[2]}
        </code>,
      );
      remaining = codeMatch[3];
    } else {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function MarkdownTable({ rows }: { rows: string[] }) {
  const parsed = rows.map((row) =>
    row
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c !== ""),
  );
  const header = parsed[0] ?? [];
  const body = parsed.slice(2);

  return (
    <div className="my-4 overflow-x-auto">
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th
                key={i}
                style={{
                  padding: "6px 12px",
                  textAlign: "left",
                  borderBottom: "1px solid var(--vs-border)",
                  color: "var(--vs-text)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "5px 12px",
                    borderBottom: "1px solid var(--vs-border)",
                    color: "var(--vs-text-muted)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── TypeScript Renderer ─────────────────────────────────────────────────────

function TypeScriptRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="flex h-full">
      <LineGutter count={lines.length} />
      <div className="flex-1 px-5 py-4 overflow-x-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              lineHeight: 1.6,
              whiteSpace: "pre",
            }}
          >
            {renderTsLine(line)}
          </div>
        ))}
      </div>
    </div>
  );
}

const TS_KEYWORDS = [
  "const",
  "let",
  "var",
  "function",
  "return",
  "export",
  "default",
  "import",
  "from",
  "type",
  "interface",
  "string",
  "number",
  "string[]",
  "number[]",
];

function renderTsLine(line: string): React.ReactNode {
  if (line.trimStart().startsWith("//")) {
    return (
      <span style={{ color: "var(--vs-text-muted)", fontStyle: "italic" }}>
        {line}
      </span>
    );
  }
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;
  while (remaining.length > 0) {
    const strMatch = remaining.match(
      /^(.*?)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)(.*)$/,
    );
    if (strMatch && strMatch[1].length < remaining.length) {
      if (strMatch[1])
        parts.push(<span key={key++}>{renderTsKeywords(strMatch[1])}</span>);
      parts.push(
        <span key={key++} style={{ color: "var(--vs-string)" }}>
          {strMatch[2]}
        </span>,
      );
      remaining = strMatch[3];
    } else {
      parts.push(<span key={key++}>{renderTsKeywords(remaining)}</span>);
      break;
    }
  }
  return <>{parts}</>;
}

function renderTsKeywords(text: string): React.ReactNode {
  const pattern = new RegExp(`\\b(${TS_KEYWORDS.join("|")})\\b`);
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const match = remaining.match(pattern);
    if (match && match.index !== undefined) {
      if (match.index > 0) {
        parts.push(
          <span key={key++} style={{ color: "var(--vs-text)" }}>
            {remaining.slice(0, match.index)}
          </span>,
        );
      }
      parts.push(
        <span key={key++} style={{ color: "var(--vs-keyword)" }}>
          {match[1]}
        </span>,
      );
      remaining = remaining.slice(match.index + match[1].length);
    } else {
      parts.push(
        <span key={key++} style={{ color: "var(--vs-text)" }}>
          {remaining}
        </span>,
      );
      break;
    }
  }
  return <>{parts}</>;
}

// ─── JSON Renderer ───────────────────────────────────────────────────────────

function JsonRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="flex h-full">
      <LineGutter count={lines.length} />
      <div className="flex-1 px-5 py-4 overflow-x-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              lineHeight: 1.6,
              whiteSpace: "pre",
            }}
          >
            {renderJsonLine(line)}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderJsonLine(line: string): React.ReactNode {
  const keyMatch = line.match(/^(\s*)("[\w_]+")\s*:(.*)$/);
  if (keyMatch) {
    const [, indent, key, rest] = keyMatch;
    return (
      <>
        <span style={{ color: "var(--vs-text)" }}>{indent}</span>
        <span style={{ color: "var(--vs-accent)" }}>{key}</span>
        <span style={{ color: "var(--vs-text)" }}>: </span>
        <span>{renderJsonValue(rest.trim())}</span>
      </>
    );
  }
  const strMatch = line.match(/^(\s*)(".*")([,]?)$/);
  if (strMatch) {
    return (
      <>
        <span style={{ color: "var(--vs-text)" }}>{strMatch[1]}</span>
        <span style={{ color: "var(--vs-string)" }}>{strMatch[2]}</span>
        <span style={{ color: "var(--vs-text-muted)" }}>{strMatch[3]}</span>
      </>
    );
  }
  return <span style={{ color: "var(--vs-text-muted)" }}>{line}</span>;
}

function renderJsonValue(value: string): React.ReactNode {
  if (value.startsWith('"')) {
    const comma = value.endsWith(",") ? "," : "";
    const clean = comma ? value.slice(0, -1) : value;
    return (
      <>
        <span style={{ color: "var(--vs-string)" }}>{clean}</span>
        {comma && (
          <span style={{ color: "var(--vs-text-muted)" }}>{comma}</span>
        )}
      </>
    );
  }
  if (["[", "[,", "]", "],", "{", "}"].includes(value)) {
    return <span style={{ color: "var(--vs-text-muted)" }}>{value}</span>;
  }
  if (value === "true" || value === "false" || value === "null") {
    return <span style={{ color: "var(--vs-keyword)" }}>{value}</span>;
  }
  return <span style={{ color: "var(--vs-text)" }}>{value}</span>;
}
