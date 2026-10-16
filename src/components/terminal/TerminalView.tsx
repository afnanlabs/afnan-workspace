import { useEffect, useRef, useState, useCallback } from "react";
import {
  WELCOME_MESSAGE,
  PROMPT,
  TERMINAL_COMMANDS,
  commandOutputs,
  FORTUNES,
  AFNAN_FILES,
  PROJECTS_FILES,
  ASSETS_FILES,
} from "@/data/content";
import { useAudio } from "@/hooks/use-audio.ts";
import { RESUME_URL, downloadResume } from "@/lib/resume";
import { resolveFileId } from "@/lib/commands";
import type { ArcadeGame } from "@/App";

interface HistoryEntry {
  id: number;
  prompt: string;
  command: string;
  output: string | null;
}

let _id = 0;
function nextId() {
  return ++_id;
}

function processCommand(cmd: string): string | null {
  const trimmed = cmd.trim().toLowerCase();
  if (trimmed === "") return null;
  if (trimmed === "clear" || trimmed === "reset") return "__CLEAR__";
  if (trimmed === "resume") return "__DOWNLOAD_RESUME__";
  if (trimmed === "sounds") return "__SOUNDS_TOGGLE__";
  if (trimmed === "snake") return "__LAUNCH_SNAKE__";
  if (trimmed === "tetris") return "__LAUNCH_TETRIS__";
  if (trimmed === "galaga") return "__LAUNCH_GALAGA__";
  if (trimmed === "pacman") return "__LAUNCH_PACMAN__";
  if (trimmed === "pwd") return "\n/workspace/afnan\n";
  if (trimmed === "banner") return WELCOME_MESSAGE + "\n";

  if (trimmed === "ls projects" || trimmed === "ls project") {
    return `\n${PROJECTS_FILES.map((f) => `  ${f.displayName}`).join("\n")}\n\nUse 'code <file>' to open in VS Code, or 'open <name>' for a case study.\n`;
  }
  if (trimmed === "ls afnan" || trimmed === "ls profile") {
    return `\n${AFNAN_FILES.map((f) => `  ${f.displayName}`).join("\n")}\n`;
  }
  if (trimmed === "ls assets" || trimmed === "ls asset") {
    return `\n${ASSETS_FILES.map((f) => `  ${f.displayName}`).join("\n")}\n`;
  }
  if (trimmed === "fortune") {
    return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  }
  if (trimmed === "uptime") {
    const launchDate = new Date("2026-06-20T00:00:00");

    const now = new Date();
    const diff = now.getTime() - launchDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `Portfolio online for:
${days} days, ${hours} hours, ${minutes} minutes
`;
  }
  if (trimmed === "date") {
    return new Date().toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
  }

  const output = commandOutputs[trimmed];
  if (output === undefined) {
    return `\nCommand not found: ${cmd.trim()}\nType 'help' to see available commands.\n`;
  }
  return output;
}

function autocomplete(input: string): string {
  const val = input.toLowerCase();
  if (!val) return input;
  const match = TERMINAL_COMMANDS.find((c) => c.startsWith(val) && c !== val);
  return match ?? input;
}

interface TerminalViewProps {
  onLaunchArcade: (game: ArcadeGame) => void;
  onOpenInStandard?: (fileId: string) => void;
  onSwitchMode?: (mode: 'terminal' | 'standard') => void;
}

export function TerminalView({ onLaunchArcade, onOpenInStandard, onSwitchMode }: TerminalViewProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showGhost, setShowGhost] = useState(false);
  const [ghostSeen, setGhostSeen] = useState(false);
  const [shake, setShake] = useState(false);
  const audio = useAudio();

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const ghostTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetGhostTimer = useCallback(() => {
    if (ghostSeen) return;
    if (ghostTimerRef.current) clearTimeout(ghostTimerRef.current);
    setShowGhost(false);
    ghostTimerRef.current = setTimeout(() => {
      if (!ghostSeen) setShowGhost(true);
    }, 4000);
  }, [ghostSeen]);

  useEffect(() => {
    resetGhostTimer();
    return () => {
      if (ghostTimerRef.current) clearTimeout(ghostTimerRef.current);
    };
  }, [resetGhostTimer]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [entries]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function dismissGhost() {
    if (!ghostSeen) {
      setGhostSeen(true);
      setShowGhost(false);
      if (ghostTimerRef.current) clearTimeout(ghostTimerRef.current);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    dismissGhost();
    resetGhostTimer();
    setHistoryIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    dismissGhost();

    if (e.key === "Enter") {
      e.preventDefault();
      submitCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(historyIndex + 1, inputHistory.length - 1);
      setHistoryIndex(newIdx);
      setInput(inputHistory[newIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIdx);
      setInput(newIdx === -1 ? "" : (inputHistory[newIdx] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      setInput(autocomplete(input));
    }
  }

  function submitCommand() {
    const cmd = input.trim();
    if (!cmd) return;

    const result = processCommand(cmd);

    if (result === "__CLEAR__") {
      setEntries([]);
      setInput("");
      setInputHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);
      return;
    }

    if (result === "__DOWNLOAD_RESUME__") {
      downloadResume();
      addEntry(cmd, "\nDownloading resume...\n");
      return;
    }

    if (result === "__SOUNDS_TOGGLE__") {
      const newState = audio.toggle();
      addEntry(
        cmd,
        `\nWorkspace audio ${newState ? "enabled" : "disabled"}.\n`,
      );
      return;
    }

    if (result === "__LAUNCH_SNAKE__") {
      addEntry(cmd, "\nLaunching retro-arcade://snake...\n");
      onLaunchArcade("snake");
      return;
    }

    if (result === "__LAUNCH_TETRIS__") {
      addEntry(cmd, "\nLaunching retro-arcade://tetris...\n");
      onLaunchArcade("tetris");
      return;
    }

    if (result === "__LAUNCH_GALAGA__") {
      addEntry(cmd, "\nLaunching retro-arcade://galaga...\n");
      onLaunchArcade("galaga");
      return;
    }

    if (result === "__LAUNCH_PACMAN__") {
      addEntry(cmd, "\nLaunching retro-arcade://pacman...\n");
      onLaunchArcade("pacman");
      return;
    }

    // cross-view commands
    if (cmd.toLowerCase() === "terminal" || cmd.toLowerCase() === "term") {
      onSwitchMode?.('terminal')
      addEntry(cmd, "\nSwitched to Terminal view.\n")
      setInput("")
      setInputHistory((prev) => [cmd, ...prev])
      return
    }
    if (cmd.toLowerCase() === "standard" || cmd.toLowerCase() === "vs" || cmd.toLowerCase() === "vscode") {
      onSwitchMode?.('standard')
      addEntry(cmd, "\nSwitched to VS Code view.\n")
      setInput("")
      setInputHistory((prev) => [cmd, ...prev])
      return
    }

    const codeMatch = cmd.match(/^code\s+(.+)$/i)
    if (codeMatch) {
      const fid = resolveFileId(codeMatch[1])
      if (fid && onOpenInStandard) {
        onOpenInStandard(fid)
        addEntry(cmd, `\nOpening ${fid} in VS Code view...\n`)
        setInput("")
        setInputHistory((prev) => [cmd, ...prev])
        return
      } else {
        addEntry(cmd, `\nFile not found: ${codeMatch[1].trim()}\n`)
        setInput("")
        setInputHistory((prev) => [cmd, ...prev])
        return
      }
    }

    if (result === null) {
      setShake(true);
      setTimeout(() => setShake(false), 350);
      addEntry(
        cmd,
        `\nCommand not found: ${cmd}\nType 'help' to see available commands.\n`,
      );
      audio.play("error");
    } else {
      addEntry(cmd, result);
      audio.play("commandExecute");
    }
  }

  function addEntry(cmd: string, output: string) {
    setEntries((prev) => [
      ...prev,
      { id: nextId(), prompt: PROMPT, command: cmd, output },
    ]);
    setInput("");
    setInputHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  function renderOutput(text: string) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("[OK]")) {
        return (
          <div key={i}>
            <span style={{ color: "#4ade80" }}>[OK]</span>
            <span>{line.slice(4)}</span>
          </div>
        );
      }
      if (line.startsWith("------")) {
        return (
          <div
            key={i}
            style={{ color: "var(--vs-text-muted)", userSelect: "none" }}
          >
            {line}
          </div>
        );
      }
      if (line.startsWith("─")) {
        return (
          <div
            key={i}
            style={{ color: "var(--vs-text-muted)", userSelect: "none" }}
          >
            {line}
          </div>
        );
      }
      if (line.trimStart().startsWith("→")) {
        const indent = line.length - line.trimStart().length;
        return (
          <div key={i}>
            <span style={{ display: "inline-block", width: `${indent}ch` }} />
            <span style={{ color: "var(--vs-accent)" }}>→</span>
            <span>{line.trimStart().slice(1)}</span>
          </div>
        );
      }
      if (line.includes("[") && line.includes("]")) {
        // Supports:
        // [Email]
        // [github.com/...]
        // [Certificate Name](https://certificate-url.com)

        const markdownMatch = line.match(/\[(.*?)\]\((.*?)\)/);

        if (markdownMatch) {
          const label = line.split("[")[0];
          const text = markdownMatch[1];
          const href = markdownMatch[2];
          const suffix = line.slice(markdownMatch[0].length);

          return (
            <div key={i}>
              {label}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--vs-accent)",
                  textDecoration: "underline",
                }}
              >
                {text}
              </a>
              {suffix}
            </div>
          );
        }

        // Existing behaviour for contact command
        const label = line.split("[")[0];
        const text = line.match(/\[(.*?)\]/)?.[1] ?? "";

        let href = "";

        if (text.includes("@")) {
          href = `mailto:${text}`;
        } else {
          href = `https://${text}`;
        }

        return (
          <div key={i}>
            {label}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--vs-accent)",
                textDecoration: "underline",
              }}
            >
              {text}
            </a>
          </div>
        );
      }

      return <div key={i}>{line || "\u00A0"}</div>;
    });
  }

  return (
    <div
      className="flex-1 flex flex-col min-h-0 overflow-hidden"
      style={{
        background: "var(--vs-bg)",
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(12px, 2.5vw, 14px)",
        lineHeight: 1.6,
        color: "var(--vs-text)",
      }}
      onClick={focusInput}
    >
      {/* Zone 1 — scrollable history buffer (welcome message + command log) */}
      <div
        className="flex-1 min-h-0 overflow-y-auto px-2 sm:px-4 pt-4"
        style={{ overscrollBehavior: "contain", overflowWrap: "break-word", wordBreak: "break-word" }}
      >
        <div style={{ whiteSpace: "pre-wrap", marginBottom: "0.5em" }}>
          {renderOutput(WELCOME_MESSAGE)}
        </div>

        {entries.map((entry) => (
          <div key={entry.id}>
            <div>
              <span style={{ color: "var(--vs-accent)" }}>{entry.prompt}</span>
              <span>{entry.command}</span>
            </div>
            {entry.output &&
              (entry.command === "certifications" ? (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  <h2 style={{ marginBottom: "24px" }}></h2>

                  {JSON.parse(entry.output).map((cert: any, index: number) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "inherit",
                          textDecoration: "underline",
                        }}
                      >
                        {cert.title}
                      </a>

                      {" — "}
                      {cert.issuer}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {renderOutput(entry.output)}
                </div>
              ))}
          </div>
        ))}

        {showGhost && entries.length === 0 && (
          <div
            className="ghost-hint ml-2 mt-1"
            style={{ color: "var(--vs-text-muted)", fontSize: "13px" }}
          >
            {"  "}→ try: ls
          </div>
        )}

        {/* Scroll anchor — always at tail of history */}
        <div ref={bottomRef} />
      </div>

      {/* Zone 2 — active prompt row, pinned above footer */}
      <div className="shrink-0 flex items-start px-2 sm:px-4 py-2">
        <span
          style={{
            color: "var(--vs-accent)",
            userSelect: "none",
            whiteSpace: "nowrap",
            fontSize: "clamp(11px, 2.5vw, 13px)",
          }}
        >
          {PROMPT}
        </span>
        <div className={`relative flex-1 min-w-0${shake ? " shake" : ""}`}>
          <input
            ref={inputRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none border-none caret-transparent"
            style={{
              color: "var(--vs-text)",
              fontFamily: "var(--font-mono)",
              fontSize: "inherit",
              caretColor: "transparent",
            }}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span
            className="cursor-blink absolute top-0"
            style={{
              left: `${input.length}ch`,
              width: "0.6ch",
              height: "1.2em",
              background: "var(--vs-cursor)",
              display: "inline-block",
            }}
          />
        </div>
      </div>

      {/* Zone 3 — ground floor copyright, pinned at bottom */}
      <div
        className="shrink-0 flex items-center justify-center pb-2 mt-auto select-none px-2"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(9px, 1.8vw, 11px)",
          color: "var(--vs-text-muted)",
          opacity: 0.35,
        }}
      >
        <span className="truncate">
          © Afnan Khan | All rights reserved
        </span>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity ml-1 shrink-0"
          style={{ color: "var(--vs-accent)" }}
          onClick={(e) => e.stopPropagation()}
        >
          View Resume
        </a>
      </div>
    </div>
  );
}
