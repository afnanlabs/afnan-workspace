import { useEffect } from "react";
import { Command } from "cmdk";
import { ALL_FILES } from "@/data/content";
import { fileIcon } from "./EditorComponents";

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onOpenFile: (id: string) => void;
  onOpenSearch: () => void;
  onOpenExplorer: () => void;
  onOpenExtensions: () => void;
  onOpenSettings: () => void;
  onSwitchToTerminal: () => void;
  onToggleSidebar: () => void;
  onDownloadResume: () => void;
}

const PALETTE_CSS = `
.afnan-palette [cmdk-list]{ max-height: 340px; overflow-y: auto; padding: 4px; }
.afnan-palette [cmdk-group-heading]{
  padding: 6px 10px 4px;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vs-text-muted);
}
.afnan-palette [cmdk-item]{
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  border-radius: 3px;
  color: var(--vs-text);
  font-size: 12px;
  cursor: pointer;
}
.afnan-palette [cmdk-item][data-selected="true"]{ background: var(--vs-surface-alt); }
.afnan-palette [cmdk-empty]{
  padding: 12px;
  text-align: center;
  color: var(--vs-text-muted);
  font-size: 12px;
}
.afnan-palette [cmdk-separator]{
  height: 1px;
  margin: 4px 0;
  background: var(--vs-border);
}
`;

export function CommandPalette({
  open,
  onClose,
  onOpenFile,
  onOpenSearch,
  onOpenExplorer,
  onOpenExtensions,
  onOpenSettings,
  onSwitchToTerminal,
  onToggleSidebar,
  onDownloadResume,
}: CommandPaletteProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const run = (fn: () => void) => () => {
    onClose();
    fn();
  };

  const files = ALL_FILES.filter((f) => f.extension !== "pdf" && f.id !== "resume");

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[12vh]"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <style>{PALETTE_CSS}</style>
      <div
        className="afnan-palette"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 520,
          maxWidth: "92vw",
          background: "var(--vs-surface)",
          border: "1px solid var(--vs-border)",
          boxShadow: "var(--window-shadow)",
          borderRadius: 6,
          overflow: "hidden",
          fontFamily: "var(--font-mono)",
        }}
      >
        <Command label="Command Palette">
          <Command.Input
            autoFocus
            placeholder="Type a command or search files…"
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "var(--vs-bg)",
              color: "var(--vs-text)",
              border: "none",
              borderBottom: "1px solid var(--vs-border)",
              outline: "none",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          />
          <Command.List>
            <Command.Empty>No matching commands</Command.Empty>

            <Command.Group heading="Commands">
              <Command.Item value="View: Switch to Terminal" onSelect={run(onSwitchToTerminal)}>
                <span>View: Switch to Terminal</span>
              </Command.Item>
              <Command.Item value="View: Toggle Primary Side Bar" onSelect={run(onToggleSidebar)}>
                <span>View: Toggle Primary Side Bar</span>
              </Command.Item>
              <Command.Item value="View: Show Explorer" onSelect={run(onOpenExplorer)}>
                <span>View: Show Explorer</span>
              </Command.Item>
              <Command.Item value="View: Show Extensions" onSelect={run(onOpenExtensions)}>
                <span>View: Show Extensions</span>
              </Command.Item>
              <Command.Item value="Search: Find in Files" onSelect={run(onOpenSearch)}>
                <span>Search: Find in Files</span>
              </Command.Item>
              <Command.Item value="Preferences: Open Settings" onSelect={run(onOpenSettings)}>
                <span>Preferences: Open Settings</span>
              </Command.Item>
              <Command.Item value="File: Download Resume" onSelect={run(onDownloadResume)}>
                <span>File: Download Resume</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator />

            <Command.Group heading="Files">
              {files.map((f) => (
                <Command.Item
                  key={f.id}
                  value={`open file ${f.displayName} ${f.id}`}
                  onSelect={run(() => onOpenFile(f.id))}
                >
                  {fileIcon(f.extension, 12)}
                  <span>{f.displayName}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
