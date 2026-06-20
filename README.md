# Weenat — Monthly Calendar

A monthly calendar app built as a technical exercise. Navigate months and years, create events by clicking a day, and delete them.

## Tech choices

### React, TypeScript, Next.js

These are the technologies I use every day, so they were the natural choice. Beyond familiarity, Next.js brings a solid foundation to scale the project if needed: server-side rendering (better SEO and initial load performance), a performant file-based router, native caching, built-in image and font optimisation, and more.

### Jest + Testing Library

Simple setup with a clear, readable API — very close to Vitest, making a future migration straightforward. Tests are co-located with their component or hook, and written following the AAA pattern (Arrange, Act, Assert) for readability.

### ESLint

Configured with `react-hooks/exhaustive-deps` as an error to catch common React mistakes at lint time rather than at runtime — for example: unstable values (object literals, inline callbacks) in `useEffect` dependency arrays, or missing dependencies that cause stale closures.

### Radix UI

Used for the event creation dialog (`@radix-ui/react-dialog`). Radix provides an unstyled, accessible component that handles focus trapping, Escape key closing, and ARIA attributes out of the box — leaving full control over styling to Tailwind.

### 100% test coverage

The Jest config enforces 100% coverage across statements, branches, functions, and lines. It is not a guarantee that everything works, but it is a strong safety net that forces every code path to be exercised — including error branches and edge cases that are easy to forget.

### Path aliases

`@/*` resolves to `src/*` in both TypeScript and Jest, so imports read as:

```ts
import { useEvents } from '@/_lib/useEvents'
```

instead of `../../../_lib/useEvents`. Easier to read, and immune to refactoring moves.

### File organisation

Each component, hook, or utility lives in its own folder and splits its concerns across three files:

```
ComponentName/
  index.tsx       — implementation
  types.ts        — TypeScript types and interfaces
  constants.ts    — hardcoded values
  index.spec.tsx  — co-located tests
```

## Project structure

```
src/
  app/                    — Next.js entry point (layout, page, global styles)

  _components/
    Calendar/             — monthly grid, composes all sub-components
    CalendarHeader/       — prev/next navigation buttons + month/year label
    CalendarDay/          — day cell with its events list
    EventBadge/           — event pill with delete button
    EventModal/           — Radix UI dialog for creating an event

  _lib/
    dateUtils/            — pure date helpers (getDaysInMonth, toDateKey, …)
    useCalendar/          — useReducer-based month/year navigation
    useEvents/            — event CRUD with localStorage persistence
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev          # start development server
npm run build        # production build
npm run typecheck    # TypeScript type check
npm run lint         # ESLint
npm test             # run tests
npm run test:coverage  # run tests with coverage report
```
