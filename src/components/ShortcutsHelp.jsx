import { useState } from 'react'
import styles from '../styles/ShortcutsHelp.module.css'

const IS_MAC = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform)
const MOD = IS_MAC ? '⌘' : 'Ctrl'

const SHORTCUTS = [
  { keys: `${MOD}+P`,       desc: 'Toggle preview' },
  { keys: `${MOD}+D`,       desc: 'Duplicate block' },
  { keys: `${MOD}+↑ / ↓`,  desc: 'Move block' },
  { keys: 'Backspace',       desc: 'Delete block' },
  { keys: 'Escape',          desc: 'Deselect' },
]

export default function ShortcutsHelp() {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      {open && (
        <div className={styles.panel}>
          <p className={styles.heading}>Keyboard shortcuts</p>
          <dl className={styles.list}>
            {SHORTCUTS.map(({ keys, desc }) => (
              <div key={keys} className={styles.row}>
                <dt className={styles.keys}>{keys}</dt>
                <dd className={styles.desc}>{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        title="Keyboard shortcuts"
        aria-label="Keyboard shortcuts"
      >
        ?
      </button>
    </div>
  )
}
