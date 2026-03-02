# Phase 1: Foundation - Research

**Researched:** 2026-03-02
**Domain:** Project scaffold, Tailwind CSS v4 theme system, folder structure, markdown pipeline with Zod frontmatter validation
**Confidence:** HIGH

---

## Summary

Phase 1 converts the existing brownfield v1 SPA into a clean, typed v2 scaffold ready for feature work. The scope is deliberately narrow: apply the light theme (replacing dark v1 colors), set up the folder structure the remaining phases depend on, install and configure the markdown content pipeline, and define shared animation variant stubs. No new UI is rendered in this phase beyond what already exists — it is infrastructure work.

The good news is that most of the stack is already in place. React 19, Vite 7, TypeScript 5.9, Tailwind CSS 4.2, and framer-motion 12.34 are all installed. What is missing is: (1) the three new packages needed for the content pipeline (`gray-matter`, `zod`, `zod-matter`), (2) the content directory structure and markdown files, (3) a `src/lib/animations.ts` variants file, and (4) a centralized `useScrollLock` hook to replace the v1 race-condition pattern. The theme variables in `src/index.css` are already using the correct Tailwind v4 `@theme` syntax but currently reflect dark v1 colors — they need to be updated to the light v2 palette.

The most consequential decision for this phase is the content pipeline approach. The project has already locked the choice: `gray-matter` + Vite `?raw` imports + manual Zod validation, NOT `@content-collections`. This is explicitly recorded in STATE.md. The simpler approach is correct for under 20 projects and requires zero plugin configuration. Research confirms this pattern is high-confidence and well-documented with Vite's native `?raw` import feature.

**Primary recommendation:** Install `gray-matter`, `zod`, and `zod-matter`; update `src/index.css` theme variables; create the folder structure; write `src/lib/markdown.ts` with the Zod schema; seed placeholder `.md` files for each existing project; create `src/lib/animations.ts` with shared variants; add `src/hooks/useScrollLock.ts`. That is the complete Phase 1 deliverable.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| THEM-01 | Light theme — bg #fafafa, borders #e0e0e0, text #1a1a1a, accent #4c48ff | Theme variables already structured in `@theme` block in `src/index.css`; only values need updating. Current dark values documented below. |
| THEM-02 | Aeonik Pro font system (400, 500, 700) loaded from local woff2 | Already implemented correctly in `src/index.css` with three `@font-face` declarations. No change needed — just verify font files exist in `public/fonts/`. |
| THEM-03 | Tailwind CSS v4 with @theme custom properties | Already in place. `@theme` block exists. Confirm `--color-border` is used via `border-border` utility class convention. |
| THEM-04 | CSS variables for all theme values (easy to maintain) | Already done correctly via `@theme` custom properties in `src/index.css`. All colors and font stack are variable-driven. |
| ARCH-01 | Clean folder structure: components, content, lib, pages, data | Current structure partially matches. Missing: `src/content/`, `src/hooks/`, `src/components/common/`, `src/components/case-study/`. These directories must be created with placeholder files. |
| ARCH-02 | All project data lives in markdown files with frontmatter, not hardcoded in components | Requires `src/content/projects/*.md` files seeded from current `src/data/projects.ts` data; `src/content/loader.ts` as the data access layer. |
| ARCH-03 | About page content sourced from markdown file | Requires `src/content/about.md` seeded from `src/data/about.ts`; loader exports `loadAbout()`. |
| ARCH-04 | Contact page data (links, info) sourced from markdown/data file | Contact data is simple (no prose body). A `src/data/contact.ts` or `src/content/contact.md` with frontmatter-only approach is sufficient. Recommend keeping as a typed TS file since it is pure structured data with no prose body. |
| ARCH-05 | Shared animation variants defined in central lib file | Create `src/lib/animations.ts` exporting `fadeUp`, `fadeIn`, `staggerContainer`, `cardVariants` constants. Phase 3 consumes these — Phase 1 only defines them. |
| ARCH-06 | Reusable animation wrapper component (AnimatedSection) for scroll reveals | Create `src/components/common/AnimatedSection.tsx` stub in Phase 1. The implementation is simple and well-defined; the component can be complete (not just stubbed) since the pattern is fully researched. |
| ARCH-07 | Type-safe frontmatter parsing with Zod validation | Requires `zod-matter` (or `zod` + manual parse), a `ProjectSchema` Zod schema in `src/lib/markdown.ts`, and validation called in `src/content/loader.ts`. Frontmatter errors must throw at load time, not render time. |
</phase_requirements>

---

## Standard Stack

### Core (No New Framework Choices)

The full application framework is already installed. Phase 1 adds only content pipeline utilities.

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gray-matter | ^4.0.3 | Parses YAML frontmatter from raw markdown strings | Industry standard, 60M+ weekly downloads, zero dependencies, returns `{ data, content }` |
| zod | ^3.24.x | Schema definition and runtime validation | Peer dep of most content tools; TypeScript-first, `.parse()` throws on invalid data |
| zod-matter | ^0.x | Wraps `gray-matter` with Zod schema; returns typed `data` | Eliminates `as ProjectMeta` cast; throws `ZodError` with field-level messages at parse time |

### Supporting (Already Installed — Confirm Usage)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| framer-motion | 12.34.3 | Animation — import as `motion/react` | ARCH-05, ARCH-06: define variants and `AnimatedSection` in Phase 1 |
| Tailwind CSS | 4.2.1 | Utility styling via `@theme` custom properties | All component styling; `@layer base` for all global resets |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| gray-matter + ?raw | @content-collections | content-collections is more powerful (HMR, transforms, code-split) but requires plugin configuration and `.content-collections/` gitignore. STATE.md explicitly deferred this. For < 20 projects, the overhead is not worth it. |
| zod-matter | Manual `z.parse(matter(raw).data)` | zod-matter is 300 bytes and eliminates boilerplate. Use it. If it has issues (e.g., version incompatibility), fall back to manual Zod parse. |
| @tailwindcss/typography plugin | Manual prose styles | For Phase 1, the typography plugin is NOT needed — it's only needed when `CaseStudyContent.tsx` renders markdown body in Phase 2. Do not install it in Phase 1. |

**Installation (Phase 1 new packages):**
```bash
pnpm add gray-matter zod zod-matter
pnpm add -D @types/gray-matter
```

Note: `react-markdown`, `remark-gfm`, and `rehype-highlight` are Phase 2 installs. Do not install them in Phase 1.

---

## Architecture Patterns

### Target Folder Structure After Phase 1

```
src/
├── components/
│   ├── common/              # NEW — reusable cross-feature components
│   │   └── AnimatedSection.tsx
│   ├── home/                # EXISTING — unchanged in Phase 1
│   │   ├── Hero.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   └── ProjectModal.tsx
│   └── layout/              # EXISTING — unchanged in Phase 1
│       ├── RootLayout.tsx
│       ├── Navbar.tsx
│       └── Footer.tsx
├── content/                 # NEW — markdown source files
│   ├── projects/
│   │   ├── whales-market.md
│   │   ├── whales-predict.md
│   │   ├── mention-network.md
│   │   └── geo-report.md
│   ├── about.md
│   └── loader.ts            # data access layer
├── data/                    # EXISTING — will be replaced by content/loader.ts
│   ├── projects.ts          # KEEP for now; loader.ts takes over data sourcing
│   └── about.ts             # KEEP for now; seeded into about.md
├── hooks/                   # NEW
│   └── useScrollLock.ts
├── lib/
│   ├── cn.ts                # EXISTING — unchanged
│   ├── markdown.ts          # NEW — gray-matter wrapper + Zod schema + types
│   └── animations.ts        # NEW — shared Framer Motion variant constants
├── pages/                   # EXISTING — unchanged in Phase 1
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── App.tsx                  # EXISTING — unchanged
├── main.tsx                 # EXISTING — unchanged
├── router.tsx               # EXISTING — unchanged
└── index.css                # MODIFY — update @theme color values to light palette
```

**Directories to create:** `src/content/projects/`, `src/content/` (root), `src/hooks/`, `src/components/common/`

**What does NOT change in Phase 1:** `src/pages/`, `src/components/home/`, `src/components/layout/`, `src/App.tsx`, `src/router.tsx`, `src/main.tsx`. Phase 1 must not break the running application.

---

### Pattern 1: Tailwind v4 @theme + @layer base

**What:** All theme values live in the `@theme` block as CSS custom properties. All global resets (font, scroll, link color) live in `@layer base {}`. Nothing written outside these blocks.

**When to use:** The only CSS blocks permitted in `src/index.css` are: `@import "tailwindcss"`, `@font-face` declarations, `@theme { }`, and `@layer base { }`. Any new rule added outside these will silently override Tailwind utilities (Pitfall 2).

**Current state analysis:** `src/index.css` already follows this pattern correctly. The only change needed for Phase 1 is updating the color values inside `@theme`. The structure is already correct.

**Current dark values → Target light values:**
```css
/* CURRENT (dark v1 — must change) */
@theme {
  --color-bg: #fafafa;           /* already correct for light theme! */
  --color-bg-card: #f5f5f5;      /* already correct */
  --color-bg-nav: #fafafa;       /* already correct */
  --color-text-primary: #1a1a1a; /* already correct */
  --color-text-secondary: #808080; /* correct */
  --color-accent: #4c48ff;       /* correct */
  --color-border: #e0e0e0;       /* correct */

  --font-sans: "Aeonik Pro", ui-sans-serif, system-ui, -apple-system, sans-serif; /* correct */
}
```

**FINDING:** The current `src/index.css` already has the correct light theme values as specified in THEM-01. Cross-referencing `index.css` (read above) against THEM-01 requirements:
- bg: `#fafafa` — matches THEM-01
- borders: `#e0e0e0` — matches THEM-01
- text: `#1a1a1a` — matches THEM-01
- accent: `#4c48ff` — matches THEM-01

The theme is already correct for the light v2 design. The MEMORY.md indicated a dark theme (`#0a0a0a` bg) but REQUIREMENTS.md THEM-01 specifies a light theme. The codebase already implements the light theme. **THEM-01 through THEM-04 are effectively already complete** — the task for Phase 1 is to verify this and confirm no component is hardcoding colors outside the CSS variables.

**IMPORTANT:** Audit existing components for any hardcoded hex colors that bypass CSS variables. Check `src/components/home/`, `src/components/layout/`.

---

### Pattern 2: Markdown Content Pipeline

**What:** A two-file system — `src/lib/markdown.ts` (schema + parser) and `src/content/loader.ts` (data access). The loader uses explicit Vite `?raw` imports (not `import.meta.glob`) for intentional ordering.

**When to use:** Whenever a component or page needs project or about data.

**Implementation:**

```typescript
// src/lib/markdown.ts
// Source: gray-matter docs + Vite ?raw feature docs
import { z } from "zod";

// Zod schema — single source of truth for frontmatter shape
export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  year: z.string(),
  tags: z.array(z.string()),
  role: z.string(),
  description: z.string(),
  color: z.string(),
  coverImage: z.string().optional(),
});

export const AboutSchema = z.object({
  name: z.string(),
  headline: z.string(),
  location: z.string().optional(),
});

export type ProjectMeta = z.infer<typeof ProjectSchema>;
export type AboutMeta = z.infer<typeof AboutSchema>;

export interface ParsedProject {
  meta: ProjectMeta;
  body: string;
}

export interface ParsedAbout {
  meta: AboutMeta;
  body: string;
}
```

```typescript
// src/content/loader.ts
// Source: Vite official docs (https://vite.dev/guide/features - ?raw suffix)
import { matter } from "zod-matter";
import { ProjectSchema, AboutSchema, type ParsedProject, type ParsedAbout } from "@/lib/markdown";

// Explicit imports — intentional ordering, no glob needed for < 20 projects
import rawWhalesMarket from "./projects/whales-market.md?raw";
import rawWhalesPredict from "./projects/whales-predict.md?raw";
import rawMentionNetwork from "./projects/mention-network.md?raw";
import rawGeoReport from "./projects/geo-report.md?raw";
import rawAbout from "./about.md?raw";

function parseProject(raw: string): ParsedProject {
  const { data, content } = matter(raw, ProjectSchema); // throws ZodError if invalid
  return { meta: data, body: content };
}

function parseAbout(raw: string): ParsedAbout {
  const { data, content } = matter(raw, AboutSchema);
  return { meta: data, body: content };
}

// Projects ordered intentionally (display order in grid)
export const projects: ParsedProject[] = [
  parseProject(rawWhalesMarket),
  parseProject(rawWhalesPredict),
  parseProject(rawMentionNetwork),
  parseProject(rawGeoReport),
];

export function getProject(slug: string): ParsedProject | undefined {
  return projects.find((p) => p.meta.slug === slug);
}

export const about: ParsedAbout = parseAbout(rawAbout);
```

**Note on `?raw` TypeScript support:** Vite's `?raw` imports return `string` but TypeScript will complain without a declaration. Add to `src/vite-env.d.ts` (or a new `src/types/vite-assets.d.ts`):
```typescript
/// <reference types="vite/client" />
declare module "*.md?raw" {
  const content: string;
  export default content;
}
```

**Confidence:** HIGH — `?raw` is a native Vite feature documented since Vite 2. No plugin needed.

---

### Pattern 3: Shared Animation Variants

**What:** A constants file exporting named Framer Motion variant objects. Imported by any component that animates. Prevents per-component drift in timing and easing values.

**When to use:** Defined in Phase 1, consumed in Phase 3.

```typescript
// src/lib/animations.ts
// Source: Framer Motion variants docs (https://motion.dev/docs/react-animation#variants)

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
```

**Confidence:** HIGH — pure constants, no library API dependency beyond Framer Motion's variant object shape.

---

### Pattern 4: AnimatedSection Component

**What:** Reusable `motion.div` with `whileInView` and `viewport={{ once: true }}`. Wrap any content section that should fade up on scroll.

```typescript
// src/components/common/AnimatedSection.tsx
// Source: Architecture research Pattern 1
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/cn";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  delay = 0,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
```

**Note on import path:** Use `"motion/react"` not `"framer-motion"`. The package `framer-motion` v12 ships `motion/react` as a sub-path export. This is the forward-compatible import path.

---

### Pattern 5: Centralized Scroll Lock Hook

**What:** Reference-counted `document.body.style.overflow` manager. Prevents the v1 race condition where two independent effects both write to the same DOM property.

```typescript
// src/hooks/useScrollLock.ts
// Source: Known bug in CONCERNS.md + Pitfall 9 from PITFALLS.md
import { useEffect } from "react";

// Module-level reference count — survives across component instances
const lockCount = { value: 0 };

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (active) {
      lockCount.value++;
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (active) {
        lockCount.value--;
        if (lockCount.value === 0) {
          document.body.style.overflow = "";
        }
      }
    };
  }, [active]);
}
```

**After implementing this hook:** Remove all direct `document.body.style.overflow` mutations from `src/pages/HomePage.tsx` (the 900ms setTimeout pattern) and `src/components/home/ProjectModal.tsx`.

---

### Anti-Patterns to Avoid

- **Writing CSS outside @layer:** Any rule in `src/index.css` that is not inside `@font-face`, `@theme`, or `@layer base` will silently override all Tailwind utilities. This is already avoided in the current codebase — maintain it.
- **Type-casting frontmatter with `as ProjectMeta`:** Using `gray-matter` without `zod-matter` means `data` is typed as `any`. Casting with `as` defeats TypeScript. Always validate through `zod-matter` or explicit `z.parse()`.
- **Importing animation constants from framer-motion:** Use `"motion/react"` as the import source from day one. The `"framer-motion"` import still works but is the legacy path.
- **Creating `src/components/common/` directory but leaving it empty:** Create `AnimatedSection.tsx` immediately when the directory is created. Empty directories with placeholder `.gitkeep` are fragile; a real file is better.
- **Changing `src/data/projects.ts` in Phase 1:** Phase 1 adds the new content pipeline alongside the old data files. Components still reference `src/data/projects.ts`. Migration of components to use `src/content/loader.ts` happens in Phase 2 when the UI is updated. Do not break existing pages.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frontmatter parsing | Custom YAML parser | gray-matter | gray-matter handles edge cases (multiline strings, special chars, nesting), is battle-tested at 60M+ weekly downloads |
| Frontmatter type safety | TypeScript `as` cast + manual field checks | zod-matter | zod-matter throws at parse time with field-level ZodError messages; `as` cast silently passes invalid data through |
| Scroll lock | Multiple independent `overflow = 'hidden'` writers | `useScrollLock` hook (reference-counted) | Two independent effects on the same DOM property produce a race condition that requires a page refresh to recover from (documented existing bug) |
| Animation variant objects | Per-component `initial`/`animate` objects | `src/lib/animations.ts` constants | Per-component variants drift in timing and easing values over time; shared constants guarantee visual consistency |

**Key insight:** For this phase, the most important "don't hand-roll" is frontmatter validation. The existing v1 codebase hardcodes project data in TypeScript, which is fully type-safe. Moving to markdown without Zod validation would be a regression — you'd lose compile-time safety. `zod-matter` restores that safety at parse time.

---

## Common Pitfalls

### Pitfall 1: Unlayered CSS Overrides All Tailwind v4 Utilities

**What goes wrong:** Any CSS rule written outside `@layer base {}` in `src/index.css` silently overrides all Tailwind utility classes targeting the same property, regardless of specificity.

**Why it happens:** Tailwind v4 places all generated utilities inside `@layer utilities`. Unlayered CSS lives in the browser's implicit highest-priority cascade layer — above all named layers.

**How to avoid:** Enforce this rule: the only sections in `src/index.css` are `@import "tailwindcss"`, `@font-face` blocks, `@theme { }`, and `@layer base { }`. The current file already follows this — do not break it.

**Warning signs:** A Tailwind class applied in JSX has no visible effect. DevTools shows a rule from `index.css` winning without being more specific.

---

### Pitfall 2: `gray-matter` Returns `any` — Frontmatter Errors Fail Silently

**What goes wrong:** Without Zod validation, a typo in a `.md` file frontmatter (e.g., `tilte` instead of `title`) passes TypeScript compilation and only manifests as a blank heading at runtime.

**Why it happens:** `gray-matter` types its `data` property as `{ [key: string]: any }`. TypeScript's structural typing allows `as ProjectMeta` casts to pass even when fields are missing.

**How to avoid:** Use `zod-matter`'s `matter(raw, Schema)` call. It throws a `ZodError` with field-level messages if any required field is missing or has the wrong type. This converts a silent runtime bug into a loud parse-time error.

**Warning signs:** Component renders with blank text or `undefined` displayed in the DOM.

---

### Pitfall 3: Missing TypeScript Declaration for `?raw` Imports

**What goes wrong:** `import rawFile from "./projects/foo.md?raw"` will produce a TypeScript error: "Cannot find module './projects/foo.md?raw' or its corresponding type declarations."

**Why it happens:** TypeScript does not understand Vite's `?raw` query suffix by default. A module declaration is needed.

**How to avoid:** Add to `src/vite-env.d.ts` (the file already exists via Vite scaffold):
```typescript
/// <reference types="vite/client" />
declare module "*.md?raw" {
  const content: string;
  export default content;
}
```
Check whether `src/vite-env.d.ts` already has this declaration before adding it.

**Warning signs:** TypeScript error on any `?raw` import line.

---

### Pitfall 4: Tailwind v4 Border Color Defaults to `currentColor`

**What goes wrong:** `border` utility alone sets `border-color: currentColor` in Tailwind v4 (not the old v3 gray-200 default). Any component using just `border` will render with a text-colored border.

**Why it happens:** Tailwind v4 aligned with CSS default behavior. The v3 gray override is gone.

**How to avoid:** Always pair `border` with an explicit color class (e.g., `border-[--color-border]`). Alternatively, set a default in `@layer base`:
```css
@layer base {
  *, *::before, *::after {
    border-color: var(--color-border);
  }
}
```
This provides a site-wide fallback without overriding explicit border color utilities.

**Warning signs:** Borders that should be subtle appear dark/prominent in the rendered page.

---

### Pitfall 5: Breaking the Running Application During Phase 1

**What goes wrong:** Phase 1 modifies `src/index.css` and adds new directories. If any existing import path breaks or a component is refactored prematurely, the dev server errors.

**Why it happens:** Phase 1 is infrastructure work on a running application. The new content pipeline exists in parallel with the old `src/data/` files — they coexist until Phase 2 migrates the UI.

**How to avoid:**
- Do not delete `src/data/projects.ts` or `src/data/about.ts` in Phase 1. They are still imported by existing components.
- Do not change any `src/pages/` or `src/components/home/` files in Phase 1.
- After each file creation, verify `pnpm dev` still starts without errors.

**Warning signs:** TypeScript compilation errors or missing module errors from existing components after Phase 1 changes.

---

## Code Examples

Verified patterns from official sources:

### Vite `?raw` Import

```typescript
// Source: https://vite.dev/guide/features#importing-asset-as-string
import rawFile from "./content/projects/whales-market.md?raw";
// rawFile is type string — contains full file contents including frontmatter
```

### zod-matter Usage

```typescript
// Source: https://github.com/HiDeoo/zod-matter
import { matter } from "zod-matter";
import { z } from "zod";

const Schema = z.object({
  title: z.string(),
  slug: z.string(),
  year: z.string(),
});

const { data, content } = matter(rawMarkdownString, Schema);
// data is typed as z.infer<typeof Schema>
// throws ZodError with field path + message if schema fails
// content is the markdown body below the --- delimiter
```

### Tailwind v4 `@theme` Custom Properties

```css
/* Source: https://tailwindcss.com/docs/v4-beta#css-first-configuration */
@theme {
  --color-bg: #fafafa;
  --color-accent: #4c48ff;
  /* These become usable as: bg-bg, text-accent, border-accent via Tailwind utilities */
  /* And as raw CSS variables: var(--color-bg) */
}
```

### motion/react Import Convention

```typescript
// Source: https://motion.dev/docs/react-upgrade-guide
// DO THIS — forward-compatible path
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

// DO NOT — legacy path (still works but deprecated direction)
import { motion, AnimatePresence } from "framer-motion";
```

### Markdown Frontmatter Format

```markdown
---
slug: whales-market
title: Whales Market
subtitle: Advanced Trading Platform cho giao dịch Pre-Market
year: "2025"
tags:
  - Trading
  - Web App
  - Mobile App
role: Product Design
description: "Advanced Trading Platform cho giao dịch Pre-Market, tập trung vào nhóm pro traders và high-frequency users."
color: "#4c48ff"
---

Body markdown content goes here. This is what `content` contains after parsing.
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` import path | `motion/react` import path | framer-motion v12 (2024) | The old path still works but `motion/react` is the maintained entry point going forward |
| Contentlayer for markdown | `@content-collections` or `gray-matter` + `?raw` | Contentlayer archived 2024 | Do not reference Contentlayer. The project already made this call (STATE.md) |
| Tailwind `border` defaults to gray-200 | `border` defaults to `currentColor` | Tailwind v4 (2025) | All `border` usages need explicit color classes |
| Hardcoded project data in TypeScript | Frontmatter-driven content in `.md` files | v2 rebuild goal | Enables non-code content updates; Zod schema provides type safety at parse time |

**Deprecated/outdated:**
- Contentlayer: Archived as of 2024. Do not use.
- `framer-motion` direct import: Still functional, but `motion/react` is the forward path. Standardize in Phase 1.
- `document.body.style.overflow` direct manipulation: Replaced by `useScrollLock` hook in Phase 1.

---

## Open Questions

1. **Does `vite-env.d.ts` already exist in this project?**
   - What we know: Vite scaffolded projects include it by default.
   - What's unclear: Whether it was included or deleted in the v1 work.
   - Recommendation: Check for `src/vite-env.d.ts` before creating it. If absent, create it with the `/// <reference types="vite/client" />` line plus the `*.md?raw` module declaration.

2. **Are Aeonik Pro font files present in `public/fonts/`?**
   - What we know: `src/index.css` declares `@font-face` for three weights pointing to `/fonts/AeonikPro-*.woff2`.
   - What's unclear: Whether the woff2 files are committed to the repo or are missing (causing fallback to system fonts silently).
   - Recommendation: Verify `public/fonts/` contains `AeonikPro-Regular.woff2`, `AeonikPro-Medium.woff2`, `AeonikPro-Bold.woff2` at the start of Phase 1. This is a THEM-02 blocker if missing.

3. **Does `zod-matter` support `zod` v3.24.x?**
   - What we know: `zod-matter` wraps `gray-matter` and accepts a Zod schema.
   - What's unclear: Whether `zod-matter`'s peer dependency range includes the latest zod 3.x versions.
   - Recommendation: After `pnpm add gray-matter zod zod-matter`, check for peer dep warnings. If `zod-matter` has a peer dep conflict, fall back to the manual pattern: `z.parse(matter(raw).data)`.

4. **THEM-01 theme values appear correct in the current codebase — but is the MEMORY.md note about dark theme (`#0a0a0a`) outdated?**
   - What we know: `src/index.css` already shows `#fafafa` bg, `#1a1a1a` text, `#e0e0e0` border. REQUIREMENTS.md THEM-01 specifies exactly these values.
   - What's unclear: Whether some components hardcode dark values from the v1 memory (e.g., `bg-[#0a0a0a]` inline styles).
   - Recommendation: Run a grep for `#0a0a0a`, `#141414`, `#f0f0f0` across `src/` to find any hardcoded dark theme values in components. Fix any found during Phase 1.

---

## Sources

### Primary (HIGH confidence)
- Vite official features docs (`?raw` import) — https://vite.dev/guide/features#importing-asset-as-string
- Tailwind CSS v4 blog post — https://tailwindcss.com/blog/tailwindcss-v4
- Tailwind CSS v4 upgrade guide — https://tailwindcss.com/docs/upgrade-guide
- gray-matter official README — https://github.com/jonschlinkert/gray-matter
- zod-matter official README — https://github.com/HiDeoo/zod-matter
- Motion for React official docs — https://motion.dev/docs/react
- Motion upgrade guide (framer-motion → motion) — https://motion.dev/docs/react-upgrade-guide
- Existing codebase `src/index.css` (read directly) — confirmed @theme structure and current values

### Secondary (MEDIUM confidence)
- Rendering markdown in Vite + React + TypeScript + Tailwind — https://kristianhannula.com/posts/rendering-markdown-files-with-react-typescript-vite-and-tailwind/
- Tailwind v4 cascade layers incompatibility issue — https://github.com/livewire/flux/issues/783
- React Router v7 + markdown static site — https://geb1024.com/articles/rrv7-markdown-static-website/

### Tertiary (LOW confidence — no additional LOW-confidence sources used)

---

## Metadata

**Confidence breakdown:**
- Theme setup (THEM-01 to THEM-04): HIGH — `src/index.css` read directly; current values already match THEM-01 requirements. THEM-02 font files need physical verification.
- Folder structure (ARCH-01): HIGH — clear directory delta derived from codebase analysis and architecture research.
- Markdown pipeline (ARCH-02, ARCH-03, ARCH-07): HIGH — `?raw` is native Vite, `gray-matter` is battle-tested, `zod-matter` is a thin well-documented wrapper.
- Animation variants (ARCH-05, ARCH-06): HIGH — pure constant objects, no library API edge cases.
- Scroll lock hook (implicit ARCH-01 concern): HIGH — documented existing bug, prevention strategy well-understood.
- `zod-matter` peer dep compatibility: MEDIUM — needs verification at install time.

**Research date:** 2026-03-02
**Valid until:** 2026-04-01 (stable domain — Tailwind v4, Vite ?raw, gray-matter are not fast-moving)
