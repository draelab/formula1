# F1 2026 Dashboard — TODO

## Phase 1: Core Dashboard (Complete)
- [x] Overview section with hero, championship leaders, latest race
- [x] Driver standings section with table/chart toggle
- [x] Constructor standings section with bar chart
- [x] Race calendar with 24 races, expandable details
- [x] Season predictions section with trajectory chart
- [x] Car breakdown section with radar charts and tech specs
- [x] Sidebar navigation with section routing
- [x] F1 editorial design theme (Barlow Condensed + IBM Plex Mono)

## Phase 2: Live Data Integration
- [x] Add tRPC backend routes for F1 API proxy
- [x] Jolpica/Ergast API: driver standings endpoint
- [x] Jolpica/Ergast API: constructor standings endpoint
- [x] Jolpica/Ergast API: race results endpoint (all completed rounds)
- [x] Jolpica/Ergast API: race schedule endpoint
- [x] OpenF1 API: latest session data endpoint
- [x] Replace static driver standings with live API data
- [x] Replace static constructor standings with live API data
- [x] Replace static race results with live API data
- [x] Add loading skeletons for all data-fetching sections
- [x] Add error states with fallback to static data
- [x] Add "Last updated" timestamp indicator
- [x] Add data freshness badge (live vs cached)
- [x] Write vitest tests for API routes (11 tests, all passing)
