import { useCallback, useEffect, useRef, useState } from 'react'

interface DragState {
  x: number
  y: number
}

interface UseDraggableOptions {
  /** Padding kept from each viewport edge (px). Default 40. */
  edgePadding?: number
  /** Minimum width to keep on-screen when clamping. Default 120. */
  minVisible?: number
}

/**
 * Returns ref to attach to the drag-handle element and current translate offset.
 * The dragged element must be positioned with transform: translate3d(x,y,0)
 * relative to its normal document flow position.
 */
export function useDraggable(
  containerRef: React.RefObject<HTMLElement | null>,
  opts: UseDraggableOptions = {}
) {
  const { edgePadding = 40, minVisible = 120 } = opts
  const [pos, setPos] = useState<DragState>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number } | null>(null)

  const clamp = useCallback(
    (x: number, y: number): DragState => {
      const el = containerRef.current
      if (!el) return { x, y }
      const rect = el.getBoundingClientRect()
      // Translate is applied on top of current rect, so we need the un-translated rect
      // We store raw translate, clamp so the element stays within viewport
      const vw = window.innerWidth
      const vh = window.innerHeight
      const w = rect.width
      const h = rect.height

      const minX = -(rect.left - pos.x) + edgePadding - w + minVisible
      const maxX = vw - (rect.left - pos.x) - edgePadding - minVisible + w - w
      const minY = -(rect.top - pos.y) + edgePadding
      const maxY = vh - (rect.top - pos.y) - h + edgePadding

      return {
        x: Math.max(minX, Math.min(maxX, x)),
        y: Math.max(minY, Math.min(maxY, y)),
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [edgePadding, minVisible]
  )

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    // Only primary button
    if (e.button !== 0) return
    // Don't drag if clicking interactive children
    const target = e.target as HTMLElement
    if (target.closest('button, a, input, select, textarea')) return

    e.preventDefault()
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: pos.x,
      posY: pos.y,
    }
    setIsDragging(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos])

  useEffect(() => {
    if (!isDragging) return

    const onMove = (e: MouseEvent) => {
      if (!dragStart.current) return
      const dx = e.clientX - dragStart.current.mouseX
      const dy = e.clientY - dragStart.current.mouseY
      const raw = {
        x: dragStart.current.posX + dx,
        y: dragStart.current.posY + dy,
      }
      setPos(clamp(raw.x, raw.y))
    }

    const onUp = () => {
      dragStart.current = null
      setIsDragging(false)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isDragging, clamp])

  const reset = useCallback(() => setPos({ x: 0, y: 0 }), [])

  return { pos, isDragging, onMouseDown, reset }
}
