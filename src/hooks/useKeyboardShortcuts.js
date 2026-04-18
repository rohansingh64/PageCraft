import { useEffect } from 'react'

/**
 * Registers global keyboard shortcuts for the builder.
 *
 * Shortcuts:
 *   Escape          — deselect current block
 *   Backspace / Del — delete selected block (when not focused on an input)
 *   Mod+D           — duplicate selected block
 *   Mod+↑ / Mod+↓  — move selected block up / down
 *   Mod+P           — toggle preview mode
 *
 * @param {object} handlers
 * @param {Function} handlers.onDeselect
 * @param {Function} handlers.onDelete
 * @param {Function} handlers.onDuplicate
 * @param {Function} handlers.onMoveUp
 * @param {Function} handlers.onMoveDown
 * @param {Function} handlers.onTogglePreview
 * @param {boolean}  handlers.hasSelection
 */
export function useKeyboardShortcuts({
  onDeselect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onTogglePreview,
  hasSelection,
}) {
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
      const mod = e.metaKey || e.ctrlKey

      // Toggle preview — always available
      if (mod && e.key === 'p') {
        e.preventDefault()
        onTogglePreview()
        return
      }

      // Block-level shortcuts — require a selected block
      if (!hasSelection) return

      if (e.key === 'Escape') {
        onDeselect()
        return
      }

      // Skip destructive/move shortcuts when the user is typing in a field
      if (isTyping) return

      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault()
        onDelete()
        return
      }

      if (mod && e.key === 'd') {
        e.preventDefault()
        onDuplicate()
        return
      }

      if (mod && e.key === 'ArrowUp') {
        e.preventDefault()
        onMoveUp()
        return
      }

      if (mod && e.key === 'ArrowDown') {
        e.preventDefault()
        onMoveDown()
        return
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onDeselect, onDelete, onDuplicate, onMoveUp, onMoveDown, onTogglePreview, hasSelection])
}
