export default function QuoteBlock({ data }) {
  const accent = data.accent || '#6c63ff'

  return (
    <blockquote
      style={{
        margin: 0,
        padding: '20px 28px',
        borderLeft: `5px solid ${accent}`,
        background: `${accent}12`,
        borderRadius: '0 12px 12px 0',
      }}
    >
      <p
        style={{
          margin: '0 0 10px',
          fontSize: '1.15rem',
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          color: '#2d2d2d',
          lineHeight: 1.6,
        }}
      >
        "{data.text}"
      </p>

      {data.author && (
        <cite
          style={{
            fontSize: '0.85rem',
            color: accent,
            fontStyle: 'normal',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          — {data.author}
        </cite>
      )}
    </blockquote>
  )
}
