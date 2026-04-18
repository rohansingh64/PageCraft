# PageCraft — Dynamic Content Builder

PageCraft is a modern drag-and-drop content builder that allows users to create and customize a personal webpage in real time. It provides a clean and interactive interface where users can add, arrange, and edit different types of content blocks easily.

---

## 🚀 Overview

PageCraft is designed to simulate a lightweight version of tools like Notion or Webflow. It focuses on simplicity, usability, and real-time editing without requiring any backend.

Users can build a page visually by dragging components onto a canvas and configuring them instantly.

---

## ✨ Features

- Drag and drop content blocks
- Multiple block types (Header, Text, Image, Markdown, Divider, Quote)
- Reorder blocks on the canvas
- Edit content using a configuration panel
- Live preview mode
- Auto-save using localStorage
- Keyboard shortcuts for quick actions
- Clean and minimal UI

---

## 🧱 Block Types

- Header
- Rich Text
- Image
- Markdown
- Divider
- Quote

Each block has its own editable properties like text, alignment, color, etc.

---

## 🖥️ UI Layout

The application follows a three-panel layout:

1. Left Panel (Palette)
   - Contains draggable block types

2. Center Panel (Canvas)
   - Main editing area
   - Displays all blocks

3. Right Panel (Config Panel)
   - Shows settings for selected block

---

## 🔄 Core Functionalities

### Add Block
Drag a block from the palette and drop it onto the canvas.

### Reorder Block
Drag existing blocks to change their position.

### Edit Block
Click a block to modify its content and styling.

### Delete Block
Remove unwanted blocks easily.

### Duplicate Block
Clone an existing block with one click.

---

## 👁️ Preview Mode

- Switch to preview mode to view final output
- Removes all editing UI
- Shows clean content layout

---

## 💾 Data Persistence

- Uses localStorage
- Saves all changes automatically
- No backend required
- Data remains after page refresh

---

## ⌨️ Keyboard Shortcuts

- Delete → Remove block
- Ctrl + D → Duplicate block
- Ctrl + ↑ → Move block up
- Ctrl + ↓ → Move block down
- Ctrl + P → Toggle preview

---

## ⚙️ State Management

- All state stored in root component
- Uses React hooks
- Flat array structure for blocks
- Each block has:
  - id
  - type
  - data

---

## 🧩 Component Structure

- App.jsx (Main state)
- Topbar.jsx
- Palette.jsx
- Canvas.jsx
- CanvasBlock.jsx
- ConfigPanel.jsx
- PreviewCanvas.jsx
- Toast.jsx

---

## 🔗 Custom Hooks

- useLocalStorage → persistence
- useDragDrop → drag & drop logic
- useKeyboardShortcuts → shortcuts
- useToast → notifications

---

## 📁 Project Structure


src/
├── components/
├── blocks/
├── hooks/
├── utils/
├── styles/
├── App.jsx
├── main.jsx



---

## 🛠️ Tech Stack

- React 18
- Vite
- CSS Modules
- HTML5 Drag and Drop API
- localStorage

---

## 🎯 Design Approach

- Minimal and clean UI
- Editorial-style typography
- Focus on user experience
- Smooth interactions
- Clear visual feedback

---

## ➕ Adding New Block

Steps:

1. Add block in blockTypes.js
2. Create new component
3. Register in BLOCK_RENDERERS
4. Add config UI

---

## 📌 Key Highlights

- No external drag-drop library used
- No backend required
- Fast performance with Vite
- Fully component-based architecture
- Easy to extend and maintain

---

## 🧪 Future Improvements

- Backend integration
- User authentication
- Export as HTML/PDF
- More block types
- Theme customization

---

## 📷 Demo

Live Demo:
https://pagecraft.netlify.app

---

## 📄 Conclusion

PageCraft is a powerful yet simple content builder that demonstrates strong frontend skills, clean architecture, and user-focused design. It showcases real-world implementation of drag-and-drop systems, state management, and UI/UX principles.
