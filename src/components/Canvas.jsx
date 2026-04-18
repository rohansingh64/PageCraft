import CanvasBlock from './CanvasBlock'
import styles from '../styles/Canvas.module.css'

export default function Canvas({
  blocks,
  selectedId,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDrop,
  onDropOnCanvas,
}) {
  if (blocks.length === 0) {
    return (
      <div
        className={styles.emptyZone}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropOnCanvas}
      >
        <div className={styles.emptyIcon}>✦</div>
        <p>Drag blocks here to start building your page</p>
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {blocks.map((block, index) => (
        <CanvasBlock
          key={block.id}
          block={block}
          index={index}
          isSelected={block.id === selectedId}
          isFirst={index === 0}
          isLast={index === blocks.length - 1}
          onClick={() => onSelect(block.id)}
          onDelete={() => onDelete(block.id)}
          onDuplicate={() => onDuplicate(block.id)}
          onMoveUp={() => onMoveUp(index)}
          onMoveDown={() => onMoveDown(index)}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}

      {/* Always-visible drop zone at the bottom */}
      <div
        className={styles.tailDrop}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add(styles.over) }}
        onDragLeave={(e) => e.currentTarget.classList.remove(styles.over)}
        onDrop={(e) => { e.currentTarget.classList.remove(styles.over); onDropOnCanvas(e) }}
      >
        + drop here
      </div>
    </div>
  )
}
