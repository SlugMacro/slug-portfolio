# Phase 3: Animation Layer - Research

**Researched:** 2026-03-02
**Domain:** Framer Motion (motion/react) scroll animations, page transitions, parallax, accessibility
**Confidence:** HIGH

## Summary

Phase 3 layers Framer Motion animations onto the fully-built content pages from Phase 2. The project already has `framer-motion` v12.34.3 installed (npm package name `framer-motion`, import path `motion/react`), with animation variants defined at `src/lib/animations.ts`, an `AnimatedSection` wrapper component, and a `useScrollLock` hook. The codebase has two existing Framer Motion integration points: `RootLayout.tsx` (page transitions via `AnimatePresence`) and `ProjectModal.tsx` (modal enter/exit).

The core work divides into five concerns: (1) fix the RootLayout import path and page transition pattern, (2) wire scroll-reveal stagger animations on the project grid, (3) add hero parallax via `useScroll` + `useTransform`, (4) add hover micro-interactions on cards and nav, and (5) implement `prefers-reduced-motion` support globally via `MotionConfig`. A critical prerequisite is fixing the `scroll-behavior: smooth` CSS rule in `index.css` which will conflict with page transition scroll resets.

The technical risk is LOW. All APIs needed are stable, well-documented parts of Motion v12. The `AnimatePresence` + React Router pattern is the one area with known footguns, but the current codebase already has a mostly-correct implementation (keyed `motion.main` wrapper) that needs only import cleanup and scroll-to-top handling. No new packages are needed.

**Primary recommendation:** Use `MotionConfig reducedMotion="user"` at the app root to globally respect reduced motion preferences, fix the `"framer-motion"` import to `"motion/react"` in RootLayout, and implement scroll-to-top on route change with `behavior: "instant"` to avoid conflicts with CSS smooth scroll.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ANIM-01 | Scroll-driven fade-in/slide-up on project cards as they enter viewport | `whileInView` + `fadeUp` variants already defined in `animations.ts`; apply to `ProjectCard` with `viewport={{ once: true }}` |
| ANIM-02 | Staggered grid animation -- cards enter in sequence, not all at once | `staggerContainer` variant already defined; apply to `ProjectGrid` columns as parent, `cardVariants` on each card child |
| ANIM-03 | Page transition animations between routes (fade/slide with AnimatePresence) | `pageVariants` already defined; RootLayout already has `AnimatePresence mode="wait"` with keyed `motion.main`; needs import fix + scroll-to-top |
| ANIM-04 | Hero parallax effect using useScroll + useTransform | `useScroll({ target: ref })` on page container + `useTransform(scrollY, range, range)` on hero text; fixed hero needs `useMotionValueEvent` or page-level scroll tracking |
| ANIM-05 | Hover micro-interactions on project cards (scale, shadow, arrow reveal) | `whileHover` prop on `motion.button` wrapping card; arrow already has CSS `group-hover:opacity-100` -- enhance with Framer scale + shadow |
| ANIM-06 | Hover micro-interactions on nav items (color transition, subtle movement) | Nav items already have `transition-colors duration-300`; add subtle `motion.div` whileHover for scale/translate micro-interaction |
| ANIM-07 | Respect `prefers-reduced-motion` -- disable animations for users who prefer reduced motion | `MotionConfig reducedMotion="user"` at app root disables transform/layout animations globally; CSS `scroll-behavior` needs `@media (prefers-reduced-motion: reduce)` override |
| ANIM-08 | Smooth scroll behavior for in-page navigation | Already set via `scroll-behavior: smooth` in `index.css`; must add `prefers-reduced-motion` media query and handle page transition conflict |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion (motion/react) | ^12.34.3 | All animations: scroll reveal, page transitions, parallax, hover states | Already installed; industry standard for React animation; hardware-accelerated scroll via ScrollTimeline API |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-router-dom | ^7.13.1 | ScrollRestoration, useLocation for page transitions | Already installed; provides scroll-to-top on route change |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Framer Motion whileInView | Intersection Observer API + CSS | Lower-level, no stagger orchestration, more code for same result |
| Framer Motion useScroll parallax | CSS scroll-driven animations | Better perf but limited browser support, no spring smoothing |
| MotionConfig reducedMotion | Manual useReducedMotion per component | MotionConfig is single-line global; manual hook requires per-component wiring |

**Installation:**
```bash
# No new packages needed. Everything is already installed.
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  lib/
    animations.ts        # Shared variants (fadeUp, fadeIn, staggerContainer, cardVariants, pageVariants) -- EXISTS
  hooks/
    useScrollLock.ts     # Reference-counted scroll lock -- EXISTS
  components/
    common/
      AnimatedSection.tsx # Reusable whileInView wrapper -- EXISTS
    layout/
      RootLayout.tsx     # AnimatePresence page transitions + MotionConfig -- MODIFY
    home/
      Hero.tsx           # Add parallax via useScroll + useTransform -- MODIFY
      ProjectCard.tsx    # Add motion.button with whileHover + card variants -- MODIFY
      ProjectGrid.tsx    # Add staggerContainer on columns -- MODIFY
      ProjectModal.tsx   # Already animated -- NO CHANGE
    layout/
      Navbar.tsx         # Add hover micro-interactions -- MODIFY
```

### Pattern 1: Staggered Scroll-Reveal Grid
**What:** Parent `motion.div` with `staggerContainer` variants triggers `whileInView`, children inherit timing
**When to use:** Any list of elements that should animate in sequence on scroll
**Example:**
```typescript
// Source: motion.dev/docs/react-scroll-animations + project's existing animations.ts
import { motion } from "motion/react";
import { staggerContainer, cardVariants } from "@/lib/animations";

// Parent container -- orchestrates stagger timing
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
>
  {projects.map((project) => (
    // Each child -- inherits hidden/visible from parent, animates in sequence
    <motion.div key={project.meta.slug} variants={cardVariants}>
      <ProjectCard project={project.meta} onClick={...} />
    </motion.div>
  ))}
</motion.div>
```

### Pattern 2: Hero Parallax with useScroll + useTransform
**What:** Track page scroll position, map it to a translateY on the fixed hero text so it moves at a different rate
**When to use:** Fixed/sticky hero element that should have depth relative to scrolling content
**Example:**
```typescript
// Source: motion.dev/docs/react-use-scroll, motion.dev/docs/react-use-transform
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

function Hero() {
  const ref = useRef(null);
  // Track page scroll position (not a target element)
  const { scrollY } = useScroll();
  // Map 0-500px of scroll to 0 to -80px translateY on hero text
  const y = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <motion.div
      ref={ref}
      className="fixed top-0 left-0 ..."
      style={{ y }}
    >
      <h1>...</h1>
    </motion.div>
  );
}
```

### Pattern 3: MotionConfig for Global Reduced Motion
**What:** Wrap the entire app in `MotionConfig reducedMotion="user"` to automatically disable transform/layout animations when the user's OS has reduced motion enabled
**When to use:** Always -- at the app root
**Example:**
```typescript
// Source: motion.dev/docs/react-motion-config, motion.dev/docs/react-accessibility
import { MotionConfig } from "motion/react";

// In RootLayout or App wrapper
<MotionConfig reducedMotion="user">
  <div className="min-h-screen ...">
    <Navbar />
    <AnimatePresence mode="wait">
      {/* page content */}
    </AnimatePresence>
  </div>
</MotionConfig>
```
**Behavior when active:** Transform animations (translateY, scale) and layout animations are disabled. Opacity and backgroundColor animations still play. This means fade-in effects still work but slide-up movements are suppressed.

### Pattern 4: Page Transition with AnimatePresence
**What:** Keyed `motion.main` wrapper inside `AnimatePresence mode="wait"` animates route changes
**When to use:** At the RootLayout level wrapping route content
**Example:**
```typescript
// Source: motion.dev docs, react-router-dom discussions
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { pageVariants } from "@/lib/animations";

export default function RootLayout() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen max-w-[1800px] border-r border-border bg-bg">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
            <Footer />
          </motion.main>
        </AnimatePresence>
        <ScrollRestoration />
      </div>
    </MotionConfig>
  );
}
```

### Pattern 5: Hover Micro-Interactions
**What:** Use `whileHover` and `whileTap` on `motion` elements for tactile feedback
**When to use:** Interactive elements like cards and nav items
**Example:**
```typescript
// Source: motion.dev docs
import { motion } from "motion/react";

// Project card with hover scale + shadow
<motion.button
  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="..."
>
  {/* card content */}
</motion.button>
```

### Anti-Patterns to Avoid
- **Animating layout properties:** Never animate `width`, `height`, `padding`, `left`, `top` -- causes layout thrashing and jank. Only animate `transform` + `opacity`.
- **Using `useInView` + `useState` for scroll reveals:** Triggers React re-render storms at scroll time. Use declarative `whileInView` instead.
- **Missing `viewport={{ once: true }}`:** Without `once: true`, animations replay every time the user scrolls back up, which feels broken and wastes GPU cycles.
- **Wrapping the entire page in a motion wrapper for hover effects:** Apply `motion` to the specific interactive element, not an outer container. Otherwise every child re-renders on hover.
- **Using `import from "framer-motion"` instead of `"motion/react"`:** Both work (same package) but the codebase should be consistent. `motion/react` is the v12 canonical import path.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom IntersectionObserver + CSS transitions | Framer Motion `whileInView` + variants | Stagger orchestration, spring physics, reduced-motion handling all built-in |
| Reduced motion detection | Manual `matchMedia("(prefers-reduced-motion: reduce)")` listener | `MotionConfig reducedMotion="user"` | One line vs. 20+; automatically disables transform animations, keeps opacity |
| Page transition animations | Manual CSS `@keyframes` + route change detection | `AnimatePresence mode="wait"` with keyed wrapper | Handles mount/unmount timing, prevents overlapping transitions |
| Parallax scrolling | Manual scroll event listener + requestAnimationFrame | `useScroll` + `useTransform` | GPU-accelerated via ScrollTimeline API, no JS on every frame |
| Scroll-to-top on navigate | Manual `window.scrollTo` in useEffect | `<ScrollRestoration />` from react-router-dom | Handles edge cases (back/forward, hash links), stores positions |

**Key insight:** Framer Motion / Motion v12 provides hardware-accelerated scroll animations via the browser's ScrollTimeline API. Hand-rolling with IntersectionObserver + CSS or scroll event listeners will be both more code and worse performance.

## Common Pitfalls

### Pitfall 1: RootLayout AnimatePresence Exit Animations Silently Fail
**What goes wrong:** The `<Outlet>` component itself never unmounts during route changes -- it just renders different children. If AnimatePresence wraps Outlet directly (without a keyed wrapper), exit animations never fire.
**Why it happens:** AnimatePresence tracks direct children by key. Outlet's key doesn't change.
**How to avoid:** The current codebase already wraps Outlet in a keyed `motion.main` (keyed by `location.pathname`), which is correct. Verify exit animations actually play by navigating between routes.
**Warning signs:** Page transitions show the enter animation but no exit animation; pages snap-cut on leave.
**Current status:** RootLayout already uses this pattern correctly. Just needs import path fix.

### Pitfall 2: CSS scroll-behavior: smooth Conflicts with Page Transitions
**What goes wrong:** `scroll-behavior: smooth` in `index.css` (line 48) causes the browser to animate scroll position changes. When navigating between pages, the scroll-to-top happens smoothly instead of instantly, creating a visible scroll animation during the page transition.
**Why it happens:** CSS smooth scroll applies to ALL scroll position changes, including programmatic `window.scrollTo(0, 0)`.
**How to avoid:** Either (a) remove `scroll-behavior: smooth` from the global `html` rule and handle smooth scrolling only for anchor links via JS, or (b) keep it but use `ScrollRestoration` which handles the timing correctly, or (c) use `window.scrollTo({ top: 0, behavior: "instant" })` explicitly. Also add `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }` for accessibility.
**Warning signs:** Visible page scrolling-to-top during route transitions instead of instant position reset.

### Pitfall 3: Framer Motion Opacity Creates Stacking Contexts Breaking Modal Z-Index
**What goes wrong:** `motion.main` with opacity animation creates a new stacking context. Elements with `z-index: 9999` inside the animated subtree can't escape it.
**Why it happens:** CSS spec -- any element with `opacity < 1` creates a stacking context.
**How to avoid:** `ProjectModal` already renders at `z-index: 9999` in the fixed position. Since it's INSIDE the `motion.main` wrapper (rendered by HomePage), it's affected. Solution: render modal via React Portal to `document.body`, or move modal rendering outside `AnimatePresence`.
**Warning signs:** Modal appears behind the overlay or doesn't appear at all during page transitions.
**Current risk:** MEDIUM -- the modal currently works but could break when page exit animations are properly wired.

### Pitfall 4: Fixed Hero + Grid Stacking Context Conflict
**What goes wrong:** When the project grid has Framer Motion animations (will-change: transform), it creates stacking contexts that can paint over the fixed hero.
**Why it happens:** `will-change: transform` promotes elements to their own compositor layer, creating stacking contexts.
**How to avoid:** Add `isolation: isolate` to the grid container and ensure the hero's z-index is lower than the grid (it should scroll over the hero). The hero is already `z-[1]` and grid is `z-10`, so stacking order is correct. The `isolation: isolate` on the grid prevents animated cards from leaking into the hero's stacking context.
**Warning signs:** Hero text flickers or appears above grid cards during scroll animations.

### Pitfall 5: Inconsistent Import Paths
**What goes wrong:** `RootLayout.tsx` imports from `"framer-motion"` while `AnimatedSection.tsx` and `ProjectModal.tsx` import from `"motion/react"`. Both resolve to the same package but the inconsistency is confusing and could cause issues with tree-shaking.
**Why it happens:** Different files written at different times; `"framer-motion"` is the legacy import, `"motion/react"` is the v12 canonical path.
**How to avoid:** Standardize ALL imports to `"motion/react"` before writing any new animation code. Do this as the first task.
**Warning signs:** Different import paths in the same codebase.

### Pitfall 6: Stagger Animation Fires Before Cards Are Visible
**What goes wrong:** If `staggerContainer` uses `initial="hidden"` + `animate="visible"` (instead of `whileInView`), all cards animate immediately on page mount, not on scroll.
**Why it happens:** `animate` fires on mount; `whileInView` fires on viewport entry. For scroll-reveal stagger, you need `whileInView`.
**How to avoid:** Use `whileInView="visible"` on the stagger parent, not `animate="visible"`.
**Warning signs:** All project cards animate at page load instead of as you scroll down.

## Code Examples

Verified patterns from official sources:

### Staggered Scroll-Reveal for ProjectGrid
```typescript
// Apply to ProjectGrid.tsx -- desktop columns
// Source: motion.dev scroll animations + existing animations.ts variants
import { motion } from "motion/react";
import { staggerContainer, cardVariants } from "@/lib/animations";

// Wrap each column in stagger container
<motion.div
  className="mt-[337px] border-t border-l border-border"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.05 }}
>
  {leftCol.map((project) => (
    <motion.div key={project.meta.slug} variants={cardVariants}>
      <ProjectCard ... />
    </motion.div>
  ))}
</motion.div>
```

### Hero Parallax Transform
```typescript
// Apply to Hero.tsx -- desktop fixed hero only
// Source: motion.dev/docs/react-use-scroll, motion.dev/docs/react-use-transform
import { useScroll, useTransform, motion } from "motion/react";

export default function Hero() {
  const { scrollY } = useScroll();
  // As user scrolls 0-600px, hero text moves up 0-100px (slower than scroll = parallax)
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  // Optional: fade hero text as user scrolls
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <>
      {/* Desktop fixed hero with parallax */}
      <motion.div
        className="fixed top-0 left-0 z-[1] hidden ... lg:flex"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <h1>...</h1>
      </motion.div>
      {/* Mobile hero -- no parallax, stays static */}
      <div className="flex min-h-screen ... lg:hidden">
        ...
      </div>
      <div className="hidden lg:block" style={{ height: "70vh" }} />
    </>
  );
}
```

### MotionConfig Reduced Motion Setup
```typescript
// Apply to RootLayout.tsx -- wraps entire app
// Source: motion.dev/docs/react-motion-config
import { MotionConfig } from "motion/react";

// Wrap the outermost layout div
<MotionConfig reducedMotion="user">
  <div className="min-h-screen max-w-[1800px] ...">
    {/* all content */}
  </div>
</MotionConfig>
```

### CSS Reduced Motion for scroll-behavior
```css
/* Add to index.css -- handles the CSS smooth scroll accessibility */
/* Source: MDN prefers-reduced-motion, WCAG 2.1 SC 2.3.3 */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }
}
```

### Hover Micro-Interaction on ProjectCard
```typescript
// Apply to ProjectCard.tsx
// Source: motion.dev whileHover
import { motion } from "motion/react";

// Replace <button> with <motion.button>
<motion.button
  onClick={onClick}
  whileHover={{
    scale: 1.015,
    transition: { duration: 0.2, ease: "easeOut" },
  }}
  whileTap={{ scale: 0.99 }}
  className="group block w-full ..."
>
  {/* existing card content -- arrow already has group-hover:opacity-100 */}
</motion.button>
```

### Nav Item Hover
```typescript
// Apply to Navbar.tsx nav items
// Source: motion.dev whileHover
import { motion } from "motion/react";

// Wrap the Link text content in a motion.span for subtle movement
<Link to={item.to} className="...">
  <motion.span
    whileHover={{ x: 2 }}
    transition={{ duration: 0.15, ease: "easeOut" }}
  >
    {item.desktopLabel}
  </motion.span>
</Link>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import from "framer-motion"` | `import from "motion/react"` | framer-motion v12 (2024) | Both work but `motion/react` is canonical; better tree-shaking |
| JS-based scroll event listeners for parallax | `useScroll` with ScrollTimeline API | Motion v12 (2024) | Hardware-accelerated, no JS on every frame, 60fps on low-end devices |
| Manual `matchMedia` for reduced motion | `MotionConfig reducedMotion="user"` | Framer Motion v10+ | One-line global solution, automatically disables transform animations |
| `react-intersection-observer` + manual state | `whileInView` prop on motion elements | Framer Motion v6+ | Declarative, no useState, no re-render storms |
| `useOutlet()` + `cloneElement` for AnimatePresence | Keyed `motion.main` wrapper around `<Outlet>` | React Router v6+ pattern | Simpler, fewer moving parts; both approaches work |

**Deprecated/outdated:**
- `import from "framer-motion"`: Still functional but legacy path. Migrate to `"motion/react"`.
- `useInView` + `useState` pattern: Replaced by declarative `whileInView` -- less code, better performance.
- Manual scroll restoration with `useEffect` + `window.scrollTo`: Use `<ScrollRestoration />` from react-router-dom instead.

## Open Questions

1. **ProjectModal stacking context during page exit animations**
   - What we know: Modal renders inside `motion.main` which has opacity animations. Currently works because no exit animation plays long enough to cause issues.
   - What's unclear: Whether the modal needs to be moved to a React Portal when exit animations are fully wired.
   - Recommendation: Test first. If modal appears behind content during page transitions, move to Portal. Otherwise leave as-is to minimize changes.

2. **Hero parallax scroll range tuning**
   - What we know: `useTransform(scrollY, [0, 600], [0, -100])` creates a parallax effect. Exact values depend on hero size and scroll distance.
   - What's unclear: The exact pixel range that "feels right" for this specific layout (70vh spacer, 25% width hero).
   - Recommendation: Start with `[0, 600]` input / `[0, -100]` output, tune in-browser. The values are easily adjustable.

3. **Mobile stagger animation performance**
   - What we know: Mobile layout is single-column with all projects in one list. Staggering many items on mobile could feel slow.
   - What's unclear: Whether the stagger delay (currently 0.08s) needs adjustment for mobile's single column.
   - Recommendation: Keep the same variants for mobile/desktop initially. If mobile feels sluggish, reduce `staggerChildren` to `0.05` or remove stagger on mobile entirely.

## Sources

### Primary (HIGH confidence)
- [Motion for React -- Official Docs](https://motion.dev/docs/react) -- scroll animations, useScroll, useTransform, whileInView, MotionConfig
- [Motion Accessibility Docs](https://motion.dev/docs/react-accessibility) -- useReducedMotion, MotionConfig reducedMotion
- [Motion useScroll API](https://motion.dev/docs/react-use-scroll) -- scroll tracking, target, offset, scrollYProgress
- [Motion useTransform API](https://motion.dev/docs/react-use-transform) -- value mapping for parallax
- [Motion MotionConfig Docs](https://motion.dev/docs/react-motion-config) -- reducedMotion "user"/"always"/"never"
- [Motion Parallax Tutorial](https://motion.dev/tutorials/react-parallax) -- complete parallax implementation
- [React Router ScrollRestoration API](https://reactrouter.com/api/components/ScrollRestoration) -- scroll position management
- [React Router useOutlet API](https://api.reactrouter.com/v7/functions/react_router.useOutlet.html) -- v7 stable identity

### Secondary (MEDIUM confidence)
- [Animating React Pages with Outlet and AnimatePresence](https://medium.com/@antonio.falcescu/animating-react-pages-with-react-router-dom-outlet-and-framer-motion-animatepresence-bd5438b3433b) -- useOutlet + cloneElement pattern
- [Page Transitions in React Router with Framer Motion](https://blog.sethcorker.com/page-transitions-in-react-router-with-framer-motion/) -- patterns and pitfalls
- [React Router Discussions #10411](https://github.com/remix-run/react-router/discussions/10411) -- community integration patterns
- [React Router Discussions #8604](https://github.com/remix-run/react-router/discussions/8604) -- exit animation guidance
- [Framer Motion opacity stacking context issue #1885](https://github.com/framer/motion/issues/1885) -- Portal solution for z-index

### Tertiary (LOW confidence)
- None -- all findings verified against official documentation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- framer-motion v12 already installed, all APIs verified against official docs
- Architecture: HIGH -- existing animation infrastructure (variants, AnimatedSection, useScrollLock) already built in Phase 1; patterns follow official documentation
- Pitfalls: HIGH -- import inconsistency confirmed by codebase grep; scroll-behavior conflict confirmed in index.css; stacking context issue documented in Motion GitHub issues
- Code examples: HIGH -- all examples based on existing codebase patterns + official Motion documentation

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (30 days -- stable domain, no major releases expected)
