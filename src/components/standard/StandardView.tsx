import { useState } from "react";
import {
  FolderOpen,
  Search,
  GitBranch,
  Package,
  User,
  Settings,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { AFNAN_FILES, ALL_FILES } from "@/data/content";
import { Explorer, TabBar, EditorContent } from "./EditorComponents";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAudio } from "@/hooks/use-audio.ts";

type ActivitySection = "files" | "search" | "git" | "extensions";

const DEFAULT_FILE = "profile";

export function StandardView() {
  const isMobile = useIsMobile();
  const [activeFile, setActiveFile] = useState(DEFAULT_FILE);
  const [openTabs, setOpenTabs] = useState<string[]>([DEFAULT_FILE]);
  const [activeSection, setActiveSection] = useState<ActivitySection>("files");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const audio = useAudio();

  function openFile(id: string) {
    if (!openTabs.includes(id)) {
      setOpenTabs((prev) => [...prev, id]);
      audio.play("fileOpen");
    }
    setActiveFile(id);
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

  return (
    <div
      className="flex flex-col flex-1 overflow-hidden"
      style={{ background: "var(--vs-bg)" }}
    >
      {/* Menubar */}
      <Menubar />

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
            <EmptyEditor onOpen={openFile} />
          )}
        </div>
      </div>

      {/* Status Bar — full width at bottom */}
      <StatusBar extension={activeFileEntry?.extension} />
    </div>
  );
}

// ─── Menubar ───────────────────────────────────────────────────────────────────

function Menubar() {
  const items = ["File", "Edit", "View", "Go", "Run", "Terminal", "Help"];

  return (
    <div
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
      {items.map((item) => (
        <button
          key={item}
          className="px-2 h-full hover:opacity-80 transition-opacity"
          style={{
            color: "var(--vs-text-muted)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
          }}
        >
          {item}
        </button>
      ))}
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
          isActive={false}
          onClick={() => {}}
          title="Settings"
        />
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
  };

  return (
    <div
      className="flex flex-col shrink-0"
      style={{
        width: 220,
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

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar({ extension }: { extension?: string }) {
  const langMap: Record<string, string> = {
    md: "Markdown",
    ts: "TypeScript",
    json: "JSON",
    pdf: "PDF",
    webp: "Image",
  };
  const lang = extension ? (langMap[extension] ?? "Plain Text") : "Plain Text";

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
        gap: 0,
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

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right cluster */}
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
    </div>
  );
}

function StatusItem({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
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

// ─── Empty Editor ─────────────────────────────────────────────────────────────

function EmptyEditor({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 gap-4"
      style={{ color: "var(--vs-text-muted)", fontFamily: "var(--font-mono)" }}
    >
      <div style={{ fontSize: "13px" }}>Select a file to open</div>
      <div className="flex gap-3">
        {["profile", "experience", "skills"].map((id) => {
          const file = ALL_FILES.find((f) => f.id === id);
          if (!file) return null;
          return (
            <button
              key={id}
              onClick={() => onOpen(id)}
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
              {file.displayName}
            </button>
          );
        })}
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
