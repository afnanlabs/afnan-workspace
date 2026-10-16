import { useEffect, useRef, useState } from 'react'
import { Header } from '@/components/Header'
import { TerminalView } from '@/components/terminal/TerminalView'
import { StandardView } from '@/components/standard/StandardView'
import { CursorManager } from '@/hooks/use-cursor.tsx'
import { useDraggable } from '@/hooks/use-draggable'
import { ArcadeWindow } from '@/components/terminal/ArcadeWindow'

type Mode = 'terminal' | 'standard'
export type ArcadeGame = 'snake' | 'tetris' | null

function getInitialMode(): Mode {
  if (typeof window !== 'undefined') {
    try {
      const hash = window.location.hash
      if (hash.includes('mode=standard')) return 'standard'
      if (hash.includes('mode=terminal')) return 'terminal'
    } catch (e) {
      // ignore
    }
  }
  return window.innerWidth < 768 ? 'standard' : 'terminal'
}

export function App() {
  const [mode, setMode] = useState<Mode>(getInitialMode)
  const [arcadeGame, setArcadeGame] = useState<ArcadeGame>(null)
  const [pendingFile, setPendingFile] = useState<string | null>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const { pos, isDragging, onMouseDown } = useDraggable(windowRef)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const updateFromHash = () => {
      try {
        const hash = window.location.hash
        if (hash.includes('mode=standard')) setMode('standard')
        if (hash.includes('mode=terminal')) setMode('terminal')
        const fileMatch = hash.match(/file=([a-zA-Z0-9_-]+)/)
        if (fileMatch && fileMatch[1]) {
          setPendingFile(fileMatch[1].toLowerCase())
          setMode('standard')
        }
      } catch (e) {
        // ignore
      }
    }
    updateFromHash()
    window.addEventListener('hashchange', updateFromHash)
    return () => window.removeEventListener('hashchange', updateFromHash)
  }, [])

  function updateHash(updates: { mode?: Mode; file?: string | null }) {
    if (typeof window === 'undefined') return
    try {
      const url = new URL(window.location.href)
      if (updates.mode !== undefined) {
        url.hash = `mode=${updates.mode}${updates.file ? `&file=${updates.file}` : ''}`
      } else if (updates.file !== undefined) {
        url.hash = `mode=${mode}${updates.file ? `&file=${updates.file}` : `&mode=${mode}`}`
      } else {
        url.hash = `mode=${mode}`
      }
      window.history.replaceState(null, '', url.toString())
    } catch (e) {
      // ignore
    }
  }

  function handleModeChange(next: Mode) {
    setMode(next)
    updateHash({ mode: next })
  }

  function handleOpenFileInStandard(fileId: string) {
    const fid = fileId.toLowerCase()
    setPendingFile(fid)
    setMode('standard')
    updateHash({ mode: 'standard', file: fid })
  }

  return (
    <div className="app-canvas">
      <CursorManager mode={mode} />

      <div
        ref={windowRef}
        className="app-window"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          willChange: 'transform',
          userSelect: isDragging ? 'none' : undefined,
        }}
      >
        {/* Pass onMouseDown to Header so only the header strip acts as drag handle */}
        <Header mode={mode} onModeChange={handleModeChange} onDragStart={onMouseDown} isDragging={isDragging} />

        {mode === 'terminal' ? (
          <div data-terminal-view className="flex-1 flex flex-col min-h-0">
            <TerminalView onLaunchArcade={setArcadeGame} onOpenInStandard={handleOpenFileInStandard} onSwitchMode={handleModeChange} />
          </div>
        ) : (
          <StandardView pendingFile={pendingFile} onConsumePending={() => setPendingFile(null)} onOpenInTerminal={() => { setMode('terminal'); updateHash({ mode: 'terminal' }); }} />
        )}
      </div>

      {/* Arcade overlay — rendered outside app-window so it floats above */}
      {arcadeGame && (
        <ArcadeWindow game={arcadeGame} onClose={() => setArcadeGame(null)} />
      )}
    </div>
  )
}

export default App
