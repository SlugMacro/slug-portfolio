---
phase: 03-animation-layer
plan: "01"
subsystem: ui
tags: [motion, framer-motion, react-portal, reduced-motion, a11y, page-transitions]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Animation variants (pageVariants) and AnimatedSection component"
  - phase: 02-layout-content
    provides: "RootLayout with AnimatePresence, ProjectModal component, HomePage"
provides:
  - "MotionConfig global wrapper with reducedMotion='user'"
  - "Page transitions using shared pageVariants"
  - "ScrollRestoration for scroll-to-top on navigation"
  - "prefers-reduced-motion CSS override for scroll-behavior"
  - "ProjectModal rendered via React Portal (escapes stacking context)"
  - "motion package as canonical dependency (replaces direct framer-motion)"
affects: [03-02-PLAN, 03-03-PLAN, 04-polish-distribution]

# Tech tracking
tech-stack:
  added: [motion@12.34.3]
  patterns: [MotionConfig wrapper, React Portal for modals, as-const for motion ease types]

key-files:
  created: []
  modified:
    - src/components/layout/RootLayout.tsx
    - src/index.css
    - src/components/home/ProjectModal.tsx
    - src/lib/animations.ts
    - package.json

key-decisions:
  - "Installed motion package as direct dependency; framer-motion kept as transitive dep only"
  - "Used as const on ease string literals to satisfy motion package stricter Easing types"

patterns-established:
  - "MotionConfig reducedMotion='user' wraps entire app for global a11y"
  - "React Portal pattern for modals that must escape animation stacking contexts"
  - "All animation imports use motion/react, never framer-motion directly"

requirements-completed: [ANIM-03, ANIM-07, ANIM-08]

# Metrics
duration: 4min
completed: 2026-03-02
---

# Phase 3 Plan 01: Animation Infrastructure Summary

**MotionConfig global wrapper with page transitions, reduced-motion a11y, and Portal modal rendering via motion/react**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-02T08:41:05Z
- **Completed:** 2026-03-02T08:45:01Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- RootLayout migrated to motion/react with MotionConfig reducedMotion="user" wrapping entire app
- Page transitions use shared pageVariants from animations.ts with AnimatePresence mode="wait"
- ScrollRestoration added for automatic scroll-to-top on route changes
- CSS prefers-reduced-motion override disables smooth scroll for a11y users
- ProjectModal renders via React Portal to document.body, escaping page transition stacking context

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix RootLayout imports, add MotionConfig and ScrollRestoration, use pageVariants** - `2827f80` (feat)
2. **Task 2: Move ProjectModal to React Portal** - `f59d66a` (feat)
3. **Deviation fix: Install motion package, fix ease type widening** - `f270729` (fix)

## Files Created/Modified
- `src/components/layout/RootLayout.tsx` - MotionConfig wrapper, pageVariants, ScrollRestoration, motion/react imports
- `src/index.css` - prefers-reduced-motion media query for scroll-behavior override
- `src/components/home/ProjectModal.tsx` - React Portal rendering via createPortal to document.body
- `src/lib/animations.ts` - Added `as const` to ease values for stricter motion types
- `package.json` - Added motion@12.34.3, removed direct framer-motion dep

## Decisions Made
- **Installed motion package as direct dependency:** The `motion/react` import path requires the `motion` package (not just `framer-motion`). `framer-motion` is now a transitive dependency brought in by `motion`. This aligns with the motion v12 migration path.
- **Used `as const` for ease string literals:** The `motion` package's stricter `Easing` type requires literal string types, not `string`. Adding `as const` to `"easeOut"` values in animation variants preserves the literal type and satisfies TypeScript's type checker in `tsc -b` build mode.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed motion package for motion/react imports**
- **Found during:** Overall verification (build step)
- **Issue:** `tsc -b` (used by `pnpm build`) failed with "Cannot find module 'motion/react'" because only `framer-motion` was installed as a direct dependency, and it doesn't export the `motion/react` subpath
- **Fix:** Ran `pnpm add motion` to install the `motion` package, then `pnpm remove framer-motion` since `motion` brings it as a transitive dependency
- **Files modified:** package.json, pnpm-lock.yaml
- **Verification:** `pnpm build` passes
- **Committed in:** `f270729`

**2. [Rule 1 - Bug] Fixed ease type widening in animation variants**
- **Found during:** Overall verification (build step, after fixing motion/react import)
- **Issue:** `ease: "easeOut"` in animations.ts was inferred as `string` (not the literal `"easeOut"`), causing type error with `motion` package's stricter `Easing` type union
- **Fix:** Added `as const` to all ease string values in animations.ts
- **Files modified:** src/lib/animations.ts
- **Verification:** `pnpm build` passes with zero type errors
- **Committed in:** `f270729`

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes were necessary for the build to pass. The motion package installation was required for the `motion/react` import path. The ease type fix was a pre-existing latent issue exposed by the motion package's stricter types. No scope creep.

## Issues Encountered
- `pnpm exec tsc --noEmit` passes but `tsc -b` (project references mode used by `pnpm build`) fails -- the build-mode compiler resolves modules differently. Both needed to pass for verification.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- MotionConfig and page transitions are in place for all subsequent animation plans
- Plan 03-02 (staggered scroll-reveal, hero parallax) can proceed immediately
- Plan 03-03 (hover micro-interactions) can proceed independently
- All animation imports now consistently use `motion/react`

## Self-Check: PASSED

All files verified present. All commit hashes verified in git log.

---
*Phase: 03-animation-layer*
*Completed: 2026-03-02*
