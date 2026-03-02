---
phase: 02-layout-content
plan: "02"
subsystem: ui
tags: [react-markdown, remark-gfm, prose-typography, case-study, lazy-loading, routing]

# Dependency graph
requires:
  - phase: 02-01
    provides: "Home page components on markdown pipeline, react-markdown + remark-gfm installed, typography plugin active"
  - phase: 01-03
    provides: "Content pipeline (loader.ts, markdown.ts) with getProject(slug) lookup"
provides:
  - "CaseStudyPage at /case-studies/:slug rendering full markdown body with prose typography"
  - "CaseStudyHeader component for project metadata display (tags, title, subtitle, year, role)"
  - "CaseStudyContent component for react-markdown body rendering with prose styling"
  - "Lazy-loaded route via React.lazy + Suspense for code splitting"
  - "Navbar active state covering case study routes"
  - "ProjectModal 'View full case study' link bridging modal to full page"
affects:
  - "Phase 02 plans that add pages or routes (AboutPage, ContactPage migration)"
  - "Phase 03 animation layer (page transitions for case study route)"
  - "Phase 04 polish (SEO, OG tags for case study pages)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "React.lazy + Suspense for route-level code splitting"
    - "Navigate component for invalid slug redirects"
    - "Prose class composition for dark theme markdown rendering"

key-files:
  created:
    - src/components/case-study/CaseStudyContent.tsx
    - src/components/case-study/CaseStudyHeader.tsx
    - src/pages/CaseStudyPage.tsx
  modified:
    - src/router.tsx
    - src/components/layout/Navbar.tsx
    - src/components/home/ProjectModal.tsx

key-decisions:
  - "Used prose (not prose-invert) for markdown styling -- theme uses custom text color tokens, prose-invert would conflict"
  - "Lazy-loaded CaseStudyPage with React.Suspense fallback={null} -- no spinner needed for code-split bundle"
  - "Navbar active state uses startsWith('/case-studies') to cover all case study sub-routes"

patterns-established:
  - "Case study component structure: CaseStudyHeader (metadata) + CaseStudyContent (markdown body) composed in CaseStudyPage"
  - "Route-level code splitting: React.lazy(() => import()) with Suspense wrapper in router children"
  - "Invalid route handling: Navigate to='/' replace for unknown slugs"

requirements-completed: [LAYO-02, LAYO-06, CONT-02]

# Metrics
duration: 2min
completed: 2026-03-02
---

# Phase 2 Plan 2: Case Study Page with Markdown Rendering Summary

**Full case study page at /case-studies/:slug with react-markdown prose rendering, lazy-loaded routing, navbar active state, and modal-to-page linking**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-02T07:43:28Z
- **Completed:** 2026-03-02T07:45:15Z
- **Tasks:** 2
- **Files modified:** 6 (3 created, 3 modified)

## Accomplishments

- Built CaseStudyPage rendering full markdown body content with proper typography via prose classes
- Added lazy-loaded route at /case-studies/:slug with React.Suspense code splitting
- Extended Navbar active state to highlight "Case studies" on all case study routes
- Added "View full case study" link in ProjectModal bridging quick-look modal to full page

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CaseStudyContent and CaseStudyHeader components** - `c29bbf5` (feat)
2. **Task 2: Build CaseStudyPage, add route, update Navbar and ProjectModal** - `8667e53` (feat)

## Files Created/Modified

- `src/components/case-study/CaseStudyContent.tsx` -- Markdown body renderer using react-markdown with remark-gfm, prose-lg styling with dark theme color tokens
- `src/components/case-study/CaseStudyHeader.tsx` -- Project metadata header with tags, title, subtitle, year/role metadata row
- `src/pages/CaseStudyPage.tsx` -- Case study page composing Header + Content, with useParams slug lookup and Navigate redirect for invalid slugs
- `src/router.tsx` -- Added React.lazy import for CaseStudyPage with Suspense wrapper, route at case-studies/:slug
- `src/components/layout/Navbar.tsx` -- Updated isActive logic to include /case-studies routes for "Case studies" nav item
- `src/components/home/ProjectModal.tsx` -- Added Link import and "View full case study" link with onClose handler

## Decisions Made

- **Used `prose` (not `prose-invert`) for markdown styling** -- The dark theme uses custom Tailwind color tokens (text-text-primary, text-text-secondary) applied via prose modifier classes. Using prose-invert would apply its own color overrides that conflict with the theme tokens.
- **Lazy-loaded CaseStudyPage with `fallback={null}`** -- Since content is bundled via Vite raw imports (not fetched at runtime), the code-split chunk loads near-instantly. A loading spinner would flash unnecessarily.
- **Navbar active check uses `startsWith('/case-studies')`** -- Covers all case study slugs without needing to enumerate them. The "/" home route uses exact match to avoid false positives.

## Deviations from Plan

None -- plan executed exactly as written.

## Issues Encountered

None -- all packages pre-installed from Plan 02-01, TypeScript compiles cleanly, all patterns matched expectations.

## User Setup Required

None -- no external service configuration required.

## Next Phase Readiness

- Case study reading experience complete -- users can navigate from modal to full page
- Route structure ready for Phase 03 page transition animations (AnimatePresence on route changes)
- Prose styling established as pattern for any future markdown content pages
- Ready for Plan 02-03 (AboutPage migration, Formspree contact form)

---

## Self-Check: PASSED

All files confirmed on disk:
- FOUND: src/components/case-study/CaseStudyContent.tsx
- FOUND: src/components/case-study/CaseStudyHeader.tsx
- FOUND: src/pages/CaseStudyPage.tsx
- FOUND: src/router.tsx
- FOUND: src/components/layout/Navbar.tsx
- FOUND: src/components/home/ProjectModal.tsx

All commits confirmed in git log:
- c29bbf5: feat(02-02): create CaseStudyContent and CaseStudyHeader components
- 8667e53: feat(02-02): add case study route, page, navbar active state, and modal link

TypeScript: zero errors (pnpm exec tsc --noEmit clean)

*Phase: 02-layout-content*
*Completed: 2026-03-02*
