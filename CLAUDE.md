# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server (Vite + Express, auto-finds port starting at 3000)
npm run build        # Production build (Vite client → dist/public/ + esbuild server bundle)
npm start            # Run production server
npm test             # Run Vitest tests (node environment)
npm run db:push      # Push Drizzle schema changes to MySQL
```

Tests live in `server/**/*.test.ts` and run with Vitest in node environment.

## Architecture

Full-stack TypeScript monorepo using **Vite + React 19** (client) and **Express** (server), connected via **tRPC v11** with React Query.

### Directory Layout

- `client/src/` — React SPA (Wouter router, not Next.js)
- `server/` — Express API server with tRPC
- `shared/` — Types and constants shared between client/server
- `drizzle/` — Database schema and migrations (MySQL via Drizzle ORM)

### Path Aliases

- `@/*` → `client/src/`
- `@shared/*` → `shared/`

### Client Architecture

- **Routing:** Wouter — routes defined in `App.tsx`, the main Dashboard page manages 6 sections via local state (not URL routes)
- **Sections:** `client/src/components/sections/` — Overview, Drivers, Constructors, Races, Predictions, Cars
- **UI:** Shadcn/ui (new-york style) components in `client/src/components/ui/`
- **Data hooks:** `client/src/hooks/useF1LiveData.ts` exports all F1 data hooks (drivers, constructors, schedule, results, latest session) — each wraps a tRPC query with fallback to static data from `lib/f1Data.ts`
- **Theming:** ThemeContext provides light/dark mode with localStorage persistence
- **Layout:** `DashboardLayout.tsx` + `Sidebar.tsx` handle the shell; sidebar uses charcoal background (`#1A1A2E`), accent is F1 Red (`#E8002D`)

### Server Architecture

- **Entry:** `server/_core/index.ts` (Express setup), `server/index.ts` (production start)
- **tRPC router:** `server/routers.ts` — three sub-routers: `system`, `auth`, `f1`
- **Auth:** Custom OAuth with JWT (Jose library), session cookies, context created in `server/_core/context.ts`
- **F1 data:** Proxies two external APIs:
  - Jolpica/Ergast: `https://api.jolpi.ca/ergast/f1` (standings, results, schedule)
  - OpenF1: `https://api.openf1.org/v1` (live session data)

### Database

Single `users` table (Drizzle + MySQL) with OAuth fields (`openId`, `loginMethod`, `role`). Schema in `drizzle/schema.ts`.

## Design System

- **Typography:** Barlow Condensed (display), IBM Plex Sans (body), IBM Plex Mono (stats/lap times)
- **Colors:** Off-white background `#F8F7F4`, team colors mapped in `lib/f1Data.ts`
- **Design language:** "Precision Engineering Editorial" — Swiss grid meets motorsport aesthetic
