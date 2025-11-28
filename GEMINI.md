# Plan Partner Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-11-28

## Active Technologies

- **Frontend Framework**: React 18.x
- **Build Tool**: Vite 5.x
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 3.x
- **Backend**: Firebase (Firestore, Auth)

## Project Structure

```text
src/
├── components/
│   ├── layout/          # Sidebar, AppLayout
│   ├── calendar/        # CalendarGrid, EventCard
│   └── common/          # Button, Input
├── lib/
│   └── firebase.ts      # Firebase config
├── types/
│   └── index.ts         # Shared types
├── styles/
│   └── globals.css      # Global styles
├── App.tsx
└── main.tsx
```

## Commands

- **Start Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Type Check**: `npm run type-check`

## Code Style

- **TypeScript**: Strict mode enabled. No `any`. Interfaces for data models.
- **React**: Functional components with Hooks.
- **CSS**: Tailwind utility classes preferred over custom CSS.
- **Comments**: Chinese mandatory (Function headers, complex logic).

## Recent Changes

- **001-decompose-html**: Initial migration from HTML to React/Vite architecture.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
