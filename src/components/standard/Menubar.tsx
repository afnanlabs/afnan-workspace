import { useEffect, useRef, useState } from "react";

export interface MenubarProps {
  onQuickOpen: () => void;
  onCommandPalette: () => void;
  onToggleSidebar: () => void;
  onOpenExplorer: () => void;
  onOpenSearch: () => void;
  onOpenSourceControl: () => void;
  onOpenExtensions: () => void;
  onOpenSettings: () => void;
  onSwitchToTerminal: () => void;
  onDownloadResume: () => void;
}

type MenuItem =
  | { kind: "separator" }
  | {
      kind: "item";
      label: string;
      hint?: string;
      disabled?: boolean;
      action: () => void;
    };

interface Menu {
  label: string;
  items: MenuItem[];
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function Menubar(props: MenubarProps) {
  const [open, setOpen] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menus: Menu[] = [
    {
      label: "File",
      items: [
        { kind: "item", label: "Open File…", hint: "Ctrl+P", action: props.onQuickOpen },
        { kind: "item", label: "Download Resume", action: props.onDownloadResume },
        { kind: "separator" },
        { kind: "item", label: "Settings", hint: "Ctrl+,", action: props.onOpenSettings },
      ],
    },
    {
      label: "Edit",
      items: [
        { kind: "item", label: "Find in Files", hint: "Ctrl+Shift+F", action: props.onOpenSearch },
        { kind: "item", label: "Command Palette…", hint: "Ctrl+Shift+P", action: props.onCommandPalette },
      ],
    },
    {
      label: "View",
      items: [
        { kind: "item", label: "Explorer", hint: "Ctrl+Shift+E", action: props.onOpenExplorer },
        { kind: "item", label: "Search", hint: "Ctrl+Shift+F", action: props.onOpenSearch },
        { kind: "item", label: "Source Control", hint: "Ctrl+Shift+G", action: props.onOpenSourceControl },
        { kind: "item", label: "Extensions", hint: "Ctrl+Shift+X", action: props.onOpenExtensions },
        { kind: "separator" },
        { kind: "item", label: "Toggle Primary Side Bar", hint: "Ctrl+B", action: props.onToggleSidebar },
      ],
    },
    {
      label: "Go",
      items: [
        { kind: "item", label: "Go to File…", hint: "Ctrl+P", action: props.onQuickOpen },
        { kind: "item", label: "Command Palette…", hint: "Ctrl+Shift+P", action: props.onCommandPalette },
      ],
    },
    {
      label: "Run",
      items: [
        { kind: "item", label: "Start Debugging", hint: "F5", disabled: true, action: () => {} },
        { kind: "item", label: "Run Without Debugging", disabled: true, action: () => {} },
        { kind: "separator" },
        { kind: "item", label: "Run in Terminal", action: props.onSwitchToTerminal },
      ],
    },
    {
      label: "Terminal",
      items: [
        { kind: "item", label: "Open Terminal View", hint: "Ctrl+`", action: props.onSwitchToTerminal },
        { kind: "item", label: "New Terminal", action: props.onSwitchToTerminal },
      ],
    },
    {
      label: "Help",
      items: [
        { kind: "item", label: "Command Palette…", action: props.onCommandPalette },
        { kind: "item", label: "About Afnan Workspace", action: props.onOpenSettings },
        { kind: "separator" },
        { kind: "item", label: "View Source on GitHub", action: () => openExternal("https://github.com/afnanlabs") },
        { kind: "item", label: "Connect on LinkedIn", action: () => openExternal("https://www.linkedin.com/in/afnankhan1108-dev") },
      ],
    },
  ];

  const handleItem = (item: Extract<MenuItem, { kind: "item" }>) => {
    setOpen(null);
    item.action();
  };

  return (
    <div
      ref={rootRef}
      className="flex items-center shrink-0 border-b select-none"
      style={{
        height: 22,
        background: "var(--vs-surface)",
        borderColor: "var(--vs-border)",
        paddingLeft: 4,
        fontFamily: "var(--font-sans)",
        fontSize: "12px",
      }}
    >
      {menus.map((menu) => {
        const isOpen = open === menu.label;
        return (
          <div key={menu.label} style={{ position: "relative" }}>
            <button
              className="px-2 h-full hover:opacity-80 transition-opacity"
              onClick={() => setOpen(isOpen ? null : menu.label)}
              onMouseEnter={() => {
                if (open && !isOpen) setOpen(menu.label);
              }}
              style={{
                height: 22,
                color: isOpen ? "var(--vs-text)" : "var(--vs-text-muted)",
                background: isOpen ? "var(--vs-surface-alt)" : "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
              }}
            >
              {menu.label}
            </button>

            {isOpen && (
              <div
                role="menu"
                style={{
                  position: "absolute",
                  top: 22,
                  left: 0,
                  minWidth: 230,
                  zIndex: 60,
                  background: "var(--vs-surface)",
                  border: "1px solid var(--vs-border)",
                  borderRadius: 4,
                  boxShadow: "var(--window-shadow)",
                  padding: "4px 0",
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                }}
              >
                {menu.items.map((item, i) =>
                  item.kind === "separator" ? (
                    <div
                      key={`sep-${i}`}
                      style={{
                        height: 1,
                        margin: "4px 0",
                        background: "var(--vs-border)",
                      }}
                    />
                  ) : (
                    <button
                      key={item.label}
                      role="menuitem"
                      disabled={item.disabled}
                      onClick={() => !item.disabled && handleItem(item)}
                      className="flex w-full items-center justify-between gap-6 px-3 py-[5px] transition-colors disabled:opacity-40"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: item.disabled ? "default" : "pointer",
                        color: "var(--vs-text)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        if (!item.disabled)
                          e.currentTarget.style.background = "var(--vs-surface-alt)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span>{item.label}</span>
                      {item.hint && (
                        <span
                          style={{
                            color: "var(--vs-text-muted)",
                            fontSize: "11px",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {item.hint}
                        </span>
                      )}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
