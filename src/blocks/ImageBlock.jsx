const FALLBACK = 'https://placehold.co/800x260/eeeeee/aaaaaa?text=Image+Not+Found'

export default function ImageBlock({ data }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', height: 260 }}>
        <img
          src={data.url}
          alt={data.caption || ''}
          style={{
            width: '100%',
            height: '100%',
            objectFit: data.fit || 'cover',
            display: 'block',
          }}
          onError={(e) => { e.target.src = FALLBACK }}
        />
      </div>

      {data.caption && (
        <figcaption
          style={{
            marginTop: 8,
            fontSize: '0.85rem',
            color: '#888',
            textAlign: 'center',
            fontStyle: 'italic',
            fontFamily: "'Lora', Georgia, serif",
          }}
        >
          {data.caption}
        </figcaption>
      )}
    </figure>
  )
}
