import HeaderBlock   from './HeaderBlock'
import TextBlock     from './TextBlock'
import ImageBlock    from './ImageBlock'
import MarkdownBlock from './MarkdownBlock'
import DividerBlock  from './DividerBlock'
import QuoteBlock    from './QuoteBlock'

/**
 * Maps block type strings to their renderer components.
 * Import this map wherever you need to render an arbitrary block.
 */
export const BLOCK_RENDERERS = {
  header:   HeaderBlock,
  text:     TextBlock,
  image:    ImageBlock,
  markdown: MarkdownBlock,
  divider:  DividerBlock,
  quote:    QuoteBlock,
}
