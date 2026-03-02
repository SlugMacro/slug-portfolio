---
phase: 03-animation-layer
plan: "02"
subsystem: ui
tags: [motion, scroll-reveal, parallax, useScroll, useTransform, stagger, whileInView]

# Dependency graph
requires:
  - phase: 03-animation-layer/01
    provides: "MotionConfig wrapper, animations.ts variants (staggerContainer, cardVariants), motion/react imports"
  - phase: 02-layout-content
    provides: "ProjectGrid 2-column layout, Hero fixed/mobile structure, content loader"
provides:
  - "Staggered scroll-reveal on project grid (desktop columns + mobile)"
  - "Hero parallax effect with useScroll/useTransform on desktop"
  - "Grid isolation: isolate to prevent z-index leaking"
affects: [03-animation-layer/03, 04-polish-distribution]

# Tech tracking
tech-stack:
  added: []
  patterns: [whileInView-stagger-pattern, useScroll-useTransform-parallax]

key-files:
  created: []
  modified:
    - src/components/home/ProjectGrid.tsx
    - src/components/home/Hero.tsx

key-decisions:
  - "viewport amount: 0.05 triggers stagger when 5% visible -- responsive without waiting too long"
  - "Hero parallax maps scroll [0,600] to translateY [0,-100] (1:6 ratio) for subtle depth without disorientation"
  - "Hero opacity fades to 0.3 over 400px scroll to prevent text showing through grid cards"

patterns-established:
  - "whileInView stagger: motion.div with staggerContainer variants wraps children with cardVariants"
  - "Parallax: useScroll() + useTransform() on fixed elements, applied via motion.div style prop"
  - "Grid isolation: isolate class on grid container prevents animated stacking context leaks"

requirements-completed: [ANIM-01, ANIM-02, ANIM-04]

# Metrics
duration: 2min
completed: 2026-03-02
---

# Phase 3 Plan 02: Scroll-Reveal & Parallax Summary

**Staggered scroll-reveal on project grid cards with whileInView + hero parallax via useScroll/useTransform**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-02T08:48:47Z
- **Completed:** 2026-03-02T08:50:15Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Project cards fade and slide up in sequence as they scroll into view (staggered, not all at once)
- Hero text drifts upward and fades on desktop scroll, creating parallax depth
- All animations fire once only (viewport once: true) -- no replay on scroll-back
- Mobile/tablet hero remains static with no parallax
- Grid container uses isolation: isolate to prevent z-index conflicts with the fixed hero

## Task Commits

Each task was committed atomically:

1. **Task 1: Add staggered scroll-reveal animations to ProjectGrid** - `dba05e4` (feat)
2. **Task 2: Add hero parallax effect using useScroll and useTransform** - `b3a451a` (feat)

## Files Created/Modified
- `src/components/home/ProjectGrid.tsx` - Added motion.div stagger containers on desktop left/right columns and mobile column, wrapped each card in motion.div with cardVariants, added isolate class
- `src/components/home/Hero.tsx` - Added useScroll/useTransform parallax on desktop fixed hero, converted to motion.div with y and opacity motion values

## Decisions Made
- Used `viewport={{ once: true, amount: 0.05 }}` on all stagger containers -- 5% visibility threshold triggers animation responsively without delay, once: true prevents replay
- Hero parallax maps scroll range [0, 600] to translateY [0, -100] for a 1:6 ratio -- subtle depth without disorientation
- Hero opacity fades from 1 to 0.3 over 400px scroll -- prevents hero text from being fully visible behind the grid
- Mobile/tablet hero left untouched -- parallax on a static in-flow element would feel broken

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Scroll-reveal and parallax complete; ready for Plan 03-03 (hover micro-interactions on cards and nav items)
- All animation imports use "motion/react" consistently
- Grid isolation prevents any stacking context issues for hover effects

## Self-Check: PASSED

- [x] `src/components/home/ProjectGrid.tsx` exists
- [x] `src/components/home/Hero.tsx` exists
- [x] `03-02-SUMMARY.md` exists
- [x] Commit `dba05e4` found in git log
- [x] Commit `b3a451a` found in git log
- [x] `pnpm exec tsc --noEmit` passes
- [x] `pnpm build` passes

---
*Phase: 03-animation-layer*
*Completed: 2026-03-02*
