# Slug Portfolio

## What This Is

A personal portfolio website for Slug Macro — a product builder specializing in trading infrastructure and AI-native products. The site showcases case studies and personal brand. It's a rebuild of an existing React portfolio, keeping the same layout (inspired by sam-smith.design) but with cleaner architecture, markdown-based content, proper responsive design, and smooth animations.

## Core Value

The portfolio must present Slug Macro's work clearly and beautifully — with a layout that feels premium, animations that feel fluid, and content that's easy to update without touching component code.

## Requirements

### Validated

<!-- Existing capabilities from v1 codebase -->

- ✓ Fixed hero + scrolling grid parallax layout — existing
- ✓ 4-column navbar (SM | Case studies | About | Let's collaborate) with active indicator — existing
- ✓ Staggered 2-column project grid with divider — existing
- ✓ Project modal via query params — existing
- ✓ About page (fixed hero left, scrolling content right) — existing
- ✓ Contact page with form — existing
- ✓ Footer with accent background — existing
- ✓ Max-width 1800px, left-aligned — existing
- ✓ Light theme (#fafafa bg, #e0e0e0 borders) — existing
- ✓ Aeonik Pro font system (400, 500, 700) — existing
- ✓ Tailwind CSS v4 with custom theme variables — existing

### Active

<!-- Rebuild goals — what v2 must deliver -->

- [ ] Clean, well-organized file/folder structure with clear separation of concerns
- [ ] Markdown-based content system for projects, about, and contact data
- [ ] Fully responsive layouts (mobile, tablet, desktop) with polished breakpoints
- [ ] Smooth page transitions between routes
- [ ] Scroll-driven animations (fade-in, slide-up on project cards, sections)
- [ ] Parallax effects on hero and grid interaction
- [ ] Micro-interactions on hover states (cards, nav items, buttons)
- [ ] Type-safe markdown parsing with frontmatter support
- [ ] Build-time or runtime markdown rendering for case study content
- [ ] Case study detail pages with rich markdown content (not just modal)

### Out of Scope

- Dark/light theme toggle — not needed for showcase purpose
- Headless CMS integration — markdown files are sufficient
- Blog/writing section — focus on case studies only
- Authentication or admin panel — static site
- Backend/API — purely frontend
- i18n/multilingual — single language only

## Context

This is a brownfield rebuild. The existing v1 codebase (branch `v1-backup`) has a working portfolio with all pages and layout. The rebuild keeps the same visual design but rewrites the code with:

- Better component architecture and file organization
- Content extracted from components into markdown files
- Framer Motion animations throughout
- Proper responsive design across all breakpoints

**Reference site:** sam-smith.design (layout inspiration)
**Existing code:** Available on `v1-backup` branch for reference

**Tech already decided (from v1):**
- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 with `@theme` system
- React Router v7 for routing
- Framer Motion for animations
- Aeonik Pro variable font (woff2 in public/fonts/)
- pnpm as package manager

## Constraints

- **Tech stack**: Must use React 19 + Vite 7 + Tailwind CSS v4 (established in v1)
- **Font**: Aeonik Pro (already converted and available in public/fonts/)
- **Layout**: sam-smith.design inspired — fixed hero, scrolling grid, 4-column nav, max-width 1800px left-aligned
- **Content**: All project/about/contact data in markdown files, not hardcoded in components
- **Performance**: Static site, no backend, fast load times
- **Color scheme**: Light theme — bg #fafafa, borders #e0e0e0, text #1a1a1a, accent #4c48ff

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Rebuild on same branch (main) | v1 backed up to v1-backup, clean main for v2 | — Pending |
| Markdown for content | Easy to update, no CMS overhead, git-tracked | — Pending |
| Framer Motion for animations | Already a dependency, React-native, good DX | — Pending |
| Keep sam-smith.design layout | Proven design that works, focus effort on code quality | — Pending |
| Aeonik Pro font | Already set up and converted, looks great | ✓ Good |

---
*Last updated: 2026-03-02 after initialization*
