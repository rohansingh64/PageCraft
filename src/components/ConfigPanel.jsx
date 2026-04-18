import styles from '../styles/ConfigPanel.module.css'

//  Reusable field wrapper 

function Field({ label, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  )
}

//  Per-type config forms 

function HeaderConfig({ data, update }) {
  return (
    <>
      <Field label="Text">
        <input
          className={styles.input}
          value={data.text}
          onChange={(e) => update('text', e.target.value)}
        />
      </Field>

      <Field label="Level">
        <select
          className={styles.input}
          value={data.level}
          onChange={(e) => update('level', e.target.value)}
        >
          <option value="h1">H1 — Title</option>
          <option value="h2">H2 — Section</option>
          <option value="h3">H3 — Subsection</option>
        </select>
      </Field>

      <Field label="Alignment">
        <select
          className={styles.input}
          value={data.align}
          onChange={(e) => update('align', e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </Field>

      <Field label="Color">
        <input
          className={`${styles.input} ${styles.colorInput}`}
          type="color"
          value={data.color}
          onChange={(e) => update('color', e.target.value)}
        />
      </Field>
    </>
  )
}

function TextConfig({ data, update }) {
  return (
    <>
      <Field label="Content — **bold**, *italic*, `code`">
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          value={data.content}
          onChange={(e) => update('content', e.target.value)}
        />
      </Field>

      <Field label="Text Color">
        <input
          className={`${styles.input} ${styles.colorInput}`}
          type="color"
          value={data.color}
          onChange={(e) => update('color', e.target.value)}
        />
      </Field>
    </>
  )
}

function ImageConfig({ data, update }) {
  return (
    <>
      <Field label="Image URL">
        <input
          className={styles.input}
          value={data.url}
          placeholder="https://..."
          onChange={(e) => update('url', e.target.value)}
        />
      </Field>

      <Field label="Caption">
        <input
          className={styles.input}
          value={data.caption}
          onChange={(e) => update('caption', e.target.value)}
        />
      </Field>

      <Field label="Object Fit">
        <select
          className={styles.input}
          value={data.fit}
          onChange={(e) => update('fit', e.target.value)}
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
        </select>
      </Field>
    </>
  )
}

function MarkdownConfig({ data, update }) {
  return (
    <>
      <Field label="Markdown Source">
        <textarea
          className={`${styles.input} ${styles.textarea} ${styles.mono}`}
          style={{ minHeight: 200 }}
          value={data.source}
          onChange={(e) => update('source', e.target.value)}
        />
      </Field>
      <p className={styles.hint}>
        Supports # headings, **bold**, *italic*, `code`, - lists, &gt; quotes
      </p>
    </>
  )
}

function DividerConfig({ data, update }) {
  return (
    <>
      <Field label="Line Style">
        <select
          className={styles.input}
          value={data.style}
          onChange={(e) => update('style', e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
        </select>
      </Field>

      <Field label="Color">
        <input
          className={`${styles.input} ${styles.colorInput}`}
          type="color"
          value={data.color}
          onChange={(e) => update('color', e.target.value)}
        />
      </Field>
    </>
  )
}

function QuoteConfig({ data, update }) {
  return (
    <>
      <Field label="Quote Text">
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          value={data.text}
          onChange={(e) => update('text', e.target.value)}
        />
      </Field>

      <Field label="Attribution">
        <input
          className={styles.input}
          value={data.author}
          placeholder="Author name…"
          onChange={(e) => update('author', e.target.value)}
        />
      </Field>

      <Field label="Accent Color">
        <input
          className={`${styles.input} ${styles.colorInput}`}
          type="color"
          value={data.accent}
          onChange={(e) => update('accent', e.target.value)}
        />
      </Field>
    </>
  )
}

//  Config form registry 

const CONFIG_FORMS = {
  header:   HeaderConfig,
  text:     TextConfig,
  image:    ImageConfig,
  markdown: MarkdownConfig,
  divider:  DividerConfig,
  quote:    QuoteConfig,
}

//  Public component 

export default function ConfigPanel({ block, onChange }) {
  if (!block) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>✦</span>
        <p>Click a block on the canvas to configure it</p>
      </div>
    )
  }

  const Form = CONFIG_FORMS[block.type]
  if (!Form) return null

  // Convenience updater: merge a single key into block.data
  const update = (key, value) => onChange({ ...block.data, [key]: value })

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        {block.type} settings
      </div>
      <Form data={block.data} update={update} />
    </div>
  )
}
