import { useEffect, useState } from "react";
import {
  GitBranch,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

const LANG_MAP: Record<string, string> = {
  md: "Markdown",
  ts: "TypeScript",
  tsx: "TypeScript React",
  js: "JavaScript",
  jsx: "JavaScript React",
  json: "JSON",
  pdf: "PDF",
  webp: "Image",
};

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** Tracks how many non-whitespace characters are currently selected in the page. */
function useSelectionCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => {
      const sel = window.getSelection();
      const text = sel ? sel.toString() : "";
      setCount(text.replace(/\s/g, "").length);
    };
    document.addEventListener("selectionchange", update);
    return () => document.removeEventListener("selectionchange", update);
  }, []);
  return count;
}

export function StatusBar({
  extension,
  lineCount,
}: {
  extension?: string;
  lineCount?: number;
}) {
  const clock = useClock();
  const selected = useSelectionCount();
  const lang = extension ? (LANG_MAP[extension] ?? "Plain Text") : "Plain Text";

  return (
    <div
      className="flex items-center shrink-0 select-none overflow-x-auto"
      style={{
        height: 22,
        background: "var(--vs-status-bar)",
        color: "#FFFFFF",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        paddingLeft: 8,
        paddingRight: 8,
        whiteSpace: "nowrap",
      }}
    >
      {/* Left cluster */}
      <StatusItem>
        <GitBranch size={11} style={{ flexShrink: 0 }} />
        <span>main</span>
      </StatusItem>
      <StatusItem>
        <RefreshCw size={10} style={{ flexShrink: 0 }} />
        <span>0↓ 0↑</span>
      </StatusItem>
      {typeof lineCount === "number" && (
        <StatusItem>
          <span>{lineCount} lines</span>
        </StatusItem>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right cluster */}
      {selected > 0 && (
        <>
          <StatusItem style={{ background: "rgba(255,255,255,0.12)" }}>
            <span>{selected} selected</span>
          </StatusItem>
          <StatusDivider />
        </>
      )}
      <StatusItem>
        <AlertCircle size={10} style={{ flexShrink: 0 }} />
        <span>0</span>
        <AlertTriangle size={10} style={{ flexShrink: 0, marginLeft: 4 }} />
        <span>0</span>
      </StatusItem>
      <StatusDivider />
      <StatusItem>Ln 1, Col 1</StatusItem>
      <StatusDivider />
      <StatusItem>Spaces: 2</StatusItem>
      <StatusDivider />
      <StatusItem>UTF-8</StatusItem>
      <StatusDivider />
      <StatusItem>LF</StatusItem>
      <StatusDivider />
      <StatusItem style={{ color: "rgba(255,255,255,0.95)", fontWeight: 500 }}>
        {lang}
      </StatusItem>
      <StatusDivider />
      <StatusItem title="Local time">{clock}</StatusItem>
    </div>
  );
}

function StatusItem({
  children,
  style,
  title,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
}) {
  return (
    <div
      title={title}
      className="flex items-center gap-1 px-2 h-full hover:bg-white/10 transition-colors cursor-default"
      style={{ fontSize: "11px", ...style }}
    >
      {children}
    </div>
  );
}

function StatusDivider() {
  return (
    <div
      style={{ width: 1, height: 12, background: "rgba(255,255,255,0.2)" }}
    />
  );
}
