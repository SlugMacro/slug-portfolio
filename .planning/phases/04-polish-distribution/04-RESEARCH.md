# Phase 4: Polish & Distribution - Research

**Researched:** 2026-03-02
**Domain:** SEO meta tags, Open Graph, favicon, production build (React 19 SPA + Vite 7)
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| META-01 | Correct browser tab title and favicon | React 19 built-in `<title>` hoisting + favicon in `public/` + `index.html` link tag |
| META-02 | Open Graph meta tags for home, about, and contact pages | Two-layer approach: `vite-plugin-react-meta-map` for build-time HTML per route (crawlers) + React 19 `<meta>` for client navigation |
| META-03 | Per-project OG meta tags (title, description, image from frontmatter) | Same two-layer approach with dynamic data from frontmatter; OG image requires placeholder or generation strategy |
</phase_requirements>

## Summary

Phase 4 addresses three requirements: browser tab titles + favicon (META-01), Open Graph tags for static pages (META-02), and per-project OG tags from frontmatter (META-03). The site is a pure client-side SPA (React 19 + Vite 7 + React Router v7) with no SSR. This creates a fundamental tension for OG tags: social media crawlers (Slack, LinkedIn, Facebook, Twitter) do NOT execute JavaScript -- they read raw HTML only. Any `<meta>` tags rendered by React at runtime are invisible to crawlers.

The solution is a two-layer approach. **Layer 1 (build-time):** Use `vite-plugin-react-meta-map` to generate a separate `.html` file per route at build time, each containing the correct OG tags baked into the static HTML. Social crawlers receive these pre-built HTML files with correct metadata. **Layer 2 (runtime):** Use React 19's built-in `<title>` and `<meta>` component hoisting to update browser tab titles during client-side navigation. This covers the in-app user experience where titles change as users click between routes.

For the favicon, place the file in `public/` and reference it with an absolute path in the page template. No favicon currently exists in the project -- one must be created or sourced. The `coverImage` field exists in the ProjectSchema but is optional and currently unused by any project markdown file. OG images for case studies will need a strategy -- either placeholder images added to `public/`, or the `og:image` tag is omitted until real thumbnails are available.

**Primary recommendation:** Use `vite-plugin-react-meta-map` for build-time OG tags in static HTML per route, React 19 native `<title>` for runtime browser tab titles, and a `useDocumentTitle` custom hook for consistency.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React 19 | ^19.2.0 | Built-in `<title>` and `<meta>` hoisting to `<head>` | Native feature, zero dependencies, already in project |
| vite-plugin-react-meta-map | latest | Generate per-route static HTML with OG meta at build time | Purpose-built for React+Vite SPA OG problem without SSR |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none) | - | - | No additional runtime dependencies needed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| vite-plugin-react-meta-map | react-helmet-async | Does NOT work for social crawlers (client-only); also has React 19 peer dep conflict |
| vite-plugin-react-meta-map | @dr.pogodin/react-helmet | React 19 compatible fork of helmet, but still client-only -- crawlers won't see tags |
| vite-plugin-react-meta-map | Serverless function (Vercel/Netlify) | Ties deployment to specific platform; overkill for 4 known routes |
| vite-plugin-react-meta-map | vite-plugin-prerender (Puppeteer) | Heavy dependency (Puppeteer); slower builds; more moving parts |
| Custom `useDocumentTitle` hook | react-helmet-async | Hook is 5 lines of code; helmet is 15KB with React 19 incompatibility |

**Installation:**
```bash
pnpm add -D vite-plugin-react-meta-map
```

## Architecture Patterns

### Recommended Project Structure
```
public/
  favicon.svg              # SVG favicon (scalable, crisp)
  og-default.png           # Default OG image (1200x630)
src/
  seo/
    pageMetaMap.ts          # Route -> metadata mapping for build-time HTML
    PageTemplate.tsx        # HTML template component for vite-plugin-react-meta-map
    siteMetadata.ts         # Centralized site-wide SEO constants
  hooks/
    useDocumentTitle.ts     # Custom hook for runtime browser tab title
  pages/
    HomePage.tsx            # Adds <title> for runtime
    AboutPage.tsx           # Adds <title> for runtime
    ContactPage.tsx         # Adds <title> for runtime
    CaseStudyPage.tsx       # Adds <title> with dynamic project name for runtime
```

### Pattern 1: Two-Layer Meta Tag Strategy
**What:** Separate build-time (crawlers) and runtime (users) meta tag concerns.
**When to use:** Any SPA that needs social sharing previews without SSR.

**Build-time layer** (`vite-plugin-react-meta-map`):
```typescript
// src/seo/pageMetaMap.ts
export interface PageMetaData {
  url: string;
  bundleEntryPoint: string;
  title: string;
  description: string;
  ogImage: string;
  ogType: string;
}

export const pages: PageMetaData[] = [
  {
    url: "index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Slug Macro | Product Designer",
    description: "Product Designer focused on trading systems and AI-native products.",
    ogImage: "/og-default.png",
    ogType: "website",
  },
  {
    url: "about/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "About | Slug Macro",
    description: "Product Designer focused on trading systems and AI-native products.",
    ogImage: "/og-default.png",
    ogType: "website",
  },
  {
    url: "contact/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Contact | Slug Macro",
    description: "Have a project in mind? Let's create something great together.",
    ogImage: "/og-default.png",
    ogType: "website",
  },
  {
    url: "case-studies/whales-market/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Whales Market | Slug Macro",
    description: "Advanced Trading Platform cho giao dich Pre-Market...",
    ogImage: "/og-default.png",
    ogType: "article",
  },
  // ... one entry per case study slug
];
```

**HTML template** (`src/seo/PageTemplate.tsx`):
```tsx
// src/seo/PageTemplate.tsx
import type { PageMetaData } from "./pageMetaMap";

const PageTemplate: React.FC<PageMetaData> = ({
  title,
  description,
  ogImage,
  ogType,
}) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
);

export default PageTemplate;
```

**Vite config integration:**
```typescript
// vite.config.ts
import metaMapPlugin from "vite-plugin-react-meta-map";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    metaMapPlugin({
      pageMetaMapFilePath: "./src/seo/pageMetaMap.ts",
      pageTemplateFilePath: "./src/seo/PageTemplate.tsx",
    }),
  ],
  // ...
});
```

### Pattern 2: Runtime Browser Tab Title via React 19 Native `<title>`
**What:** Use React 19's built-in `<title>` component for client-side title updates.
**When to use:** Every page component.

```tsx
// Inside each page component, e.g. AboutPage.tsx
export default function AboutPage() {
  return (
    <>
      <title>About | Slug Macro</title>
      {/* ... rest of component */}
    </>
  );
}

// Dynamic title for CaseStudyPage.tsx
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <article>
      <title>{`${project.meta.title} | Slug Macro`}</title>
      {/* ... rest of component */}
    </article>
  );
}
```

### Pattern 3: Favicon Setup
**What:** Place favicon in `public/` and reference in the page template.
**When to use:** One-time setup.

```
public/
  favicon.svg    # Primary: SVG for modern browsers (scalable)
  favicon.ico    # Fallback: ICO for legacy browsers (optional)
```

The favicon link tag goes in `PageTemplate.tsx` (for build-time HTML) and also needs to be in `index.html` during development. For development, add to `index.html`:
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
```

### Anti-Patterns to Avoid
- **Using react-helmet-async with React 19:** Peer dependency conflict (`react@"^16.6.0 || ^17.0.0 || ^18.0.0"`). Would require `--legacy-peer-deps` and still won't help crawlers.
- **Relying solely on React 19 `<meta>` for OG tags:** Social crawlers don't execute JS. Tags rendered at runtime are invisible to Slack/LinkedIn/Facebook.
- **Putting OG image URLs as relative paths:** OG image URLs must be absolute (e.g., `https://slugmacro.com/og-default.png`). Relative paths fail for crawlers.
- **Rendering multiple `<title>` components simultaneously:** React 19 docs warn this causes undefined browser behavior. Ensure only one `<title>` renders per route.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Per-route static HTML with meta tags | Custom Vite plugin or post-build script | `vite-plugin-react-meta-map` | Handles Vite's asset injection, code splitting, CSS loading correctly |
| Browser tab title management | Complex title provider context | React 19 native `<title>` | Built-in, zero overhead, automatically hoists to `<head>` |
| Favicon generation (multi-format) | Manual export in 10 sizes | Single SVG favicon | SVG scales to all sizes; ICO fallback only if legacy browser support needed |
| OG image generation | Canvas-based dynamic image builder | Static placeholder image | Dynamic OG image generation is a server-side concern; overkill for 4 case studies |

**Key insight:** The hardest problem in this phase is not the code -- it's the SPA vs. crawler mismatch. The build-time HTML generation via `vite-plugin-react-meta-map` is the minimal solution that actually works without SSR.

## Common Pitfalls

### Pitfall 1: OG Tags Only in React Components (Invisible to Crawlers)
**What goes wrong:** Developer adds `<meta property="og:title" ...>` in React components, tests by viewing page source in browser (which shows rendered DOM), declares it working. Then Slack/LinkedIn previews show generic "Slug Portfolio" or blank.
**Why it happens:** Browser DevTools show the live DOM (post-JS-execution). Social crawlers see the raw HTML response (pre-JS-execution).
**How to avoid:** Use `vite-plugin-react-meta-map` for build-time HTML. Verify by using `curl` on the built files to check raw HTML contains OG tags.
**Warning signs:** `curl dist/case-studies/whales-market/index.html | grep og:title` returns nothing.

### Pitfall 2: Relative OG Image URLs
**What goes wrong:** `<meta property="og:image" content="/og-default.png" />` -- crawlers often need absolute URLs.
**Why it happens:** Relative URLs work in browsers but many OG crawlers don't resolve them.
**How to avoid:** Use absolute URLs with the production domain: `https://slugmacro.com/og-default.png`. Store the base URL in `siteMetadata.ts` and construct absolute OG image URLs.
**Warning signs:** LinkedIn debugger shows "no image found" despite image existing.

### Pitfall 3: Missing OG Images for Case Studies
**What goes wrong:** The `coverImage` field in ProjectSchema is optional and currently no project has it set. OG tags reference non-existent images.
**Why it happens:** Content was scaffolded with placeholder body text; images were deferred.
**How to avoid:** Either (a) add actual thumbnail images to `public/` and reference them in frontmatter, or (b) use a single default OG image for all pages until real images are available. Option (b) is pragmatic for launch.
**Warning signs:** `og:image` meta tag points to 404.

### Pitfall 4: Duplicate `<title>` Tags from Build + Runtime
**What goes wrong:** Build-time HTML has `<title>Whales Market | Slug Macro</title>` in `<head>`, then React 19 renders another `<title>` at runtime. Two title tags in DOM.
**Why it happens:** The build-time HTML sets an initial title, and React's runtime hoisting adds another.
**How to avoid:** This is actually fine -- React 19's `<title>` hoisting replaces the existing title in the DOM. The build-time title serves crawlers; the runtime title serves users navigating via client-side routing. They work together, not against each other.
**Warning signs:** None -- this is expected behavior.

### Pitfall 5: Vite Build Errors from Plugin Misconfiguration
**What goes wrong:** `pnpm build` fails because `vite-plugin-react-meta-map` can't find the template or map file, or the generated HTML has broken asset paths.
**Why it happens:** Incorrect file paths in plugin config, or the template doesn't include `<div id="root"></div>`.
**How to avoid:** Template MUST contain an element with `id="root"`. File paths in plugin config must be relative to project root. Test with `pnpm build && pnpm preview` after adding the plugin.
**Warning signs:** Build errors mentioning "Cannot find module" or blank pages on preview.

### Pitfall 6: Case Study Routes Need Nested Directories
**What goes wrong:** Generated HTML for `/case-studies/whales-market` needs to be at `dist/case-studies/whales-market/index.html` for the hosting platform to serve it correctly.
**Why it happens:** SPA hosting typically serves `index.html` for any route. But for OG tag purposes, each route needs its own `index.html` with route-specific meta tags.
**How to avoid:** Set the `url` field in `pageMetaMap` to `case-studies/whales-market/index.html` (with nested directory). The plugin generates the correct directory structure.
**Warning signs:** 404 on case study URLs when deployed.

## Code Examples

### Site Metadata Constants
```typescript
// src/seo/siteMetadata.ts
export const SITE_NAME = "Slug Macro";
export const SITE_DESCRIPTION = "Product Designer focused on trading systems and AI-native products.";
export const SITE_URL = "https://slugmacro.com"; // Update with actual domain
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export function pageTitle(page: string): string {
  return page ? `${page} | ${SITE_NAME}` : SITE_NAME;
}

export function ogImageUrl(path?: string): string {
  return path ? `${SITE_URL}${path}` : DEFAULT_OG_IMAGE;
}
```

### Building pageMetaMap from Content Loader Data
```typescript
// src/seo/pageMetaMap.ts
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, DEFAULT_OG_IMAGE } from "./siteMetadata";

// NOTE: This file is consumed at build time by vite-plugin-react-meta-map.
// It must export `pages` as a named export with the correct interface.

export interface PageMetaData {
  url: string;
  bundleEntryPoint: string;
  title: string;
  description: string;
  ogImage: string;
  ogType: string;
  ogUrl: string;
}

const staticPages: PageMetaData[] = [
  {
    url: "index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `${SITE_NAME} | Product Designer`,
    description: SITE_DESCRIPTION,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    ogUrl: SITE_URL,
  },
  {
    url: "about/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `About | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    ogUrl: `${SITE_URL}/about`,
  },
  {
    url: "contact/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `Contact | ${SITE_NAME}`,
    description: "Have a project in mind? Let's create something great together.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    ogUrl: `${SITE_URL}/contact`,
  },
];

// Case study pages generated from project slugs
const caseStudyPages: PageMetaData[] = [
  {
    url: "case-studies/whales-market/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `Whales Market | ${SITE_NAME}`,
    description: "Advanced Trading Platform cho giao dich Pre-Market, tap trung vao nhom pro traders va high-frequency users.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    ogUrl: `${SITE_URL}/case-studies/whales-market`,
  },
  {
    url: "case-studies/whales-predict/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `Whales Predict | ${SITE_NAME}`,
    description: "Prediction Market cho trader dat cuoc vao outcome cua token/event.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    ogUrl: `${SITE_URL}/case-studies/whales-predict`,
  },
  {
    url: "case-studies/mention-network/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `Mention Network | ${SITE_NAME}`,
    description: "AI Visibility & Generative Engine Optimization (GEO) platform.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    ogUrl: `${SITE_URL}/case-studies/mention-network`,
  },
  {
    url: "case-studies/geo-report/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `GeoReport | ${SITE_NAME}`,
    description: "Cong cu danh gia mot website co AI-friendly hay khong.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    ogUrl: `${SITE_URL}/case-studies/geo-report`,
  },
];

export const pages: PageMetaData[] = [...staticPages, ...caseStudyPages];
```

### React 19 Native Title in Page Components
```tsx
// Pattern for static pages
export default function AboutPage() {
  return (
    <>
      <title>About | Slug Macro</title>
      <div className="relative">
        {/* existing component JSX */}
      </div>
    </>
  );
}

// Pattern for dynamic pages (case studies)
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <Navigate to="/" replace />;

  return (
    <article className="px-6 pt-20 pb-24 md:px-8 md:pt-[130px]">
      <title>{`${project.meta.title} | Slug Macro`}</title>
      <CaseStudyHeader meta={project.meta} />
      <CaseStudyContent body={project.body} />
    </article>
  );
}
```

### Verifying Build Output
```bash
# After build, verify each route has its own index.html with OG tags
pnpm build

# Check that OG tags exist in the raw HTML (what crawlers see)
grep -r "og:title" dist/
grep -r "og:description" dist/
grep -r "og:image" dist/

# Verify no broken asset references
# Preview locally
pnpm preview
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| react-helmet | react-helmet-async | 2020+ | Original react-helmet is unmaintained; async fork handles SSR |
| react-helmet-async | React 19 native `<title>` / `<meta>` | Dec 2024 (React 19 release) | Built-in support eliminates runtime dependency for simple cases |
| Manual `document.title` in `useEffect` | React 19 `<title>` component | Dec 2024 | Declarative, automatically hoisted, SSR-compatible |
| SSR for OG tags | Build-time HTML generation (vite-plugin-react-meta-map) | 2024+ | No SSR infrastructure needed; works for known routes |

**Deprecated/outdated:**
- **react-helmet** (original): Unmaintained since 2020. Use React 19 native support instead.
- **react-helmet-async**: Peer dep conflict with React 19. Use `@dr.pogodin/react-helmet` if you absolutely need helmet API, but prefer native React 19 features.
- **prerender-spa-plugin**: Webpack-era tool, not maintained since 2019. Do not use with Vite.

## Open Questions

1. **OG Image Assets**
   - What we know: The `coverImage` field exists in `ProjectSchema` as optional, but no project currently uses it. No image files exist in the project at all.
   - What's unclear: Whether the user has OG images ready, or whether a generic placeholder is acceptable for launch.
   - Recommendation: Create a single default OG image (`og-default.png`, 1200x630px) with the site name/branding. Add `coverImage` to frontmatter later when real project thumbnails are available. The code should support per-project images but fallback to the default.

2. **Production Domain URL**
   - What we know: OG image URLs must be absolute. The site domain is not yet confirmed.
   - What's unclear: Where the site will be deployed (Vercel, Netlify, GitHub Pages, custom domain).
   - Recommendation: Store the base URL in `siteMetadata.ts` as a constant. Use a placeholder (`https://slugmacro.com`) that gets updated before deployment. For hosting platforms that rewrite all routes to `index.html`, the `vite-plugin-react-meta-map` output may need hosting configuration to serve the correct `index.html` per route.

3. **Hosting Route Configuration**
   - What we know: The plugin generates `dist/case-studies/whales-market/index.html`. Most static hosts (Netlify, Vercel) serve `index.html` from directories automatically.
   - What's unclear: Whether the target hosting platform's rewrite rules will serve the route-specific HTML or always serve the root `index.html`.
   - Recommendation: Test with `pnpm preview` locally. For Netlify/Vercel, the directory-based `index.html` files should be served before any SPA fallback rewrite kicks in.

4. **vite-plugin-react-meta-map Vite 7 Compatibility**
   - What we know: The plugin uses Vite's `transformIndexHtml` hooks internally. It is relatively new and small (19 GitHub stars).
   - What's unclear: Whether it has been tested with Vite 7 specifically.
   - Recommendation: Install and test immediately. If it fails, the fallback is to write a simple custom Vite plugin using the `transformIndexHtml` hook directly, or use a post-build script that duplicates `index.html` per route with injected meta tags.

## Sources

### Primary (HIGH confidence)
- [React 19 Release Blog](https://react.dev/blog/2024/12/05/react-19) - Document metadata support, `<title>` and `<meta>` hoisting
- [React `<meta>` API Reference](https://react.dev/reference/react-dom/components/meta) - Props, `name`/`property` support, caveats
- [React `<title>` API Reference](https://react.dev/reference/react-dom/components/title) - Hoisting behavior, single-title warning
- [Vite Static Asset Handling](https://vite.dev/guide/assets) - Public directory serving behavior

### Secondary (MEDIUM confidence)
- [vite-plugin-react-meta-map GitHub](https://github.com/dqhendricks/vite-plugin-react-meta-map) - Plugin API, configuration, PageTemplate pattern
- [react-helmet-async GitHub Issues #238, #239, #244](https://github.com/staylor/react-helmet-async/issues/238) - React 19 peer dep incompatibility confirmed
- [React 19 Open Graph support](https://medium.com/@ahmedqeshta1999/managing-document-metadata-in-react-js-19-a2f43e9c5058) - `property` attribute support for OG tags in React 19
- [OG tags in client-side rendered apps](https://whatabout.dev/open-graph-facebook-and-client-side-rendering/) - Crawlers don't execute JS; need server/build-time HTML

### Tertiary (LOW confidence)
- [vite-plugin-react-meta-map npm/Vite 7 compatibility](https://github.com/dqhendricks/vite-plugin-react-meta-map/releases) - No explicit Vite 7 mention; needs testing

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - React 19 native `<title>`/`<meta>` is documented in official React docs; favicon in `public/` is standard Vite pattern
- Architecture: HIGH - Two-layer approach (build-time HTML + runtime title) is well-established for SPAs needing OG support
- Pitfalls: HIGH - SPA+OG crawler mismatch is thoroughly documented across multiple sources
- vite-plugin-react-meta-map: MEDIUM - Plugin is small/niche but architecture is sound; Vite 7 compatibility unconfirmed

**Research date:** 2026-03-02
**Valid until:** 2026-04-01 (30 days -- stable domain, React 19 and Vite 7 are released)
