import { lazy, Suspense, useEffect, useState } from "react";
import {
  FolderOpen,
  Search,
  GitBranch,
  Package,
  User,
  Settings,
  FileCode2,
} from "lucide-react";
import { AFNAN_FILES, ALL_FILES, PROJECTS_FILES, fileContents } from "@/data/content";
import { Explorer, TabBar, EditorContent, fileIcon } from "./EditorComponents";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAudio } from "@/hooks/use-audio.ts";
import { downloadResume } from "@/lib/resume";
import { Menubar } from "./Menubar";
import { SearchPanel } from "./SearchPanel";
import { SettingsPanel } from "./SettingsPanel";
import { StatusBar } from "./StatusBar";

// The command palette pulls in cmdk, so it is code-split and only fetched the
// first time the user actually opens it (Ctrl+Shift+P).
const CommandPalette = lazy(() =>
  import("./CommandPalette").then((m) => ({ default: m.CommandPalette })),
);

type ActivitySection = "files" | "search" | "git" | "extensions" | "settings";

const DEFAULT_FILE = "profile";

export function StandardView({ pendingFile, onConsumePending, onOpenInTerminal }: { pendingFile?: string | null; onConsumePending?: () => void; onOpenInTerminal?: (name?: string) => void } = {}) {
  const isMobile = useIsMobile();
  const [activeFile, setActiveFile] = useState(DEFAULT_FILE);
  const [openTabs, setOpenTabs] = useState<string[]>([DEFAULT_FILE]);
  const [activeSection, setActiveSection] = useState<ActivitySection>("files");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showQuickOpen, setShowQuickOpen] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    if (pendingFile) {
      const file = ALL_FILES.find(f => f.id === pendingFile)
      if (file) {
        openFile(pendingFile)
      }
      onConsumePending?.()
    }
  }, [pendingFile])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const key = e.key.toLowerCase();
      if (e.shiftKey && key === "p") {
        e.preventDefault();
        setShowPalette((v) => !v);
      } else if (e.shiftKey && key === "f") {
        e.preventDefault();
        setActiveSection("search");
        setSidebarOpen(true);
      } else if (e.shiftKey && key === "e") {
        e.preventDefault();
        setActiveSection("files");
        setSidebarOpen(true);
      } else if (e.shiftKey && key === "g") {
        e.preventDefault();
        setActiveSection("git");
        setSidebarOpen(true);
      } else if (e.shiftKey && key === "x") {
        e.preventDefault();
        setActiveSection("extensions");
        setSidebarOpen(true);
      } else if (key === "p") {
        e.preventDefault();
        setShowQuickOpen((v) => !v);
      } else if (key === "b") {
        e.preventDefault();
        setSidebarOpen((v) => !v);
      } else if (e.key === ",") {
        e.preventDefault();
        setActiveSection("settings");
        setSidebarOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openFile(id: string) {
    const fid = id.toLowerCase();
    if (!ALL_FILES.find(f => f.id === fid)) return;
    if (!openTabs.includes(fid)) {
      setOpenTabs((prev) => [...prev, fid]);
      audio.play("fileOpen");
    }
    setActiveFile(fid);
    try { window.location.hash = `mode=standard&file=${fid}`; } catch {}
  }

  function closeTab(id: string) {
    const remaining = openTabs.filter((t) => t !== id);
    setOpenTabs(remaining);
    if (activeFile === id) {
      setActiveFile(remaining[remaining.length - 1] ?? "");
    }
  }

  function handleActivityClick(section: ActivitySection) {
    if (section === activeSection) {
      setSidebarOpen((v) => !v);
    } else {
      setActiveSection(section);
      setSidebarOpen(true);
    }
  }

  if (isMobile) {
    return (
      <MobileStandardView activeFile={activeFile} onFileSelect={openFile} />
    );
  }

  const activeFileEntry = ALL_FILES.find((f) => f.id === activeFile);
  const activeLineCount = activeFile
    ? (fileContents[activeFile]?.split("\n").length ?? 0)
    : undefined;

  const switchToTerminal = () => onOpenInTerminal?.();

  return (
    <div
      className="flex flex-col flex-1 overflow-hidden"
      style={{ background: "var(--vs-bg)" }}
    >
      {/* Menubar */}
      <Menubar
        onQuickOpen={() => setShowQuickOpen(true)}
        onCommandPalette={() => setShowPalette(true)}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        onOpenExplorer={() => {
          setActiveSection("files");
          setSidebarOpen(true);
        }}
        onOpenSearch={() => {
          setActiveSection("search");
          setSidebarOpen(true);
        }}
        onOpenSourceControl={() => {
          setActiveSection("git");
          setSidebarOpen(true);
        }}
        onOpenExtensions={() => {
          setActiveSection("extensions");
          setSidebarOpen(true);
        }}
        onOpenSettings={() => {
          setActiveSection("settings");
          setSidebarOpen(true);
        }}
        onSwitchToTerminal={switchToTerminal}
        onDownloadResume={() => downloadResume()}
      />

      {/* Main row: Activity Bar + Sidebar + Editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar
          activeSection={sidebarOpen ? activeSection : null}
          onSectionClick={handleActivityClick}
        />

        {/* Sidebar panel */}
        {sidebarOpen &&
          (activeSection === "files" ? (
            <Explorer
              activeFile={activeFile}
              onFileSelect={openFile}
              onFileOpen={() => audio.play("fileOpen")}
              onFolderToggle={() => audio.play("folderToggle")}
            />
          ) : activeSection === "search" ? (
            <SearchPanel onFileSelect={openFile} />
          ) : activeSection === "settings" ? (
            <SettingsPanel onSwitchToTerminal={switchToTerminal} />
          ) : (
            <PlaceholderPanel section={activeSection} />
          ))}

        {/* Editor */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {openTabs.length > 0 ? (
            <>
              <TabBar
                tabs={openTabs}
                activeTab={activeFile}
                onTabSelect={(id) => {
                  setActiveFile(id);
                  audio.play("tabSwitch");
                }}
                onTabClose={closeTab}
                onTabSwitch={() => audio.play("tabSwitch")}
              />
              {activeFile && <EditorContent fileId={activeFile} />}
            </>
          ) : (
            <EmptyEditor onOpen={openFile} onOpenInTerminal={onOpenInTerminal} />
          )}
        </div>
      </div>

      {showQuickOpen && (
        <QuickOpenOverlay
          onClose={() => setShowQuickOpen(false)}
          onPick={(id) => {
            openFile(id);
            setShowQuickOpen(false);
          }}
        />
      )}

      {showPalette && (
        <Suspense fallback={null}>
          <CommandPalette
            open
            onClose={() => setShowPalette(false)}
            onOpenFile={openFile}
            onOpenSearch={() => {
              setActiveSection("search");
              setSidebarOpen(true);
            }}
            onOpenExplorer={() => {
              setActiveSection("files");
              setSidebarOpen(true);
            }}
            onOpenExtensions={() => {
              setActiveSection("extensions");
              setSidebarOpen(true);
            }}
            onOpenSettings={() => {
              setActiveSection("settings");
              setSidebarOpen(true);
            }}
            onSwitchToTerminal={switchToTerminal}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
            onDownloadResume={() => downloadResume()}
          />
        </Suspense>
      )}

      {/* Status Bar — full width at bottom */}
      <StatusBar extension={activeFileEntry?.extension} lineCount={activeLineCount} />
    </div>
  );
}

// ─── Activity Bar ─────────────────────────────────────────────────────────────

interface ActivityBarProps {
  activeSection: ActivitySection | null;
  onSectionClick: (section: ActivitySection) => void;
}

function ActivityBar({ activeSection, onSectionClick }: ActivityBarProps) {
  const topItems: {
    section: ActivitySection;
    icon: React.ReactNode;
    title: string;
  }[] = [
    { section: "files", icon: <FolderOpen size={22} />, title: "Explorer" },
    { section: "search", icon: <Search size={22} />, title: "Search" },
    { section: "git", icon: <GitBranch size={22} />, title: "Source Control" },
    { section: "extensions", icon: <Package size={22} />, title: "Extensions" },
  ];

  return (
    <div
      className="flex flex-col items-center shrink-0 py-2"
      style={{
        width: 48,
        background: "var(--vs-activity-bar)",
        borderRight: "1px solid var(--vs-border)",
      }}
    >
      {/* Top icons */}
      <div className="flex flex-col items-center gap-0 flex-1">
        {topItems.map(({ section, icon, title }) => (
          <ActivityButton
            key={section}
            icon={icon}
            isActive={activeSection === section}
            onClick={() => onSectionClick(section)}
            title={title}
          />
        ))}
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-0 mt-auto">
        <ActivityButton
          icon={<User size={22} />}
          isActive={false}
          onClick={() => {}}
          title="Account"
        />
        <ActivityButton
          icon={<Settings size={22} />}
          isActive={activeSection === "settings"}
          onClick={() => onSectionClick("settings")}
          title="Settings"
        />
      </div>
    </div>
  );
}

function QuickOpenOverlay({
  onClose,
  onPick,
}: {
  onClose: () => void;
  onPick: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const matches = ALL_FILES.filter(
    (f) =>
      f.displayName.toLowerCase().includes(query.toLowerCase()) ||
      f.id.toLowerCase().includes(query.toLowerCase()),
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (matches[index]) onPick(matches[index].id);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(0,0,0,0.35)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 420,
          background: "var(--vs-surface)",
          border: "1px solid var(--vs-border)",
          boxShadow: "var(--window-shadow)",
          borderRadius: 6,
          fontFamily: "var(--font-mono)",
          fontSize: 13,
        }}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type a file name..."
          style={{
            width: "100%",
            padding: "8px 12px",
            background: "var(--vs-bg)",
            color: "var(--vs-text)",
            border: "none",
            borderBottom: "1px solid var(--vs-border)",
            outline: "none",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
          }}
        />
        <div style={{ maxHeight: 280, overflowY: "auto" }}>
          {matches.map((f, i) => (
            <button
              key={f.id}
              onClick={() => onPick(f.id)}
              className="flex items-center gap-2 w-full text-left px-3 py-1.5"
              style={{
                background:
                  i === index ? "var(--vs-surface-alt)" : "transparent",
                color: "var(--vs-text)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {fileIcon(f.extension, 12)}
              <span>{f.displayName}</span>
            </button>
          ))}
          {matches.length === 0 && (
            <div
              className="px-3 py-2"
              style={{ color: "var(--vs-text-muted)", fontSize: 12 }}
            >
              No matches
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityButton({
  icon,
  isActive,
  onClick,
  title,
}: {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center justify-center w-full transition-opacity"
      style={{
        height: 48,
        color: isActive ? "var(--vs-text)" : "var(--vs-text-muted)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        borderLeft: "none",
        opacity: isActive ? 1 : 0.6,
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.opacity = "0.6";
      }}
    >
      {icon}
    </button>
  );
}

// ─── Placeholder Panel ────────────────────────────────────────────────────────

function PlaceholderPanel({ section }: { section: ActivitySection }) {
  const labels: Record<ActivitySection, string> = {
    files: "Explorer",
    search: "Search",
    git: "Source Control",
    extensions: "Extensions",
    settings: "Settings",
  };

  return (
    <div
      className="flex flex-col shrink-0 w-[180px] lg:w-[220px]"
      style={{
        background: "var(--vs-surface)",
        borderRight: "1px solid var(--vs-border)",
      }}
    >
      <div
        className="px-3 py-2 uppercase select-none"
        style={{
          color: "var(--vs-text-muted)",
          fontSize: "10px",
          letterSpacing: "0.1em",
        }}
      >
        {labels[section]}
      </div>
      <div
        className="flex flex-col items-center justify-center flex-1 gap-2 px-4"
        style={{
          color: "var(--vs-text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        <span style={{ opacity: 0.5 }}>No content yet</span>
      </div>
    </div>
  );
}

// ─── Empty Editor ─────────────────────────────────────────────────────────────

function EmptyEditor({ onOpen, onOpenInTerminal }: { onOpen: (id: string) => void; onOpenInTerminal?: (name?: string) => void }) {
  const projectIds = PROJECTS_FILES.map((f) => f.id);
  const taglines: Record<string, string> = {
    hrms: "Internal HR platform — letter generation & recruitment automation",
    thinktrack: "Collaborative learning & group productivity platform",
    afnkit: "Express-inspired HTTP framework in strict TypeScript",
    codeglow: "VS Code persistent code-highlighting extension",
    somnus: "Sleep quality analyzer — readable sleep insights",
    fitscore: "Resume-to-role match analyzer web app",
  };

  return (
    <div
      className="flex flex-col items-center justify-center flex-1 gap-8 overflow-y-auto px-6 py-10"
      style={{ color: "var(--vs-text-muted)", fontFamily: "var(--font-mono)" }}
    >
      <div style={{ fontSize: "13px", letterSpacing: "0.04em" }}>
        Afnan Workspace — {ALL_FILES.length} files, {projectIds.length} featured projects
      </div>

      <div
        className="w-full"
        style={{ maxWidth: 880 }}
      >
        <div
          className="uppercase mb-3"
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "var(--vs-text-muted)",
          }}
        >
          Projects
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROJECTS_FILES.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpen(p.id)}
              className="flex flex-col gap-1 text-left p-3 rounded border transition-all hover:translate-y-[-1px]"
              style={{
                background: "var(--vs-surface)",
                borderColor: "var(--vs-border)",
                cursor: "pointer",
                color: "var(--vs-text)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              }}
            >
              <span
                className="flex items-center gap-2"
                style={{ fontWeight: 600 }}
              >
                <FileCode2 size={13} style={{ color: "#3178c6" }} />
                {p.displayName}
              </span>
              <span
                style={{
                  color: "var(--vs-text-muted)",
                  fontSize: "11px",
                  lineHeight: 1.5,
                }}
              >
                {taglines[p.id] ?? p.id}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="w-full"
        style={{ maxWidth: 880 }}
      >
        <div
          className="uppercase mb-3"
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "var(--vs-text-muted)",
          }}
        >
          Profile files
        </div>
        <div className="flex flex-wrap gap-2">
          {AFNAN_FILES.map((f) => (
            <button
              key={f.id}
              onClick={() => onOpen(f.id)}
              className="px-3 py-1.5 rounded border hover:opacity-80 transition-opacity"
              style={{
                borderColor: "var(--vs-border)",
                color: "var(--vs-text-muted)",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                background: "var(--vs-surface)",
                cursor: "pointer",
              }}
            >
              {f.displayName}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3" style={{ fontSize: "11px", opacity: 0.7 }}>
        <span>
          Tip: Press <kbd style={{ border: "1px solid var(--vs-border)", borderRadius: 3, padding: "1px 4px" }}>Ctrl+P</kbd> for Quick Open, or switch to Terminal and type <code style={{ color: "var(--vs-accent)" }}>code &lt;file&gt;</code>
        </span>
        {onOpenInTerminal && (
          <button
            onClick={() => onOpenInTerminal()}
            className="px-2 py-1 rounded border hover:opacity-80 transition-opacity"
            style={{
              borderColor: "var(--vs-border)",
              color: "var(--vs-accent)",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Open Terminal
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Mobile Layout ────────────────────────────────────────────────────────────

function MobileStandardView({
  activeFile,
  onFileSelect,
}: {
  activeFile: string;
  onFileSelect: (id: string) => void;
}) {
  const [showMore, setShowMore] = useState(false);
  const activeTab = ALL_FILES.find((f) => f.id === activeFile);
  const tabItems = AFNAN_FILES.slice(0, 4);
  const moreFiles = [
    ...AFNAN_FILES.slice(4),
    ...ALL_FILES.filter((f) => !AFNAN_FILES.includes(f)),
  ];

  return (
    <div
      className="flex flex-col flex-1 overflow-hidden relative"
      style={{ background: "var(--vs-bg)" }}
    >
      {/* Mobile header bar */}
      <div
        className="flex items-center px-3 border-b shrink-0"
        style={{
          background: "var(--vs-surface)",
          borderColor: "var(--vs-border)",
          height: 35,
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--vs-text-muted)",
        }}
      >
        {activeTab?.displayName ?? ""}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeFile && <EditorContent fileId={activeFile} />}
      </div>

      {/* Bottom nav */}
      <div
        className="flex items-center shrink-0 border-t overflow-x-auto"
        style={{
          background: "var(--vs-surface)",
          borderColor: "var(--vs-border)",
          height: 44,
        }}
      >
        {tabItems.map((file) => (
          <button
            key={file.id}
            onClick={() => onFileSelect(file.id)}
            className="flex items-center justify-center px-3 h-full text-xs shrink-0 hover:opacity-80 transition-opacity"
            style={{
              color:
                activeFile === file.id
                  ? "var(--vs-accent)"
                  : "var(--vs-text-muted)",
              fontFamily: "var(--font-sans)",
              fontWeight: activeFile === file.id ? 500 : 400,
              background: "transparent",
              border: "none",
              borderBottom:
                activeFile === file.id
                  ? "2px solid var(--vs-accent)"
                  : "2px solid transparent",
              borderRight: "1px solid var(--vs-border)",
              cursor: "pointer",
            }}
          >
            {file.name}
          </button>
        ))}
        <button
          className="flex items-center justify-center px-3 h-full text-xs shrink-0 hover:opacity-80 transition-opacity"
          style={{
            color: showMore ? "var(--vs-accent)" : "var(--vs-text-muted)",
            fontFamily: "var(--font-sans)",
            background: "transparent",
            border: "none",
            borderLeft: "1px solid var(--vs-border)",
            cursor: "pointer",
          }}
          onClick={() => setShowMore((v) => !v)}
        >
          More ↑
        </button>
      </div>

      {/* More bottom sheet */}
      {showMore && (
        <div
          className="absolute bottom-11 left-0 right-0 z-10"
          style={{
            background: "var(--vs-surface)",
            borderTop: "1px solid var(--vs-border)",
          }}
        >
          {moreFiles.map((file) => (
            <button
              key={file.id}
              className="flex items-center gap-3 w-full px-4 py-3 text-left hover:opacity-80 transition-opacity"
              style={{
                color:
                  activeFile === file.id
                    ? "var(--vs-accent)"
                    : "var(--vs-text)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--vs-border)",
                cursor: "pointer",
              }}
              onClick={() => {
                onFileSelect(file.id);
                setShowMore(false);
              }}
            >
              {file.displayName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
