// Registry of all available block types.
// Add new block types here — the palette and canvas pick them up automatically.

export const BLOCK_TYPES = {
  header: {
    label: 'Header',
    icon: 'H',
    description: 'A styled page heading',
    defaultData: {
      text: 'My Heading',
      level: 'h1',
      align: 'left',
      color: '#1a1a2e',
    },
  },
  text: {
    label: 'Rich Text',
    icon: 'T',
    description: 'Paragraph with inline formatting',
    defaultData: {
      content:
        'Start writing here. **Bold**, *italic*, and `code` are supported.',
      color: '#2d2d2d',
    },
  },
  image: {
    label: 'Image',
    icon: '◻',
    description: 'Display an image by URL',
    defaultData: {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      caption: 'Mountain vista',
      fit: 'cover',
    },
  },
  markdown: {
    label: 'Markdown',
    icon: 'M↓',
    description: 'Write in Markdown, see live preview',
    defaultData: {
      source:
        '## Hello World\n\nThis is **markdown** preview.\n\n- Item one\n- Item two\n- Item three\n\n> A beautiful blockquote',
    },
  },
  divider: {
    label: 'Divider',
    icon: '—',
    description: 'Horizontal rule separator',
    defaultData: { style: 'solid', color: '#e0e0e0' },
  },
  quote: {
    label: 'Quote',
    icon: '❝',
    description: 'Styled pull quote with attribution',
    defaultData: {
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      accent: '#6c63ff',
    },
  },
}
