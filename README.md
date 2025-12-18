# Podcast App

A lightweight podcast listening UI built with React + TypeScript + TailwindCSS + Vite.

## Tech Stack
- React 18
- TypeScript (strict mode)
- Tailwind CSS
- Vite

## Setup
Install dependencies:

pnpm install

Start dev server:

pnpm dev

Build:

pnpm build

Run validation:

pnpm test

## Project Structure
See `src/` for components, pages, hooks, context, data and utils.

## Features Implemented
- Homepage / Discover
- Podcast detail with episodes
- Global audio player (play/pause/next)
- Search with filtering by category
- Library (subscriptions + favorites) saved to localStorage
- Responsive layout
- Accessibility basics (ARIA attributes on controls)

## Validation
Run `pnpm test` to run validation and build checks. Results are written to `logs/validation_run.log`.

## Known Limitations
- Basic styling and interactions implemented; not a production-level feature-complete app.
- Audio progress syncing is basic.
