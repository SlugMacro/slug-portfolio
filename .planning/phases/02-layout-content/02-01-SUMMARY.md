---
phase: 02-layout-content
plan: "01"
subsystem: ui
tags: [react-markdown, remark-gfm, tailwindcss-typography, content-pipeline, migration, scroll-lock]

# Dependency graph
requires:
  - phase: 01-03
    provides: "Content pipeline (loader.ts, markdown.ts) with Zod-validated ParsedProject[] and getProject()"
  - phase: 01-02
    provides: "useScrollLock hook for reference-counted scroll locking"
provides:
  - "Home page components consuming markdown content pipeline data (ProjectGrid, ProjectCard, ProjectModal, HomePage)"
  - "Typography plugin activated for prose rendering"
  - "react-markdown and remark-gfm installed for markdown rendering"
  - "All scroll lock writes centralized through useScrollLock hook"
affects:
  - "Phase 02 plans that render markdown body content (CaseStudyPage)"
  - "Phase 02 plans that use prose/typography classes"
  - "Phase 03 animation layer (ProjectModal already uses motion/react)"

# Tech tracking
tech-stack:
  added: [react-markdown, remark-gfm, "@tailwindcss/typography"]
  patterns:
    - "Content loader as single data source: all components import from @/content/loader, not static data files"
    - "ParsedProject.meta property access pattern: project.meta.slug, project.meta.title, etc."
    - "useScrollLock hook replaces all direct document.body.style.overflow writes in components"

key-files:
  created: []
  modified:
    - src/index.css
    - src/pages/HomePage.tsx
    - src/components/home/ProjectGrid.tsx
    - src/components/home/ProjectCard.tsx
    - src/components/home/ProjectModal.tsx
    - package.json
    - pnpm-lock.yaml

key-decisions:
  - "Passed full ParsedProject to ProjectModal (not just ProjectMeta) to enable body content rendering in Plan 02"
  - "Removed HomePage scroll lock entirely (was setTimeout-based loading animation) -- no loading animation exists yet (Phase 3)"
  - "Updated ProjectModal to import from motion/react (standardized per Phase 1 decision)"
  - "ProjectModal Year field now uses project.meta.year instead of hardcoded '2025'"

patterns-established:
  - "Content migration pattern: import from @/content/loader, access .meta for frontmatter fields, .body for markdown content"
  - "Scroll lock delegation: components delegate scroll locking to useScrollLock(boolean) instead of direct DOM manipulation"

requirements-completed: [LAYO-01, LAYO-03, LAYO-04, CONT-01, CONT-03]

# Metrics
duration: 2min
completed: 2026-03-02
---

# Phase 2 Plan 1: Home Page Content Migration Summary

**Installed react-markdown + typography plugin, migrated all home page components from static TypeScript data to Zod-validated markdown content pipeline with centralized scroll lock**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-02T07:36:57Z
- **Completed:** 2026-03-02T07:39:14Z
- **Tasks:** 2
- **Files modified:** 7 modified, 1 deleted

## Accomplishments

- Installed react-markdown, remark-gfm, and @tailwindcss/typography -- rendering foundation for Phase 2 prose content
- Migrated ProjectGrid, ProjectCard, ProjectModal, and HomePage from src/data/projects.ts to src/content/loader.ts markdown pipeline
- Replaced all direct document.body.style.overflow writes with useScrollLock hook in both ProjectModal and HomePage
- Deleted src/data/projects.ts -- single source of truth is now the markdown content pipeline

## Task Commits

Each task was committed atomically:

1. **Task 1: Install packages and activate typography plugin** - `7d47232` (chore)
2. **Task 2: Migrate home page components to content loader data** - `40db828` (feat)

## Files Created/Modified

- `package.json` -- Added react-markdown, remark-gfm, @tailwindcss/typography dependencies
- `pnpm-lock.yaml` -- Updated lockfile with 101 new packages
- `src/index.css` -- Added `@plugin "@tailwindcss/typography"` after tailwindcss import
- `src/components/home/ProjectCard.tsx` -- Import ProjectMeta from @/lib/markdown instead of Project from @/data/projects
- `src/components/home/ProjectGrid.tsx` -- Import projects from @/content/loader, access project.meta.* properties
- `src/components/home/ProjectModal.tsx` -- Use ParsedProject type, motion/react import, useScrollLock hook, project.meta.* access
- `src/pages/HomePage.tsx` -- Import from content loader, removed scroll lock state and setTimeout pattern
- `src/data/projects.ts` -- DELETED (replaced by content pipeline)

## Decisions Made

- **Passed full ParsedProject to ProjectModal** (not just ProjectMeta) -- ProjectModal will need access to `project.body` for rendering markdown content in Plan 02, so keeping the full object avoids a second migration.
- **Removed HomePage scroll lock entirely** -- The original pattern was a `useState(true)` + `setTimeout(900ms)` for a loading animation that doesn't exist yet. The plan correctly identified this should be removed; Phase 3 will implement proper loading animations.
- **Standardized ProjectModal motion import** -- Changed `framer-motion` import to `motion/react` per Phase 1 architecture decision.
- **Fixed hardcoded year in ProjectModal** -- The original code had `2025` hardcoded; updated to use `project.meta.year` from frontmatter data.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed hardcoded year in ProjectModal**
- **Found during:** Task 2 (ProjectModal migration)
- **Issue:** Line 103 had hardcoded `2025` instead of using `project.year`
- **Fix:** Changed to `{project.meta.year}` to use frontmatter data
- **Files modified:** src/components/home/ProjectModal.tsx
- **Verification:** TypeScript compiles, year displays from data
- **Committed in:** 40db828 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Minor data correctness fix. No scope creep.

## Issues Encountered

None -- all packages installed without peer dependency issues, all type migrations were straightforward.

## User Setup Required

None -- no external service configuration required.

## Next Phase Readiness

- Typography plugin activated and ready for `prose` class rendering in CaseStudyPage (Plan 02-02)
- react-markdown and remark-gfm installed for markdown body rendering
- All home page components now consume from content pipeline -- Plan 02 can build on this foundation
- ProjectModal already accepts ParsedProject with `.body` field ready for markdown rendering

---

## Self-Check: PASSED

All files confirmed on disk:
- FOUND: src/index.css, src/pages/HomePage.tsx, src/components/home/ProjectGrid.tsx
- FOUND: src/components/home/ProjectCard.tsx, src/components/home/ProjectModal.tsx
- FOUND: src/hooks/useScrollLock.ts, src/content/loader.ts, src/lib/markdown.ts
- CONFIRMED DELETED: src/data/projects.ts

All commits confirmed in git log:
- 7d47232: chore(02-01): install react-markdown, remark-gfm, typography plugin
- 40db828: feat(02-01): migrate home page components to markdown content pipeline

TypeScript: zero errors (pnpm exec tsc --noEmit clean)
No imports from @/data/projects remain
No direct document.body.style.overflow writes in components

*Phase: 02-layout-content*
*Completed: 2026-03-02*
