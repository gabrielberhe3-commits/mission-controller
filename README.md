# Mission Controller

A local-first personal operating system built with Next.js, TypeScript and Tailwind.

## What this MVP includes

- **Mission Control homepage** with overview widgets
- **Calendar section** with month / week / day toggles and seeded events
- **Tasks section** with priorities, due dates and status
- **Projects section** with progress and milestones
- **Memory section** for durable notes / journal snippets
- **Docs section** for lightweight knowledge pages

## Why this exists

The goal is to replace the fragmented feeling of Google Calendar + scattered notes/tasks with a more opinionated control center where planning, execution and context live together.

## Tech

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Static seeded data for now

## Run locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Current structure

```text
src/app/
  globals.css
  layout.tsx
  page.tsx
```

For the MVP, the UI and seed data live in `src/app/page.tsx` to move fast.

## Recommended next steps

1. **Move seed data into a real data layer**
   - start with `src/lib/data/`
   - then upgrade to SQLite/Postgres

2. **Add persistence**
   - Prisma + SQLite is the fastest path for a local-first prototype
   - Drizzle is also a good fit if you want lighter tooling

3. **Calendar import before calendar sync**
   - first support `.ics` and Google Calendar export import
   - then add live Google sync only if still needed

4. **Link the objects together**
   - events ↔ tasks
   - tasks ↔ projects
   - memories/docs ↔ projects

5. **Add operator UX**
   - command palette
   - keyboard shortcuts
   - daily planner view
   - focus mode

## Product direction

A good final version should feel like:

- calendar at the center
- tasks as execution
- projects as containers
- memory as durable context
- docs as structured knowledge
- one homepage that shows what matters *today*

## Notes

This is intentionally a clean foundation, not a full backend yet.
