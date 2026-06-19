import { useRef, useState } from 'react'
import { Header } from '@/components/Header'
import { TerminalView } from '@/components/terminal/TerminalView'
import { StandardView } from '@/components/standard/StandardView'
import { CursorManager } from '@/hooks/use-cursor.tsx'
import { useDraggable } from '@/hooks/use-draggable'
import { ArcadeWindow } from '@/components/terminal/ArcadeWindow'

type Mode = 'terminal' | 'standard'
export type ArcadeGame = 'snake' | 'tetris' | null

function getInitialMode(): Mode {
  return window.innerWidth < 768 ? 'standard' : 'terminal'
}

export function App() {
  const [mode, setMode] = useState<Mode>(getInitialMode)
  const [arcadeGame, setArcadeGame] = useState<ArcadeGame>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const { pos, isDragging, onMouseDown } = useDraggable(windowRef)

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
        <Header mode={mode} onModeChange={setMode} onDragStart={onMouseDown} isDragging={isDragging} />

        {mode === 'terminal' ? (
          <div data-terminal-view className="flex-1 flex flex-col min-h-0">
            <TerminalView onLaunchArcade={setArcadeGame} />
          </div>
        ) : (
          <StandardView />
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
