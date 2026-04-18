import { parseInline } from '../utils/parse'

export default function TextBlock({ data }) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: '1.05rem',
        lineHeight: 1.8,
        color: data.color || '#2d2d2d',
        fontFamily: "'Lora', Georgia, serif",
      }}
      dangerouslySetInnerHTML={{ __html: parseInline(data.content || '') }}
    />
  )
}
