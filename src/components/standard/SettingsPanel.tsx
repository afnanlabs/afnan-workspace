import { useTheme } from "@/components/theme-provider";
import { useAudio } from "@/hooks/use-audio.ts";

type ThemeOption = "dark" | "light" | "system";

const THEME_OPTIONS: { value: ThemeOption; label: string }[] = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
];

export function SettingsPanel({
  onSwitchToTerminal,
}: {
  onSwitchToTerminal?: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const audio = useAudio();

  const sectionLabel: React.CSSProperties = {
    color: "var(--vs-text-muted)",
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 6,
  };

  return (
    <div
      className="flex flex-col shrink-0 overflow-y-auto w-[200px] lg:w-[240px]"
      style={{
        background: "var(--vs-surface)",
        borderRight: "1px solid var(--vs-border)",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
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
        Settings
      </div>

      <div className="px-3 pb-4 flex flex-col gap-5">
        {/* Appearance */}
        <div>
          <div style={sectionLabel}>Color Theme</div>
          <div className="flex flex-col gap-1">
            {THEME_OPTIONS.map((opt) => {
              const active = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className="flex items-center gap-2 px-2 py-[5px] rounded text-left transition-colors"
                  style={{
                    background: active ? "var(--vs-surface-alt)" : "transparent",
                    border: "1px solid " + (active ? "var(--vs-accent)" : "transparent"),
                    color: "var(--vs-text)",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 8,
                      border: "1px solid var(--vs-text-muted)",
                      background: active ? "var(--vs-accent)" : "transparent",
                      flexShrink: 0,
                    }}
                  />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sound */}
        <div>
          <div style={sectionLabel}>Interface Sounds</div>
          <button
            onClick={() => {
              const next = audio.toggle();
              if (next) audio.play("fileOpen");
            }}
            className="flex items-center justify-between gap-2 px-2 py-[5px] rounded w-full transition-colors"
            style={{
              background: audio.enabled ? "var(--vs-surface-alt)" : "transparent",
              border: "1px solid " + (audio.enabled ? "var(--vs-accent)" : "var(--vs-border)"),
              color: "var(--vs-text)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            }}
          >
            <span>{audio.enabled ? "Enabled" : "Disabled"}</span>
            <span
              style={{
                fontSize: "10px",
                color: audio.enabled ? "var(--vs-accent)" : "var(--vs-text-muted)",
              }}
            >
              {audio.enabled ? "ON" : "OFF"}
            </span>
          </button>
          <p
            style={{
              color: "var(--vs-text-muted)",
              fontSize: "10px",
              lineHeight: 1.5,
              marginTop: 6,
              opacity: 0.8,
            }}
          >
            Subtle click and blip feedback for files, tabs and the arcade.
          </p>
        </div>

        {/* Shortcuts */}
        <div>
          <div style={sectionLabel}>Shortcuts</div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              color: "var(--vs-text-muted)",
              fontSize: "10px",
              lineHeight: 1.9,
            }}
          >
            <li>
              <kbd style={kbd}>Ctrl+P</kbd> Quick open
            </li>
            <li>
              <kbd style={kbd}>Ctrl+Shift+P</kbd> Command palette
            </li>
            <li>
              <kbd style={kbd}>Ctrl+Shift+F</kbd> Search
            </li>
            <li>
              <kbd style={kbd}>D</kbd> Toggle theme
            </li>
          </ul>
        </div>

        {onSwitchToTerminal && (
          <div>
            <div style={sectionLabel}>Mode</div>
            <button
              onClick={onSwitchToTerminal}
              className="px-2 py-[5px] rounded transition-colors"
              style={{
                background: "var(--vs-surface-alt)",
                border: "1px solid var(--vs-border)",
                color: "var(--vs-accent)",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              }}
            >
              Switch to Terminal View
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const kbd: React.CSSProperties = {
  border: "1px solid var(--vs-border)",
  borderRadius: 3,
  padding: "0 4px",
  marginRight: 6,
  color: "var(--vs-text)",
};
