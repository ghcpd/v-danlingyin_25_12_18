# Podcast App (React + TypeScript + Tailwind)

A minimal production-ready podcast listening UI built with React 18, TypeScript, Tailwind CSS, and Vite.

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS
- Vite
- pnpm (recommended)

## Setup
1. Install dependencies
   pnpm install

2. Run dev server
   pnpm dev

3. Build
   pnpm build

## Project Structure
- `src/` - application source
  - `components/` - reusable components
  - `pages/` - route pages
  - `context/` - React contexts (Player, Library)
  - `data/` - mock data
  - `hooks/` - custom hooks
  - `types/` - TypeScript interfaces/enums

## Features Implemented
- Homepage with hero, trending, categories, recently added
- Podcast detail page with episodes list
- Global audio player (play/pause, progress)
- Search with debounce
- Library with subscriptions persisted to localStorage
- Routing using React Router v6
- TypeScript strict mode enabled
- Tailwind CSS for styling
- Accessibility basics (aria-labels, roles)

## Validation
- Run `pnpm run validate` to execute `validate_project.js`
- Run `pnpm run test-runner` to run validation and attempt a build

## Known limitations
- Volume control, prev/next, and several advanced player features are minimal or not implemented yet
- Automated tests are basic and focused on file-level checks

