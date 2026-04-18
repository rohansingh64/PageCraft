import { useState } from 'react'
import { BLOCK_RENDERERS } from '../blocks/index'
import styles from '../styles/CanvasBlock.module.css'

export default function CanvasBlock({
  block,
  index,
  isSelected,
  isFirst,
  isLast,
  onClick,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const Renderer = BLOCK_RENDERERS[block.type]
  if (!Renderer) return null

  const handleDragOver = (e) => {
    onDragOver(e, index)
    setIsDragOver(true)
  }

  const handleDragLeave = () => setIsDragOver(false)

  const handleDrop = (e) => {
    setIsDragOver(false)
    onDrop(e, index)
  }

  const wrapperClass = [
    styles.wrapper,
    isSelected  ? styles.selected  : '',
    isDragOver  ? styles.dragOver  : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={wrapperClass}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={onClick}
    >
      {/* Floating toolbar — visible on hover and when selected */}
      <div className={styles.toolbar}>
        <span className={styles.handle} title="Drag to reorder">⠿</span>

        <button
          className={styles.toolBtn}
          onClick={(e) => { e.stopPropagation(); onMoveUp() }}
          disabled={isFirst}
          title="Move up (⌘↑)"
        >↑</button>

        <button
          className={styles.toolBtn}
          onClick={(e) => { e.stopPropagation(); onMoveDown() }}
          disabled={isLast}
          title="Move down (⌘↓)"
        >↓</button>

        <button
          className={styles.toolBtn}
          onClick={(e) => { e.stopPropagation(); onDuplicate() }}
          title="Duplicate (⌘D)"
        >⧉</button>

        <button
          className={`${styles.toolBtn} ${styles.deletBtn}`}
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          title="Delete (Backspace)"
        >✕</button>
      </div>

      <div className={styles.inner}>
        <Renderer data={block.data} />
      </div>
    </div>
  )
}
