const SIZE_MAP = { h1: '2.4rem', h2: '1.8rem', h3: '1.3rem' }

export default function HeaderBlock({ data }) {
  const Tag = data.level || 'h1'

  return (
    <Tag
      style={{
        margin: 0,
        fontSize: SIZE_MAP[data.level] || '2.4rem',
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        color: data.color || '#1a1a2e',
        textAlign: data.align || 'left',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      }}
    >
      {data.text || 'Heading'}
    </Tag>
  )
}
