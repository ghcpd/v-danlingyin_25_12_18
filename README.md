# PodStation (Demo)

A minimal, production-style podcast listening UI built to the specification in `input_ui_spec.txt`.

Tech stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Routing: react-router-dom

Quickstart
1. pnpm install
2. pnpm dev
3. pnpm build

Validation & tests
- Run `node validate_project.js` or `./run_validation.sh` to produce `logs/validation_report.json`.
- Run `node test_runner.js` to run validation and attempt a build; results are in `logs/test_run_report.json`.

Project structure (important files)
- src/components - reusable UI components
- src/pages - page-level components (Home, Podcast detail, Search, Library, Category)
- src/context - Player and Library contexts
- src/data/mockPodcasts.ts - mock podcasts & episodes
- validate_project.js - validation script
- test_runner.js - runs validation and build

Features implemented
- Homepage (discover) with hero, trending, categories, recently added
- Podcast detail page with episodes list
- Global audio player (play/pause/seek/volume)
- Search with debounce and filters
- Library with subscriptions, favorites and history stored in localStorage
- Accessible attributes (aria-labels, roles) and keyboard focus states

Limitations / notes
- This is a UI-focused demo using mock data and a public sample audio URL. It does not include backend integration or user accounts.
- TypeScript strict mode is enabled. Some optional improvements: playback queues, playback speed, virtualization for very long lists.

If you'd like, I can:
- Add unit tests (vitest + react-testing-library)
- Wire up a simple API server for persistent data

