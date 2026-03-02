# Phase 2: Layout & Content - Research

**Researched:** 2026-03-02
**Domain:** React SPA — wiring real content (markdown pipeline) into all pages, building CaseStudyPage, connecting Formspree contact form, polishing responsive layouts
**Confidence:** HIGH

---

## Summary

Phase 2 delivers every page of the site working end-to-end with real content. Phase 1 already built the complete content pipeline (`src/content/loader.ts`, Zod-validated markdown, `src/data/contact.ts`), animation infrastructure (`src/lib/animations.ts`, `AnimatedSection`, `useScrollLock`), and seeded 4 project markdown files and `about.md`. Phase 2 consumes all of that and wires it into the UI.

The primary new work in Phase 2 is: (1) migrate existing pages from `src/data/` TS constants to `src/content/loader.ts` markdown data, (2) build the new `CaseStudyPage` at `/case-studies/:slug` that renders full markdown body content via `react-markdown`, (3) update `ProjectCard` to link to case study routes instead of only opening the modal, (4) rewrite `AboutPage` to render markdown body from `about.md`, (5) connect `ContactPage` to Formspree with validation and feedback states, and (6) verify responsive layouts across all three breakpoints. The modal quick-look remains alongside the full case study page — both coexist.

Two packages are needed that are not yet installed: `react-markdown` (with `remark-gfm`) for markdown body rendering, and `@tailwindcss/typography` for prose styling. The Tailwind v4 typography plugin integration has a known quirk with the cascade (`@plugin` directive must come after `@import "tailwindcss"`) — verify at implementation time. The `framer-motion` import pattern was already standardized to `"motion/react"` in Phase 1 (`AnimatedSection.tsx` confirms this). The `RootLayout.tsx` currently uses `<Outlet />` directly inside a `<motion.main>` with `AnimatePresence` — this works for entry animations but the exit animation may not fire correctly; the fix (`useOutlet()` + `cloneElement`) is deferred to Phase 3 when full animation polish is applied. Phase 2 does not need to add new scroll animations (that's Phase 3); it focuses only on getting content into place and layouts polished.

**Primary recommendation:** Migrate pages to real data first (one per task), then build CaseStudyPage, then wire Formspree, then audit responsive breakpoints. This ordering means every component is always rendering real data, never breaking backward.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LAYO-01 | Fixed hero + scrolling grid parallax layout (sam-smith.design pattern) | Already implemented in Hero.tsx (fixed position) and ProjectGrid.tsx (z-10 scroll over). Phase 2 verifies it holds end-to-end; parallax motion effect is Phase 3. |
| LAYO-02 | 4-column navbar with active indicator | Navbar.tsx already has 4-column grid and `↓` active indicator. Phase 2 adds `/case-studies/:slug` route match to active state logic. |
| LAYO-03 | Staggered 2-column project grid with 1px divider | ProjectGrid.tsx already implements `gridTemplateColumns: "1fr 1px 1fr"` with `mt-[337px]` left offset. Phase 2 migrates data source from `src/data/projects.ts` to `src/content/loader.ts`. |
| LAYO-04 | Max-width 1800px, left-aligned container | RootLayout.tsx `max-w-[1800px]` already applied. Phase 2 ensures CaseStudyPage inherits the same container. |
| LAYO-05 | Footer with accent background and branding | Footer.tsx exists. Phase 2: no change required unless review reveals issues. |
| LAYO-06 | Project modal via query params for quick-look | ProjectModal.tsx exists and works. Phase 2: migrate from `Project` (src/data) type to `ProjectMeta` (src/content) type, and update scroll lock to use `useScrollLock` hook. |
| CONT-01 | Project markdown files with frontmatter (title, slug, year, color, tags, description, thumbnail) | Content pipeline DONE (Phase 1). 4 project .md files exist. Phase 2 adds `thumbnail` field to schema if needed, or confirms `coverImage` covers it. |
| CONT-02 | Markdown content renders correctly with proper typography (headings, lists, code blocks, images) | Requires installing `react-markdown` + `remark-gfm` + `@tailwindcss/typography`. Build `CaseStudyContent.tsx` component with `prose` class. Verify typography plugin v4 quirks. |
| CONT-03 | Frontmatter metadata drives project cards on home page (title, year, color, thumbnail) | Migrate `ProjectGrid.tsx` and `ProjectCard.tsx` to use `ParsedProject`/`ProjectMeta` from `src/content/loader.ts` instead of `Project` from `src/data/projects.ts`. |
| CTCT-01 | Contact form sends email via Formspree (no backend needed) | Formspree REST API integration via `fetch` POST. User must create a Formspree form and provide form ID to replace `PLACEHOLDER` in `src/data/contact.ts`. |
| CTCT-02 | Form has validation and success/error feedback states | Add `status: 'idle' | 'submitting' | 'success' | 'error'` state to ContactPage. Validate name, email (format), message (non-empty) before submit. Show inline errors and a success message after send. |
| RESP-01 | Mobile layout (< 768px) with single-column grid, simplified nav | ProjectGrid already has mobile single-column. Navbar shows short labels on mobile. Phase 2 verifies CaseStudyPage mobile layout. |
| RESP-02 | Tablet layout (768px–1024px) with adapted grid and nav | Current code uses `md:` (768px) breakpoint only. Phase 2: verify tablet layout with real content. Consider adding `lg:` breakpoints for 1024px if 2-column grid feels too cramped at tablet. |
| RESP-03 | Desktop layout (> 1024px) with full 2-column staggered grid | ProjectGrid desktop grid confirmed working. Phase 2 verifies with real project data and real image/thumbnail presence. |
| RESP-04 | All text sizes scale appropriately across breakpoints | Current pages use `clamp()` for headings and `md:` prefixes for body sizes. Phase 2 audits all pages with real content at all breakpoints. |
| RESP-05 | Touch-friendly interaction targets on mobile (min 44px) | Buttons and nav items need min 44px tap targets. Phase 2 audit: ProjectCard (full-width button), Navbar (full cell height), modal close button, form submit button. |
</phase_requirements>

---

## Standard Stack

### Core (already installed — no new installs needed for most of Phase 2)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `gray-matter` | 4.0.3 | Parse markdown frontmatter — already in use in `src/content/loader.ts` | Installed in Phase 1, proven pattern |
| `zod` | 4.3.6 | Frontmatter schema validation — already in use | Installed in Phase 1 |
| `framer-motion` (via `motion/react`) | 12.34.3 | Animation — AnimatedSection already uses `motion/react` import path | Installed in Phase 1, `motion/react` path confirmed correct |
| `react-router-dom` | 7.13.1 | Routing — add `/case-studies/:slug` route | Already installed |

### New Packages Required for Phase 2

| Library | Purpose | Install Command |
|---------|---------|-----------------|
| `react-markdown` | Render markdown body content in `CaseStudyContent` and `AboutPage` | `pnpm add react-markdown` |
| `remark-gfm` | GitHub Flavored Markdown — tables, strikethrough, task lists | `pnpm add remark-gfm` |
| `@tailwindcss/typography` | `prose` utility class for styled markdown body text | `pnpm add @tailwindcss/typography` |

**Installation:**
```bash
pnpm add react-markdown remark-gfm @tailwindcss/typography
```

**React 19 peer dep warning:** `react-markdown` may emit a peer dep warning for React 19. This is a version declaration mismatch only — the library works functionally. If the warning causes install failure, use `pnpm add react-markdown remark-gfm --legacy-peer-deps` or add a pnpm.overrides entry.

**Verification:** After install, confirm `react-markdown` is in `dependencies` in `package.json` and `@tailwindcss/typography` is accessible from `node_modules`.

### Not Required

| Package | Reason to Skip |
|---------|---------------|
| `rehype-highlight` / `highlight.js` | Case study markdown is prose (no code blocks). Skip unless a project .md file has code fences. |
| `@content-collections/core` | `gray-matter` + `?raw` approach is already in place and working. Do not add a second content system. |
| `formspree/react` | Official Formspree React library adds a wrapper around native `fetch`. Use native `fetch` + the REST API directly — simpler, no dependency, same behavior. |

---

## Architecture Patterns

### Recommended Phase 2 Structure (delta from current)

```
src/
├── components/
│   ├── home/
│   │   ├── Hero.tsx            EXISTING — no change in Phase 2
│   │   ├── ProjectCard.tsx     MODIFY — type: Project → ProjectMeta, add link to /case-studies/:slug
│   │   ├── ProjectGrid.tsx     MODIFY — import from src/content/loader.ts instead of src/data/projects.ts
│   │   └── ProjectModal.tsx    MODIFY — type: Project → ProjectMeta, use useScrollLock hook
│   ├── case-study/             NEW DIRECTORY
│   │   ├── CaseStudyContent.tsx  NEW — react-markdown + prose wrapper
│   │   └── CaseStudyHeader.tsx   NEW — hero block for case study page
│   ├── common/
│   │   └── AnimatedSection.tsx  EXISTING (Phase 1)
│   └── layout/
│       ├── Navbar.tsx          MODIFY — extend active state to /case-studies/* routes
│       └── ...
├── pages/
│   ├── HomePage.tsx            MODIFY — use loader projects, use useScrollLock hook
│   ├── AboutPage.tsx           MODIFY — render about.md body via react-markdown
│   ├── ContactPage.tsx         MODIFY — wire Formspree, add validation + status states
│   └── CaseStudyPage.tsx       NEW — route /case-studies/:slug
└── router.tsx                  MODIFY — add /case-studies/:slug route + React.lazy CaseStudyPage
```

### Pattern 1: Migrating pages from src/data to src/content/loader

**What:** Replace imports from `src/data/projects.ts` (`Project` type) with imports from `src/content/loader.ts` (`ProjectMeta` / `ParsedProject` types).

**Current state:** `ProjectGrid.tsx`, `ProjectCard.tsx`, `ProjectModal.tsx`, and `HomePage.tsx` all import from `src/data/projects.ts`. The `src/data/projects.ts` file still holds the TypeScript constants.

**Migration approach:** Update one component at a time. `ProjectGrid` and `HomePage` first (they import the array). Then `ProjectCard` and `ProjectModal` (they consume the `Project` type). After migration is verified, `src/data/projects.ts` can be removed (but defer removal until all consumers are migrated).

**Type delta:** `Project` from `src/data/projects.ts` and `ProjectMeta` from `src/lib/markdown.ts` are structurally identical. The Zod schema in `markdown.ts` has the same fields. Migration is a type swap, not a structural change.

```typescript
// Before (src/data/projects.ts)
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

// After (src/content/loader.ts)
import type { ProjectMeta } from "@/lib/markdown";
import { projects } from "@/content/loader";
// Note: projects is ParsedProject[] — access project meta via project.meta
```

**Key difference:** `projects` from `src/content/loader.ts` is `ParsedProject[]`, not `Project[]`. Each item has `{ meta: ProjectMeta, body: string }`. Callers must use `project.meta.slug` instead of `project.slug`. Update all property accesses when migrating.

### Pattern 2: CaseStudyPage and routing

**What:** New route `/case-studies/:slug` renders the full case study page with markdown body.

**Router change:**
```typescript
// src/router.tsx
import React from "react";
const CaseStudyPage = React.lazy(() => import("@/pages/CaseStudyPage"));

// In children array:
{ path: "case-studies/:slug", element: <CaseStudyPage /> }
```

**CaseStudyPage component:**
```typescript
// src/pages/CaseStudyPage.tsx
import { useParams, Navigate } from "react-router-dom";
import { getProject } from "@/content/loader";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <Navigate to="/" replace />;

  return (
    <article className="px-6 pt-[130px] pb-24 md:px-8 md:pt-[180px]">
      <CaseStudyHeader meta={project.meta} />
      <CaseStudyContent body={project.body} />
    </article>
  );
}
```

**React.lazy rationale:** `CaseStudyPage` imports `react-markdown` which is a moderately sized library. Lazy loading splits it out of the main bundle so visitors to the home page do not pay for markdown rendering upfront.

### Pattern 3: CaseStudyContent — markdown body rendering

**What:** `react-markdown` with `remark-gfm` plugin, wrapped in Tailwind typography `prose` class.

```typescript
// src/components/case-study/CaseStudyContent.tsx
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CaseStudyContentProps {
  body: string;
}

export default function CaseStudyContent({ body }: CaseStudyContentProps) {
  return (
    <article className="prose prose-lg max-w-[720px] mt-12
      prose-headings:font-medium prose-headings:tracking-tight
      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
      prose-code:bg-bg-card prose-code:px-1 prose-code:rounded
    ">
      <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
    </article>
  );
}
```

**Tailwind v4 + typography plugin activation in index.css:**
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

**Light theme note:** The project uses a light theme (`#fafafa` bg, `#1a1a1a` text). Use `prose` (not `prose-invert`). The `prose` class provides dark-on-light styling which matches the theme.

**MEMORY.md discrepancy:** The project memory file says "Dark theme" but the actual `index.css` `@theme` block shows `--color-bg: #fafafa` (light) and `--color-text-primary: #1a1a1a` (dark text on light bg). The REQUIREMENTS.md `THEM-01` also confirms "Light theme — bg #fafafa". Use `prose` (not `prose-invert`).

### Pattern 4: AboutPage — render markdown body from about.md

**What:** Replace hardcoded `aboutData` import with `about` from `src/content/loader.ts`. The `about.md` body is raw markdown with `## Strengths` and `## Philosophy` sections. Render body via `react-markdown` inside `CaseStudyContent` (reuse the same component) or a simpler prose wrapper.

**Current state:** `AboutPage.tsx` imports `{ aboutData } from "@/data/about"` and renders structured TypeScript data (arrays of strings). The `about.md` body has the same information in natural markdown prose. Phase 2 replaces the structured rendering with markdown rendering.

**Approach:** Use the same `CaseStudyContent` component (or an identical prose wrapper). The `about.md` body is already written with correct markdown headings and lists.

### Pattern 5: Formspree contact form integration

**What:** Native `fetch` POST to Formspree REST endpoint. No external library needed.

**Endpoint:** `https://formspree.io/f/{FORM_ID}` — user must create a free Formspree account and replace `PLACEHOLDER` in `src/data/contact.ts`.

```typescript
// ContactPage.tsx — Formspree fetch pattern
import { contactData } from "@/data/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

const [status, setStatus] = useState<FormStatus>("idle");
const [errors, setErrors] = useState<Partial<typeof form>>({});

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Client-side validation
  const newErrors: Partial<typeof form> = {};
  if (!form.name.trim()) newErrors.name = "Name is required";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "Valid email is required";
  }
  if (!form.message.trim()) newErrors.message = "Message is required";
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setStatus("submitting");
  try {
    const res = await fetch(contactData.formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  } catch {
    setStatus("error");
  }
};
```

**Formspree setup requirement:** User must: (1) create account at formspree.io, (2) create a new form, (3) replace `"PLACEHOLDER"` in `src/data/contact.ts` with the actual form ID (e.g., `"https://formspree.io/f/abcdefgh"`). This is user_setup for Phase 2.

**Test mode:** During development, Formspree accepts submissions without email confirmation when using `Accept: application/json` header. Real email sending activates once the form is confirmed on Formspree.

### Pattern 6: ProjectCard link to case study route

**What:** `ProjectCard` currently is a `<button>` that calls `onClick` to open the modal. Phase 2 adds a secondary interaction: clicking the card navigates to `/case-studies/:slug`. The modal quick-look remains as an option.

**Decision to make during planning:** Two approaches:
- Option A: Card click opens modal (existing behavior). Add a "View case study →" link inside the card that navigates to the full page.
- Option B: Card click navigates to the full case study page directly. Modal becomes secondary (e.g., accessible via keyboard shortcut or separate preview button).

**Recommendation (Option A):** Keep card click = modal (consistent with existing interaction model). Add a visible "View full case study →" link in the modal footer. This preserves the quick-look UX while giving access to the full page.

### Anti-Patterns to Avoid

- **Do not keep two parallel data sources for projects.** Once `ProjectGrid` and `ProjectCard` are migrated to `src/content/loader.ts`, delete `src/data/projects.ts`. Keeping both invites drift.
- **Do not duplicate the `Project` / `ProjectMeta` interface.** One schema in `src/lib/markdown.ts`, all types derived from it.
- **Do not add Formspree's official React library.** It wraps the same `fetch` call with more dependencies. Native fetch is simpler, has zero bundle cost, and is completely sufficient.
- **Do not use `prose-invert` for markdown body.** The theme is light. `prose-invert` is for dark backgrounds. Using it will make text nearly invisible.
- **Do not put markdown body rendering in a `useEffect`.** `react-markdown` is a synchronous render — render it directly in JSX. No loading state needed for content already in the bundle.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown body → HTML | Custom regex/DOMParser | `react-markdown` | Handles all edge cases: escaped chars, nested lists, code fences, GFM extensions, XSS-safe |
| Prose typography styling | Custom CSS for headings/paragraphs | `@tailwindcss/typography` `prose` class | Handles all heading levels, lists, blockquotes, code, links in one class |
| Formspree form submission | Custom fetch wrapper | Native `fetch` with Formspree REST API | No library needed — Formspree's REST API is a single `fetch` call |
| Form field validation | A validation library | Inline validation in handleSubmit | Only 3 fields, simple rules; a library (react-hook-form, zod) adds complexity for no gain here |
| Markdown frontmatter type checking | Runtime `typeof` guards | Zod schemas already in `src/lib/markdown.ts` (Phase 1) | Already implemented — do not add a second validation layer |

---

## Common Pitfalls

### Pitfall 1: `ParsedProject` shape — property access after migration

**What goes wrong:** After migrating from `src/data/projects.ts` (`Project[]`) to `src/content/loader.ts` (`ParsedProject[]`), code that accesses `project.slug` will fail because the field is now at `project.meta.slug`.

**Why it happens:** The loader exports `ParsedProject[]` which has `{ meta: ProjectMeta, body: string }` shape — not a flat object.

**How to avoid:** When migrating any component, do a global search for `project.slug`, `project.title`, `project.color`, `project.year`, etc. and update all to `project.meta.slug`, `project.meta.title`, etc.

**Warning signs:** TypeScript will catch this immediately — `Property 'slug' does not exist on type 'ParsedProject'`. Fix all TypeScript errors before running the dev server.

### Pitfall 2: `@tailwindcss/typography` v4 plugin activation

**What goes wrong:** Adding `@plugin "@tailwindcss/typography"` before `@import "tailwindcss"` or in a separate file causes the plugin to not apply.

**Why it happens:** Tailwind v4 `@plugin` must follow after the `@import "tailwindcss"` statement. The `@plugin` directive is processed in order. If placed before the import, the theme variables it depends on don't exist yet.

**How to avoid:** In `src/index.css`:
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
/* @theme block follows */
```

**Warning signs:** `prose` class applies no styles. Inspect element shows no typography CSS variables.

### Pitfall 3: Scroll lock race condition — still not fixed in Phase 2 start

**What goes wrong:** `HomePage.tsx` still has the v1 `setTimeout(900ms)` scroll lock directly on `document.body.style.overflow`. `ProjectModal.tsx` also directly writes `document.body.style.overflow`. Both operate independently.

**Why it happens:** Phase 1 implemented `useScrollLock` but Phase 2 hasn't yet migrated the callers to use it.

**How to avoid:** In Phase 2, when touching `HomePage.tsx` (data migration task) and `ProjectModal.tsx` (type migration task), simultaneously replace the direct `document.body.style.overflow` writes with calls to `useScrollLock`. This should be part of each migration task, not a separate task.

**Warning signs:** User clicks modal fast after page load, closes it, page is scroll-locked. Requires page reload.

### Pitfall 4: `framer-motion` import in existing files not yet migrated

**What goes wrong:** `ProjectModal.tsx` imports from `"framer-motion"` (line 2: `import { motion, AnimatePresence } from "framer-motion"`). Phase 1 standardized on `"motion/react"` but did not migrate existing files.

**How to avoid:** When touching `ProjectModal.tsx` in Phase 2, update the import to `from "motion/react"`. Keep the codebase on one import path.

### Pitfall 5: CaseStudyPage does not get max-width container

**What goes wrong:** `CaseStudyPage` is a new page added inside `RootLayout`. `RootLayout` applies `max-w-[1800px]` to the root div, but the internal padding and layout must be set in `CaseStudyPage` itself. Forgetting to add `pt-[130px]` (to clear the fixed navbar at 130px height) makes content render behind the navbar.

**How to avoid:** Use `pt-[130px] md:pt-[180px]` (same pattern as `AboutPage` uses `md:pt-[180px]`). The navbar is `h-16` (64px) on mobile, `h-[130px]` on desktop — clear accordingly.

### Pitfall 6: `react-markdown` React 19 peer dep install failure

**What goes wrong:** `pnpm add react-markdown` may fail or warn due to React 19 peer dep declaration mismatch in the package.

**How to avoid:** Use `pnpm add react-markdown remark-gfm` first. If it fails, add `--legacy-peer-deps` flag. Alternatively, add to `package.json` pnpm.overrides:
```json
"pnpm": {
  "overrides": {
    "react-markdown": { "peerDependencies": { "react": ">=18" } }
  }
}
```

### Pitfall 7: About page — structured data vs markdown body

**What goes wrong:** `AboutPage.tsx` currently renders `aboutData` (from `src/data/about.ts`) as structured TypeScript arrays. `about.md` body has the same content in natural markdown. If Phase 2 switches to markdown rendering but `about.md` body is minimal prose (not matching the existing UI sections), the redesigned about page looks broken.

**How to avoid:** Before migrating `AboutPage`, inspect `src/content/about.md` body content (it has `## Strengths` and `## Philosophy` sections with bullet lists). The `prose` + `react-markdown` approach will render these correctly. The current about page renders the same content as TypeScript arrays — the switch is safe. After migration, `src/data/about.ts` can be removed.

---

## Code Examples

### Project data access after migration

```typescript
// src/components/home/ProjectGrid.tsx — after migration
import { projects } from "@/content/loader";  // ParsedProject[]

// projects[0].meta.slug  ← correct
// projects[0].slug       ← WRONG — TypeScript error

const leftCol = projects.filter((_, i) => i % 2 === 0);

{leftCol.map((project) => (
  <ProjectCard
    key={project.meta.slug}   // ← use project.meta.slug
    project={project.meta}    // ← pass ProjectMeta only, not ParsedProject
    onClick={() => onProjectClick(project.meta.slug)}
  />
))}
```

### CaseStudyContent component

```typescript
// src/components/case-study/CaseStudyContent.tsx
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CaseStudyContentProps {
  body: string;
}

export default function CaseStudyContent({ body }: CaseStudyContentProps) {
  return (
    <div className="prose prose-lg max-w-[720px] mt-12
      prose-headings:font-medium prose-headings:text-text-primary
      prose-p:text-text-primary prose-p:leading-relaxed
      prose-li:text-text-primary
      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
      prose-strong:text-text-primary
      prose-hr:border-border
    ">
      <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
    </div>
  );
}
```

### Formspree integration pattern

```typescript
// Minimal Formspree fetch — no library needed
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("submitting");
  try {
    const res = await fetch(contactData.formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
    });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) setForm({ name: "", email: "", message: "" });
  } catch {
    setStatus("error");
  }
};
```

### Tailwind v4 typography plugin activation

```css
/* src/index.css — correct order */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@font-face { ... }

@theme { ... }

@layer base { ... }
```

### CaseStudyPage with 404 redirect

```typescript
// src/pages/CaseStudyPage.tsx
import { useParams, Navigate } from "react-router-dom";
import { getProject } from "@/content/loader";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <Navigate to="/" replace />;

  return (
    <article className="px-6 pt-16 pb-24 md:px-8 md:pt-[130px]">
      {/* Header: title, tags, year, role */}
      <header className="max-w-[720px] pt-12 md:pt-20">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.meta.tags.map((tag) => (
            <span key={tag} className="text-[12px] uppercase tracking-[0.1em] text-text-secondary border border-border px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-[clamp(32px,4vw,64px)] leading-[1.1] tracking-tight font-medium text-text-primary">
          {project.meta.title}
        </h1>
        <p className="mt-4 text-[18px] text-text-secondary">{project.meta.subtitle}</p>
      </header>

      {/* Metadata row */}
      <div className="mt-8 max-w-[720px] grid grid-cols-2 gap-6 md:grid-cols-4 border-t border-b border-border py-6">
        <div>
          <p className="text-[12px] uppercase tracking-[0.1em] text-text-secondary">Year</p>
          <p className="mt-1 text-[14px] text-text-primary">{project.meta.year}</p>
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.1em] text-text-secondary">Role</p>
          <p className="mt-1 text-[14px] text-text-primary">{project.meta.role}</p>
        </div>
      </div>

      {/* Markdown body */}
      <CaseStudyContent body={project.body} />
    </article>
  );
}
```

### Navbar — extend active state to case study routes

```typescript
// src/components/layout/Navbar.tsx — update isActive check
const isActive =
  item.to === "/"
    ? location.pathname === "/" || location.pathname.startsWith("/case-studies")
    : location.pathname.startsWith(item.to);
```

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|------------------|-------|
| `src/data/projects.ts` TS constants | `src/content/loader.ts` markdown pipeline | Phase 2 migration target |
| `import ... from "framer-motion"` | `import ... from "motion/react"` | Phase 1 already did this in new files; Phase 2 migrates existing files |
| `document.body.style.overflow` direct writes | `useScrollLock` hook (reference-counted) | Phase 1 built the hook; Phase 2 migrates callers |
| Form with `e.preventDefault()` no-op | Form with Formspree fetch + validation + status | Phase 2 wires this up |
| `AboutPage` renders TS data arrays | `AboutPage` renders `about.md` body via `react-markdown` | Phase 2 migration |

---

## Open Questions

1. **`thumbnail` vs `coverImage` field in ProjectSchema**
   - What we know: CONT-01 lists `thumbnail` as a required frontmatter field. The current `ProjectSchema` in `src/lib/markdown.ts` has `coverImage: z.string().optional()`. The markdown files don't include `coverImage` values — they use gradient placeholders in the UI.
   - What's unclear: Should Phase 2 rename `coverImage` to `thumbnail` for CONT-01 compliance, or is `coverImage` sufficient? Are real images being added in Phase 2 or later?
   - Recommendation: Keep `coverImage` as the field name (it's more descriptive). Add a note in the schema that this maps to CONT-01's `thumbnail` requirement. Real images are a "nice to have" for Phase 2 — keep gradient placeholders if no images are available. The field is already `.optional()`, so no breaking change.

2. **Case study page body content — placeholders vs real content**
   - What we know: All 4 project `.md` files have placeholder bodies ("Whales Market case study content goes here. This body will be rendered in Phase 2 when CaseStudyPage is built.").
   - What's unclear: Does the user want to write real case study prose in Phase 2, or is building the rendering infrastructure sufficient for Phase 2 completion?
   - Recommendation: Build the rendering infrastructure in Phase 2. Leave a task note that users should update markdown body content. CONT-02 only requires that "markdown content renders correctly with proper typography" — the rendering mechanism satisfies this requirement; the content can be populated later.

3. **ProjectCard interaction model — modal only vs link + modal**
   - What we know: `ProjectCard` is a `<button>` that opens the modal. LAYO-06 requires the modal. No requirement explicitly says the card must also link to the case study page.
   - What's unclear: Should card click open the modal, navigate to case study, or both? The sam-smith.design reference uses full-page case studies.
   - Recommendation: Add a "View case study →" link in the `ProjectModal` footer for Phase 2. Keep card click = modal. This satisfies LAYO-06 (modal) without changing the home page interaction model. Reassess in Phase 4 if the UX feels insufficient.

4. **`src/data/about.ts` deletion timing**
   - What we know: `AboutPage.tsx` imports from `src/data/about.ts`. `about.md` has the same content. Phase 2 migrates `AboutPage` to `about.md`.
   - Recommendation: Delete `src/data/about.ts` as part of the `AboutPage` migration task. Also delete `src/data/projects.ts` after `ProjectGrid`, `ProjectCard`, `ProjectModal`, and `HomePage` are all migrated. Clean deletion avoids dead code.

---

## Implementation Sequence Recommendation

For planning purposes, this is the recommended task order (dependency-safe):

1. **Install packages** — `pnpm add react-markdown remark-gfm @tailwindcss/typography`, add `@plugin` to `index.css`. No code changes. Verifiable immediately.

2. **Migrate HomePage + ProjectGrid + ProjectCard to loader data** — Update imports, fix `project.meta.*` access, add `useScrollLock` to HomePage (replacing the `setTimeout` pattern). Migrate `ProjectModal` type. Delete `src/data/projects.ts` at end.

3. **Build CaseStudyPage** — Create `src/pages/CaseStudyPage.tsx`, `src/components/case-study/CaseStudyHeader.tsx`, `src/components/case-study/CaseStudyContent.tsx`. Add route to `router.tsx`. Add "View case study →" link in `ProjectModal`. Update Navbar active state.

4. **Migrate AboutPage to markdown body** — Replace `aboutData` import with `about` from loader. Render `about.body` via `react-markdown` in prose wrapper. Delete `src/data/about.ts`.

5. **Wire Formspree in ContactPage** — Add validation, status states, `fetch` POST to Formspree endpoint, success/error UI. Provide user_setup note for `PLACEHOLDER` replacement.

6. **Responsive audit** — Test all pages at mobile (375px), tablet (768px), desktop (1280px). Fix touch targets, text scaling, layout gaps. Verify min-44px tap targets on all interactive elements.

---

## Sources

### Primary (HIGH confidence)

- Codebase analysis — `src/content/loader.ts`, `src/lib/markdown.ts`, all page and component files — verified actual implementation state
- `src/lib/animations.ts`, `src/hooks/useScrollLock.ts`, `src/components/common/AnimatedSection.tsx` — Phase 1 deliverables confirmed in place
- `package.json` — confirmed installed packages (gray-matter 4.0.3, zod 4.3.6, framer-motion 12.34.3, react-router-dom 7.13.1). `react-markdown`, `remark-gfm`, `@tailwindcss/typography` NOT yet installed.
- `src/index.css` — confirmed light theme (`#fafafa` bg, `#1a1a1a` text), Tailwind v4 `@layer base` pattern in use
- `.planning/phases/01-foundation/01-03-SUMMARY.md` — confirmed Phase 1 complete, all content files exist, TypeScript clean
- [react-markdown GitHub](https://github.com/remarkjs/react-markdown) — react-markdown v10 API: default export `Markdown`, `remarkPlugins` prop
- [Formspree REST API docs](https://help.formspree.io/hc/en-us/articles/360013470814-How-to-submit-an-HTML-form-with-AJAX) — `fetch` POST with `Accept: application/json` header pattern

### Secondary (MEDIUM confidence)

- [Tailwind v4 + typography plugin](https://github.com/tailwindlabs/tailwindcss/discussions/17645) — `@plugin "@tailwindcss/typography"` directive placement after `@import "tailwindcss"` required
- `.planning/research/PITFALLS.md` — Pitfall 2 (unlayered CSS), Pitfall 4 (gray-matter type safety), Pitfall 9 (scroll lock race condition), Pitfall 10 (border color default), Pitfall 12 (framer-motion import path)
- `.planning/research/ARCHITECTURE.md` — CaseStudyPage pattern, data flow diagrams, build order

### Tertiary (LOW confidence)

- None — all critical claims verified from codebase or official docs.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages confirmed from package.json; new packages (react-markdown, @tailwindcss/typography) verified from official docs
- Architecture: HIGH — based on direct codebase read, not assumptions
- Pitfalls: HIGH — all critical pitfalls verified against actual code in the codebase (not hypothetical)
- Formspree integration: MEDIUM — pattern is standard but depends on user creating Formspree account and providing form ID

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (stable dependencies; 30-day window)
