import { parseMarkdown } from '../utils/parse'
import styles from '../styles/MarkdownBlock.module.css'

export default function MarkdownBlock({ data }) {
  return (
    <div
      className={styles.preview}
      dangerouslySetInnerHTML={{ __html: parseMarkdown(data.source || '') }}
    />
  )
}
