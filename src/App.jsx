import { useState, useCallback } from 'react'

import { BLOCK_TYPES } from './blocks/blockTypes'
import { uid } from './utils/parse'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useDragDrop } from './hooks/useDragDrop'
import { useToast } from './hooks/useToast'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

import Topbar         from './components/Topbar'
import Palette        from './components/Palette'
import Canvas         from './components/Canvas'
import ConfigPanel    from './components/ConfigPanel'
import PreviewCanvas  from './components/PreviewCanvas'
import Toast          from './components/Toast'
import ShortcutsHelp  from './components/ShortcutsHelp'

import styles from './styles/App.module.css'

// ─── Seed blocks shown on first load 

const SEED_BLOCKS = [
  {
    id: uid(),
    type: 'header',
    data: { text: 'Welcome to My Page', level: 'h1', align: 'center', color: '#1a1a2e' },
  },
  {
    id: uid(),
    type: 'text',
    data: {
      content:
        'This is your personal content page builder. Drag blocks from the palette, reorder them, and customise every detail. Your changes are **automatically saved**.',
      color: '#444',
    },
  },
  {
    id: uid(),
    type: 'quote',
    data: {
      text: 'Design is not just what it looks like and feels like. Design is how it works.',
      author: 'Steve Jobs',
      accent: '#6c63ff',
    },
  },
]

// ─── App 

export default function App() {
  const [blocks, setBlocks]     = useLocalStorage('pagecraft_blocks_v1', SEED_BLOCKS)
  const [selectedId, setSelectedId] = useState(null)
  const [preview, setPreview]   = useState(false)
  const { message, showToast }  = useToast()

  // ── Block CRUD 

  const addBlock = useCallback((type, atIndex) => {
    const newBlock = {
      id: uid(),
      type,
      data: { ...BLOCK_TYPES[type].defaultData },
    }
    setBlocks((prev) => {
      const next = [...prev]
      if (atIndex == null) {
        next.push(newBlock)
      } else {
        next.splice(atIndex, 0, newBlock)
      }
      return next
    })
    setSelectedId(newBlock.id)
    showToast(`${BLOCK_TYPES[type].label} block added`)
  }, [setBlocks, showToast])

  const moveBlock = useCallback((fromIndex, toIndex) => {
    setBlocks((prev) => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }, [setBlocks])

  const deleteBlock = useCallback((id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id))
    setSelectedId((cur) => (cur === id ? null : cur))
    showToast('Block removed')
  }, [setBlocks, showToast])

  const duplicateBlock = useCallback((id) => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id)
      if (index === -1) return prev
      const copy = { ...prev[index], id: uid(), data: { ...prev[index].data } }
      const next = [...prev]
      next.splice(index + 1, 0, copy)
      return next
    })
    showToast('Block duplicated')
  }, [setBlocks, showToast])

  const updateBlockData = useCallback((id, newData) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, data: newData } : b))
    )
  }, [setBlocks])

  const moveUp = useCallback((index) => {
    if (index === 0) return
    moveBlock(index, index - 1)
  }, [moveBlock])

  const moveDown = useCallback((index) => {
    moveBlock(index, index + 1)
  }, [moveBlock])

  const clearAll = useCallback(() => {
    setBlocks([])
    setSelectedId(null)
    showToast('Canvas cleared')
  }, [setBlocks, showToast])

  // ── Drag & drop 

  const { paletteDragStart, canvasDragStart, onDragOver, onDropAtIndex, onDropOnCanvas } =
    useDragDrop(addBlock, moveBlock)

  // ── Derived state 

  const selectedBlock = blocks.find((b) => b.id === selectedId) ?? null
  const selectedIndex = blocks.findIndex((b) => b.id === selectedId)

  // ── Keyboard shortcuts

  useKeyboardShortcuts({
    hasSelection:    selectedIndex !== -1,
    onDeselect:      () => setSelectedId(null),
    onDelete:        () => selectedId && deleteBlock(selectedId),
    onDuplicate:     () => selectedId && duplicateBlock(selectedId),
    onMoveUp:        () => selectedIndex > 0 && moveUp(selectedIndex),
    onMoveDown:      () => selectedIndex < blocks.length - 1 && moveDown(selectedIndex),
    onTogglePreview: () => setPreview((p) => !p),
  })

  // ── Render 

  return (
    <div className={styles.root}>
      <Topbar
        blockCount={blocks.length}
        preview={preview}
        onTogglePreview={() => setPreview((p) => !p)}
        onClear={clearAll}
      />

      {preview ? (
        <main className={styles.previewArea}>
          <PreviewCanvas blocks={blocks} />
        </main>
      ) : (
        <div className={styles.workspace}>
          <Palette onDragStart={paletteDragStart} />

          <main className={styles.canvasArea}>
            <Canvas
              blocks={blocks}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={deleteBlock}
              onDuplicate={duplicateBlock}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
              onDragStart={canvasDragStart}
              onDragOver={onDragOver}
              onDrop={onDropAtIndex}
              onDropOnCanvas={onDropOnCanvas}
            />
          </main>

          <aside className={styles.configArea}>
            <ConfigPanel
              block={selectedBlock}
              onChange={(newData) =>
                selectedBlock && updateBlockData(selectedBlock.id, newData)
              }
            />
          </aside>
        </div>
      )}

      <Toast message={message} />
      {!preview && <ShortcutsHelp />}
    </div>
  )
}
