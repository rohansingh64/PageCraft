import styles from '../styles/Topbar.module.css'

export default function Topbar({ blockCount, preview, onTogglePreview, onClear }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>
        <span className={styles.dot} />
        PageCraft
        <span className={styles.count}>
          {blockCount} {blockCount === 1 ? 'block' : 'blocks'}
        </span>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${preview ? styles.active : ''}`}
          onClick={onTogglePreview}
        >
          {preview ? '✎ Edit' : '◉ Preview'}
        </button>
        <button className={`${styles.btn} ${styles.danger}`} onClick={onClear}>
          Clear all
        </button>
      </div>
    </header>
  )
}
