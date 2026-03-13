# Mission Controller

A local-first personal operating system built with Next.js, TypeScript, and Tailwind CSS.

This v2 pass upgrades the original single-page MVP into a multi-page product foundation with shared types, seeded domain data, reusable layout/UI components, and route-level information architecture.

## Product direction

Mission Controller is meant to replace the fragmented feeling of Google Calendar plus scattered notes and task tools.

The intended model is:

- calendar as the time spine
- tasks as execution
- projects as containers
- memory as durable context
- docs as structured knowledge
- one mission control homepage for what matters now

## Routes

- `/` mission control overview
- `/calendar` scheduling and future import surface
- `/tasks` execution queue
- `/projects` project portfolio and linked object graph
- `/memory` durable notes, preferences, and decisions
- `/docs` structured knowledge pages

## Architecture

```text
src/
  app/
    layout.tsx
    globals.css
    (mission)/
      layout.tsx
      page.tsx
      calendar/page.tsx
      tasks/page.tsx
      projects/page.tsx
      memory/page.tsx
      docs/page.tsx
  components/
    layout/
      app-shell.tsx
      sidebar-nav.tsx
      topbar.tsx
    mission/
      mission-cards.tsx
    ui/
      badge.tsx
      page-header.tsx
      panel.tsx
      progress-bar.tsx
  data/
    mission-control.ts
  types/
    mission.ts
```

## Current design choices

- Local-first and seeded/mock-only for now
- Shared app shell across all primary routes
- Reusable domain presentation components instead of page-local UI
- Shared types for events, tasks, projects, memory, docs, navigation, and workspace metrics
- Seeded data module with lightweight relational helpers
- Clear extension path for repository-backed persistence and calendar imports

## Extensibility path

The current app is intentionally frontend-heavy, but the structure is ready for the next layer:

1. Add a repository boundary between views and data.
2. Replace seeded arrays with SQLite, IndexedDB, or another local-first store.
3. Add `.ics` and Google Calendar export import flows.
4. Link tasks, events, memories, and docs around shared project and object IDs.
5. Introduce command palette, shortcuts, and daily planner workflows.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Verification

Relevant checks for this pass:

```bash
npm run lint
npm run build
```

## Notes

This is still intentionally a seeded-data app. The goal of this pass was to improve structure, product shape, and future adaptability without overengineering backend concerns yet.
