import { BLOCK_TYPES } from '../blocks/blockTypes'
import styles from '../styles/Palette.module.css'

export default function Palette({ onDragStart }) {
  return (
    <aside className={styles.palette}>
      <p className={styles.heading}>Blocks</p>

      {Object.entries(BLOCK_TYPES).map(([type, info]) => (
        <div
          key={type}
          className={styles.item}
          draggable
          onDragStart={(e) => onDragStart(e, type)}
          title={info.description}
        >
          <span className={styles.icon}>{info.icon}</span>
          <span className={styles.label}>{info.label}</span>
        </div>
      ))}

      <p className={styles.hint}>
        Drag a block onto the canvas, or drop it between existing blocks.
      </p>
    </aside>
  )
}
