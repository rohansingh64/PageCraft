export default function DividerBlock({ data }) {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: `2px ${data.style || 'solid'} ${data.color || '#e0e0e0'}`,
        margin: '8px 0',
      }}
    />
  )
}
