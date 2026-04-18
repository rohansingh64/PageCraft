/**
 * Parses a minimal subset of Markdown to HTML.
 * Handles: headings, bold, italic, inline code, blockquotes, unordered lists.
 */
export function parseMarkdown(src) {
  return src
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '<br/><br/>')
}

/**
 * Parses inline formatting only: bold, italic, inline code.
 * Safe to use inside rendered text blocks.
 */
export function parseInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
}

/**
 * Generates a short random ID for new blocks.
 */
export function uid() {
  return Math.random().toString(36).slice(2, 9)
}
