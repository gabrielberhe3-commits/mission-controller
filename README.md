# Mission Controller

Mission Controller is a local-first personal operating system built with Next.js App Router, TypeScript, and Tailwind CSS.

This v3 pass upgrades the app from a mostly static demo into a more functional product foundation aimed at replacing Gabriel's scattered calendar, task, docs, and notes workflow with one operator surface.

## What changed in v3

- Added a shared client-side workspace store with local persistence for task, memory, calendar-view, and project-focus state.
- Added a visible brief feed with seeded morning briefs and nightly updates on the home and docs surfaces.
- Added a real local-first task creation flow through reusable quick-add drawers.
- Structured task actions so future automation can insert tasks through the same `createTask` path the UI already uses.
- Upgraded the calendar route with working `Month`, `Week`, `Day`, and `Agenda` switching plus date navigation.
- Made major shell and page actions functional: buttons now navigate, open drawers, change state, or provide explicit feedback.
- Turned projects into the main inspection layer for deliverables, updates, linked briefs, history, docs, memory, events, and tasks.
- Improved memory into a structured, project-linked section instead of a flat list.
- Tightened the information architecture so routes feel like one product rather than disconnected demo pages.

## Current routes

- `/` operator dashboard with metrics, briefs, project focus, tasks, memory, and docs
- `/calendar` interactive month, week, day, and agenda planning surface
- `/tasks` local-first execution queue with task creation and status advancement
- `/projects` portfolio plus detailed inspection of deliverables, updates, history, and linked work
- `/memory` durable context with project-linked notes and quick capture
- `/docs` seeded reference library plus brief archive

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
      workspace-overlays.tsx
    mission/
      mission-cards.tsx
    providers/
      workspace-provider.tsx
    ui/
      badge.tsx
      button.tsx
      drawer.tsx
      page-header.tsx
      panel.tsx
      progress-bar.tsx
      segmented-control.tsx
  data/
    mission-control.ts
  types/
    mission.ts
```

## Product model

- Calendar is the time spine.
- Tasks are the execution queue.
- Projects are the discovery and inspection layer for built work.
- Memory stores durable context, decisions, and project-linked notes.
- Docs hold reference material and operating specs.
- Briefs surface daily synthesis and nightly updates inside the product.

## What remains for future automation integration

- Replace the current local store with a repository-backed persistence layer such as IndexedDB or SQLite.
- Add assistant and automation writers for briefs, task creation, project updates, and memory capture.
- Add real calendar ingestion for `.ics` files and exported Google Calendar data.
- Add project creation and document editing flows instead of seeded-only placeholders.
- Add command palette, shortcuts, and a daily planner workflow on top of the shared action model.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Verification

Relevant checks for this pass:

```bash
npm run build
```
