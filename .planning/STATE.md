---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
current_phase: Phase 3 (Animation Layer) — in progress
current_plan: 03-01 (complete)
status: in_progress
stopped_at: Completed 03-01-PLAN.md — animation infrastructure (MotionConfig, page transitions, Portal modal)
last_updated: "2026-03-02T08:45:01Z"
progress:
  total_phases: 4
  completed_phases: 2
  total_plans: 10
  completed_plans: 8
  percent: 80
---

# Project State: Slug Portfolio v2

**Last updated:** 2026-03-02
**Session:** Execute phase 03-animation-layer, plan 01

---

## Project Reference

**Core value:** Present Slug Macro's work clearly and beautifully — premium layout, fluid animations, easy-to-update content.

**Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS v4 + React Router v7 + Framer Motion v12 + pnpm

**Key constraint:** Brownfield rebuild — v1 lives on `v1-backup` branch. Main branch is the clean v2 target.

---

## Current Position

**Current phase:** Phase 3 (Animation Layer) — in progress
**Current plan:** 03-01 (complete)
**Status:** In progress

**Progress:**
[████████░░] 80% (8/10 plans complete)
Phase 1 [Foundation]          [x] Complete (3/3 plans done)
  [x] 01-01 Theme, packages, folder structure
  [x] 01-02 Animation variants, AnimatedSection, useScrollLock
  [x] 01-03 Markdown content pipeline
Phase 2 [Layout & Content]    [x] Complete (4/4 plans done)
  [x] 02-01 Install packages, migrate home page to content loader
  [x] 02-02 CaseStudyPage with markdown rendering
  [x] 02-03 AboutPage migration, Formspree contact form
  [x] 02-04 Responsive audit
Phase 3 [Animation Layer]     [ ] In progress (1/3 plans done)
  [x] 03-01 Animation infrastructure (MotionConfig, page transitions, Portal modal)
  [ ] 03-02 Staggered scroll-reveal, hero parallax
  [ ] 03-03 Hover micro-interactions
Phase 4 [Polish & Distribution] [ ] Not started

**Overall:** ~80% complete (Phases 1-2 done, Phase 3 in progress)

---

## Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Requirements mapped | 38/38 | 38/38 |
| Phases complete | 4 | 2 |
| Plans complete | TBD | 8 |

---
| Phase 01-foundation P01 | 1 | 2 tasks | 4 files |
| Phase 02-layout-content P01 | 2min | 2 tasks | 8 files |
| Phase 02-layout-content P02 | 2min | 2 tasks | 6 files |
| Phase 02-layout-content P03 | 2min | 2 tasks | 4 files |
| Phase 02-layout-content P04 | 2min | 1 task | 8 files |
| Phase 03-animation-layer P01 | 4min | 2 tasks | 5 files |

## Accumulated Context

### Architecture Decisions

- **Content system:** IMPLEMENTED — `gray-matter` + Vite `?raw` imports + manual `Zod.parse()` at `src/content/loader.ts`. `zod-matter` not used (exports `parse()` not `matter()`). Explicit per-file imports for intentional grid order.
- **Contact data:** TypeScript file (not markdown) at `src/data/contact.ts` — pure structured data with no prose body. formspreeEndpoint is a placeholder; user updates in Phase 2.
- **Animation imports:** IMPLEMENTED — All imports use `"motion/react"`. `motion` package installed as direct dependency; `framer-motion` is transitive only. Completed in Plan 03-01.
- **AnimatePresence pattern:** Use `useOutlet()` + `React.cloneElement(element, { key: location.pathname })` with `mode="wait"`. Must be set up at Phase 3 start before per-page animations.
- **Modal rendering:** IMPLEMENTED — `ProjectModal` renders via React Portal to `document.body`. Completed in Plan 03-01.
- **Scroll lock:** IMPLEMENTED — centralized `useScrollLock` hook (reference-counted) at `src/hooks/useScrollLock.ts`. Eliminates all direct `document.body.style.overflow` writes.
- **Animation properties:** Only animate `transform` + `opacity`. Never animate `width`, `height`, `padding`, `left`, `top` — causes jank.
- **whileInView:** Use `viewport={{ once: true }}` on all `whileInView` animations to prevent replay on scroll-back.
- **Animation variants:** IMPLEMENTED — single source of truth at `src/lib/animations.ts` (fadeUp, fadeIn, staggerContainer, cardVariants, pageVariants).
- **AnimatedSection:** IMPLEMENTED — reusable scroll-reveal wrapper at `src/components/common/AnimatedSection.tsx`.
- **pageVariants naming:** `initial/animate/exit` naming for AnimatePresence; `hidden/visible` for whileInView — different because different Framer Motion APIs expect different key names.
- **Grid isolation:** Apply `isolation: isolate` to the grid container. Keep the fixed hero element outside the animation tree.
- **React keys:** Use `project.meta.slug` as key on project cards. Never use array index.
- **Content migration pattern:** All components import from `@/content/loader`, access `.meta` for frontmatter fields. Old `src/data/projects.ts` deleted.
- **ProjectModal data shape:** Receives full `ParsedProject` (not just `ProjectMeta`) to enable body content rendering in future plans.
- **Typography plugin:** Activated via `@plugin "@tailwindcss/typography"` in `src/index.css`. Prose classes available for markdown rendering.
- **Tailwind v4 borders:** Always write explicit border color classes. `border` alone defaults to `currentColor` (not gray-200 like v3).
- **Tailwind v4 layers:** ALL global resets and base rules go inside `@layer base {}`. Unlayered CSS beats all utilities.
- **Prose styling:** Use `prose` (not `prose-invert`) for markdown rendering — dark theme uses custom Tailwind color tokens via prose modifier classes. `prose-invert` would conflict.
- **Route code splitting:** CaseStudyPage uses `React.lazy()` + `React.Suspense` with `fallback={null}` — no loading spinner needed for bundled code-split chunks.
- **Navbar active state:** "Case studies" nav item is active when `pathname === "/"` OR `pathname.startsWith("/case-studies")` to cover all case study sub-routes.
- **Grid breakpoint at lg: not md:** Moved ProjectGrid and Hero breakpoints from `md:` (768px) to `lg:` (1024px). At 768px the 2-column staggered grid with 25% hero offset was too cramped (~287px per column). Tablet now shows single-column layout. Phase 3 animations should respect this.
- **Touch target minimum:** All interactive elements use `min-h-[44px]` for mobile touch friendliness. Pattern: `min-h-[44px] py-3` on form inputs, buttons, and important links.
- **MotionConfig wrapper:** `<MotionConfig reducedMotion="user">` wraps the entire app in RootLayout. All Framer Motion components automatically respect `prefers-reduced-motion`.
- **motion package vs framer-motion:** `motion@12.34.3` is the direct dependency; `framer-motion` is kept only as a transitive dependency. Import from `"motion/react"`, never `"framer-motion"`.
- **Ease type literals:** Use `as const` on string-valued `ease` properties in animation variants (e.g., `ease: "easeOut" as const`). The `motion` package's `Easing` type is stricter than `framer-motion`'s and rejects widened `string`.

### Known Risks (from research)

1. AnimatePresence exit animations break with `<Outlet>` — prevention: `useOutlet()` pattern (address at Phase 3 start)
2. Unlayered CSS overrides all Tailwind v4 utilities — prevention: enforce `@layer base` from Phase 1
3. Framer Motion opacity creates stacking contexts breaking modal z-index — RESOLVED: ProjectModal renders via React Portal to document.body (Plan 03-01)
4. `gray-matter` returns `any`, frontmatter errors fail silently — RESOLVED: Zod validation at parse time implemented in Plan 01-03 (`ProjectSchema.parse(data)` throws ZodError if invalid)
5. Scroll lock race condition from v1's `setTimeout(900ms)` — RESOLVED: centralized `useScrollLock` implemented (Plan 01-02)

### Open Questions

- ~~Tailwind typography plugin v4 compatibility~~ RESOLVED: Used `prose` (not `prose-invert`) with custom color tokens via prose modifier classes. Works correctly with dark theme.
- OG tag implementation approach for Phase 4: neither `react-helmet` nor Vite HTML plugin deeply researched. Verify before committing to one approach.

### Todos

- [x] Confirm whether `react-markdown` v10 peer dep warning needs `--legacy-peer-deps` or `pnpm.overrides` workaround (Phase 2) — RESOLVED: pnpm installed without peer dep issues
- [ ] Verify `React.lazy()` on `CaseStudyPage` splits markdown content out of main bundle (`pnpm build` inspection) during Phase 4

---

## Session Continuity

### How to Resume

1. Read this STATE.md file first
2. Read `.planning/ROADMAP.md` for phase structure
3. Check which phase is current (see "Current Position" above)
4. Continue with Phase 3, Plan 02 (staggered scroll-reveal, hero parallax)

**Stopped at:** Completed 03-01-PLAN.md — animation infrastructure (MotionConfig, page transitions, Portal modal). Continue with 03-02.

### File Index

| File | Purpose |
|------|---------|
| `.planning/PROJECT.md` | Project context, constraints, decisions |
| `.planning/REQUIREMENTS.md` | All v1 requirements with IDs |
| `.planning/ROADMAP.md` | Phase structure with success criteria |
| `.planning/STATE.md` | This file — project memory |
| `.planning/research/SUMMARY.md` | Research findings (stack, features, architecture, pitfalls) |
| `.planning/config.json` | Depth (comprehensive), mode (yolo), parallelization |

---

*State initialized: 2026-03-02*
