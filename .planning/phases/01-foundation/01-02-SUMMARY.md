---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [framer-motion, animation, react, typescript, scroll-lock]

# Dependency graph
requires: []
provides:
  - "src/lib/animations.ts: fadeUp, fadeIn, staggerContainer, cardVariants, pageVariants variant constants"
  - "src/components/common/AnimatedSection.tsx: scroll-reveal animation wrapper component"
  - "src/hooks/useScrollLock.ts: reference-counted scroll lock hook"
affects:
  - 02-layout-content
  - 03-animation-layer

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "motion/react import path (framer-motion v12 forward-compatible)"
    - "whileInView with viewport.once:true prevents replay on scroll-back"
    - "Reference-counted scroll lock via module-level counter"
    - "Pure variant objects as single source of truth for animation timing"

key-files:
  created:
    - src/lib/animations.ts
    - src/components/common/AnimatedSection.tsx
    - src/hooks/useScrollLock.ts
  modified: []

key-decisions:
  - "Only animate transform (y) + opacity — never width/height/padding to avoid jank"
  - "pageVariants uses initial/animate/exit naming for AnimatePresence; fadeUp/fadeIn use hidden/visible for whileInView"
  - "viewport.once:true on all whileInView animations prevents replay on scroll-back"
  - "viewport.margin -80px triggers animation before element enters viewport for better UX"
  - "Module-level lockCount object (not primitive) survives HMR and component remounts"
  - "Reference counting allows multiple consumers to lock scroll simultaneously without race condition"

patterns-established:
  - "Animation imports: import from src/lib/animations.ts, not inline variant objects"
  - "Scroll lock: use useScrollLock hook, never write document.body.style.overflow directly"
  - "motion/react: always import from 'motion/react' not 'framer-motion'"

requirements-completed: [ARCH-05, ARCH-06]

# Metrics
duration: 1min
completed: 2026-03-02
---

# Phase 1 Plan 02: Animation Infrastructure Summary

**Framer Motion variant library (5 constants), AnimatedSection scroll-reveal wrapper, and reference-counted useScrollLock hook replacing v1's race-condition-prone setTimeout pattern**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-03-02T07:00:49Z
- **Completed:** 2026-03-02T07:01:37Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created `src/lib/animations.ts` with 5 named variant constants (fadeUp, fadeIn, staggerContainer, cardVariants, pageVariants) as single source of truth for all animation timing
- Created `AnimatedSection` component wrapping children in `motion.div` with `whileInView` and `viewport={{ once: true }}`
- Created `useScrollLock` hook with module-level reference counting, replacing v1's direct DOM manipulation race condition

## Task Commits

Each task was committed atomically:

1. **Task 1: Create shared animation variants** - `8a75afd` (feat)
2. **Task 2: Create AnimatedSection component and useScrollLock hook** - `d0daecb` (feat)

## Files Created/Modified
- `src/lib/animations.ts` - Five Framer Motion variant constants for consistent animation timing across the app
- `src/components/common/AnimatedSection.tsx` - Reusable scroll-reveal wrapper with whileInView, once:true, and -80px margin
- `src/hooks/useScrollLock.ts` - Reference-counted scroll lock preventing race conditions when multiple consumers lock simultaneously

## Decisions Made
- Used `motion/react` import path (not `framer-motion`) — forward-compatible with Framer Motion v12
- `pageVariants` uses `initial/animate/exit` naming for AnimatePresence; `fadeUp`/`fadeIn` use `hidden/visible` for whileInView
- `viewport.once: true` on AnimatedSection prevents animation replay on scroll-back (per STATE.md architecture decision)
- Module-level `lockCount` object (not primitive) survives HMR and component remounts
- Reference counting allows multiple consumers (e.g., modal + drawer) to lock scroll simultaneously without releasing early

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Animation infrastructure complete and ready for Phase 3 (Animation Layer) to consume
- `AnimatedSection` can be immediately wrapped around any section element
- `useScrollLock` will be integrated into `ProjectModal` in Phase 2 (Layout & Content)
- No blockers

---
*Phase: 01-foundation*
*Completed: 2026-03-02*
