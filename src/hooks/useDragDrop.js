import { useRef } from 'react'

/**
 * Encapsulates all drag-and-drop state and handlers for the canvas.
 *
 * Two drag sources are supported:
 *   - "palette"  — dragging a block type from the palette sidebar
 *   - "canvas"   — dragging an existing block to reorder it
 *
 * @param {Function} onAddBlock    - (type, atIndex) => void
 * @param {Function} onMoveBlock   - (fromIndex, toIndex) => void
 */
export function useDragDrop(onAddBlock, onMoveBlock) {
  const dragSource   = useRef(null)  // 'palette' | 'canvas'
  const dragPayload  = useRef(null)  // block type string OR canvas index
  const dragOverIndex = useRef(null)

  // Called when the user starts dragging a palette item
  const paletteDragStart = (e, blockType) => {
    dragSource.current  = 'palette'
    dragPayload.current = blockType
    e.dataTransfer.effectAllowed = 'copy'
  }

  // Called when the user starts dragging an existing canvas block
  const canvasDragStart = (e, index) => {
    dragSource.current  = 'canvas'
    dragPayload.current = index
    e.dataTransfer.effectAllowed = 'move'
  }

  // Called as the dragged item hovers over a drop target
  const onDragOver = (e, index) => {
    e.preventDefault()
    dragOverIndex.current = index
  }

  // Called when the item is dropped onto a specific block slot
  const onDropAtIndex = (e, index) => {
    e.preventDefault()
    _handleDrop(index)
  }

  // Called when the item is dropped onto the canvas tail / empty state
  const onDropOnCanvas = (e) => {
    e.preventDefault()
    _handleDrop(null)
  }

  const _handleDrop = (index) => {
    if (dragSource.current === 'palette') {
      onAddBlock(dragPayload.current, index)

    } else if (dragSource.current === 'canvas') {
      const from = dragPayload.current
      const to   = dragOverIndex.current ?? index

      // Guard: both indices must exist and be different
      if (from !== null && from !== undefined &&
          to   !== null && to   !== undefined &&
          from !== to) {
        onMoveBlock(from, to)
      }
    }

    // Always reset regardless of outcome
    dragSource.current   = null
    dragPayload.current  = null
    dragOverIndex.current = null
  }

  return {
    paletteDragStart,
    canvasDragStart,
    onDragOver,
    onDropAtIndex,
    onDropOnCanvas,
  }
}
