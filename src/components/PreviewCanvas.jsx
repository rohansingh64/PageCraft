import { BLOCK_RENDERERS } from '../blocks/index'
import styles from '../styles/PreviewCanvas.module.css'

export default function PreviewCanvas({ blocks }) {
  if (blocks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No blocks yet. Switch to edit mode to start building.</p>
      </div>
    )
  }

  return (
    <article className={styles.page}>
      {blocks.map((block) => {
        const Renderer = BLOCK_RENDERERS[block.type]
        return Renderer ? (
          <div key={block.id} className={styles.block}>
            <Renderer data={block.data} />
          </div>
        ) : null
      })}
    </article>
  )
}
