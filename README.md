# FocusBoard

A responsive task-management dashboard built with React, Vite, JavaScript and CSS.

## Features
- Six initial sample tasks
- Create, edit and delete tasks
- Task status and priority management
- Case-insensitive partial title search
- Combined status and priority filters
- Dynamic dashboard statistics
- Three-slide Focus Notes carousel
- Browser persistence with localStorage
- Responsive desktop, tablet and mobile layouts

## Requirements
- Node.js and npm
- A modern browser

## Install and run
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## State management
React useState manages the UI state, search text, filters, modal visibility and selected task. The task array is stored through a reusable useLocalStorage hook. Derived statistics and filtered tasks are calculated from the complete task array.

## localStorage
The application uses the key `focusboard_tasks`. On first use, six sample tasks are loaded. On later visits, saved tasks are restored. The full task array is saved, not only the currently filtered tasks.

## Project structure
- `src/components`: reusable dashboard components
- `src/data`: initial sample task data
- `src/hooks`: reusable localStorage hook
- `src/App.jsx`: application state and component composition
- `src/index.css`: global styles and responsive layouts

## Links
- Hosted application: Add your Vercel or Netlify URL here.
- GitHub repository: Add your public repository URL here.

## Design note
This starter implementation follows the functional requirements in the assignment reference PDF. Replace the example Focus Notes text and adjust colours, spacing, typography and layout after comparing with the actual company Figma frames.

## Known limitations
- No backend or user authentication; task data is stored in the current browser.
- The example Focus Notes text must be replaced with the exact Figma content.
- The visual design should be checked against the supplied Figma reference before submission.
