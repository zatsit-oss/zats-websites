# Conditional Page Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable selective page generation via `DISABLED_PAGES` env var, removing specified pages from build output and hiding their navigation links.

**Architecture:** Add an env var to astro.config.mjs, create helper utilities in src/lib/pages.ts, register an Astro post-build hook that removes disabled page files, and update navigation components to conditionally render links based on page disabled status.

**Tech Stack:** Astro v5, TypeScript, standard Node.js fs/path modules

---

## Task 1: Add DISABLED_PAGES to astro.config.mjs env schema

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Read current astro.config.mjs**

Run: `cat corporate/astro.config.mjs`

- [ ] **Step 2: Add DISABLED_PAGES field to env.schema**

Add to env.schema in `corporate/astro.config.mjs`:

```typescript
      DISABLED_PAGES: envField.string({
        required: false,
        access: 'public',
        context: 'client',
        default: '',
      }),
```

- [ ] **Step 3: Verify syntax**

Run: `npx astro check` from corporate/ directory

Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add corporate/astro.config.mjs
git commit -m "feat(corporate): add DISABLED_PAGES env variable"
```

---

## Task 2: Create src/lib/pages.ts with helper utilities

**Files:**
- Create: `corporate/src/lib/pages.ts`

- [ ] **Step 1: Create the module**

Create file `corporate/src/lib/pages.ts`:

```typescript
import { DISABLED_PAGES } from 'astro:env/client'

export const ALWAYS_GENERATED_PAGES = ['index', 'legal-notice', 'privacy-policy']

export const CONTROLLABLE_PAGES = ['careers', 'find-us', 'join-us', 'team', 'tech']

export function getDisabledPages(): string[] {
  if (!DISABLED_PAGES || DISABLED_PAGES.trim() === '') {
    return []
  }
  return DISABLED_PAGES.split(',').map(slug => slug.trim())
}

export function isPageDisabled(slug: string): boolean {
  return getDisabledPages().includes(slug)
}
```

Note: Astro v5 env schema variables are imported directly from `astro:env/client` as named imports, not via `getSecret()`.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx astro check` from corporate/ directory

Expected: No errors in src/lib/pages.ts

- [ ] **Step 3: Commit**

```bash
git add corporate/src/lib/pages.ts
git commit -m "feat(corporate): create pages utility module with disabled pages helpers"
```

---

## Task 3: Create src/lib/build-hook.ts with post-build cleanup

**Files:**
- Create: `corporate/src/lib/build-hook.ts`

- [ ] **Step 1: Write the hook**

Create file `corporate/src/lib/build-hook.ts`:

```typescript
import { promises as fs } from 'fs'
import { join } from 'path'
import type { AstroIntegration } from 'astro'
import { ALWAYS_GENERATED_PAGES } from './pages'

export default function buildCleanup(): AstroIntegration {
  return {
    name: 'cleanup-disabled-pages',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const rawDisabled = process.env.DISABLED_PAGES ?? ''
        const disabledPages = rawDisabled
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)

        if (disabledPages.length === 0) {
          return
        }

        const distDir = dir.pathname

        for (const slug of disabledPages) {
          if (ALWAYS_GENERATED_PAGES.includes(slug)) {
            logger.warn(`Page "${slug}" is protected and cannot be disabled. Skipping.`)
            continue
          }

          const pagePath = join(distDir, slug, 'index.html')

          try {
            await fs.unlink(pagePath)
            logger.info(`Removed disabled page: /${slug}`)
          } catch (error: any) {
            if (error.code === 'ENOENT') {
              logger.warn(`Page file not found: ${pagePath} (was it generated?)`)
            } else {
              throw error
            }
          }
        }
      }
    }
  }
}
```

Note: The build hook reads `process.env.DISABLED_PAGES` directly because Astro's env schema is not available in integration hooks — only in component/page context. This is intentional.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx astro check` from corporate/ directory

Expected: No errors in src/lib/build-hook.ts

- [ ] **Step 3: Commit**

```bash
git add corporate/src/lib/build-hook.ts
git commit -m "feat(corporate): create build hook to remove disabled page files post-build"
```

---

## Task 4: Register the build hook in astro.config.mjs

**Files:**
- Modify: `corporate/astro.config.mjs`

- [ ] **Step 1: Add import at top of astro.config.mjs**

```typescript
import buildCleanup from './src/lib/build-hook.ts'
```

- [ ] **Step 2: Move tailwindcss to integrations and add buildCleanup**

The current config uses `vite: { plugins: [tailwindcss()] }`. Change to use `integrations` array:

```typescript
export default defineConfig({
  site: 'https://zatsit.fr',
  compressHTML: true,
  prefetch: {
    defaultStrategy: 'viewport',
  },
  integrations: [buildCleanup()],
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    // ... unchanged
  },
});
```

Note: tailwindcss stays in vite.plugins (it's a Vite plugin, not an Astro integration). Only buildCleanup goes in integrations.

- [ ] **Step 3: Verify no errors**

Run: `npx astro check` from corporate/ directory

Expected: No errors

- [ ] **Step 4: Test hook loads on build**

Run: `npm run build` from corporate/ directory with no DISABLED_PAGES set

Expected: Build succeeds, no cleanup output (nothing to remove)

- [ ] **Step 5: Commit**

```bash
git add corporate/astro.config.mjs
git commit -m "feat(corporate): register post-build cleanup hook in astro config"
```

---

## Task 5: Update Header.astro to conditionally render navigation links

**Files:**
- Modify: `corporate/src/components/Header.astro`

- [ ] **Step 1: Read current Header.astro**

Read full content of `corporate/src/components/Header.astro`

- [ ] **Step 2: Add import in frontmatter**

In the `---` frontmatter block, add:

```typescript
import { isPageDisabled } from '../lib/pages'
```

- [ ] **Step 3: Wrap all controllable page links**

Controllable slugs: `careers`, `find-us`, `join-us`, `team`, `tech`

For each nav link pointing to a controllable page, wrap with `{!isPageDisabled('slug') && ...}`.

Example:
```astro
{!isPageDisabled('team') && <a href="/team">Équipe</a>}
{!isPageDisabled('tech') && <a href="/tech">Technologies</a>}
{!isPageDisabled('careers') && <a href="/careers">Carrières</a>}
{!isPageDisabled('find-us') && <a href="/find-us">Nous trouver</a>}
{!isPageDisabled('join-us') && <a href="/join-us">Nous rejoindre</a>}
```

Links to `/`, `/legal-notice`, `/privacy-policy` must NOT be wrapped (always present).

- [ ] **Step 4: Commit**

```bash
git add corporate/src/components/Header.astro
git commit -m "feat(corporate): conditional nav links in Header based on DISABLED_PAGES"
```

---

## Task 6: Update Footer.astro to conditionally render links

**Files:**
- Modify: `corporate/src/components/Footer.astro`

- [ ] **Step 1: Read current Footer.astro**

Read full content of `corporate/src/components/Footer.astro`

- [ ] **Step 2: Add import in frontmatter**

```typescript
import { isPageDisabled } from '../lib/pages'
```

- [ ] **Step 3: Wrap all controllable page links**

Same pattern as Header — wrap each controllable page link. Leave home/legal/privacy unwrapped.

- [ ] **Step 4: Commit**

```bash
git add corporate/src/components/Footer.astro
git commit -m "feat(corporate): conditional nav links in Footer based on DISABLED_PAGES"
```

---

## Task 7: Search and update any other components with page links

**Files:**
- Modify: Any other `.astro` components in `corporate/src/` that link to controllable pages

- [ ] **Step 1: Search for all links to controllable pages**

Run:
```bash
grep -r "href=\"/careers\|href=\"/team\|href=\"/tech\|href=\"/find-us\|href=\"/join-us" corporate/src/components --include="*.astro"
```

Also check sections/:
```bash
grep -r "href=\"/careers\|href=\"/team\|href=\"/tech\|href=\"/find-us\|href=\"/join-us" corporate/src/components/sections --include="*.astro"
```

- [ ] **Step 2: Update each found component**

For each component found:
- Add `import { isPageDisabled } from '../lib/pages'` (adjust path based on depth)
- Wrap controllable page links with `{!isPageDisabled('slug') && ...}`

- [ ] **Step 3: Commit**

```bash
git add corporate/src/components/
git commit -m "feat(corporate): conditional page links across all components"
```

---

## Task 8: End-to-end testing

- [ ] **Test 1: Clean build (no DISABLED_PAGES)**

```bash
cd corporate && npm run build
```

Expected: All pages generated in dist/

- [ ] **Test 2: Single page disabled**

```bash
cd corporate && DISABLED_PAGES=careers npm run build
```

Expected: `✓ Removed disabled page: /careers` in output

Verify: `ls dist/careers/` → error (dir or file absent)

- [ ] **Test 3: Multiple pages disabled**

```bash
cd corporate && DISABLED_PAGES="careers,find-us" npm run build
```

Expected: Both removed from dist/

- [ ] **Test 4: Protected page attempt**

```bash
cd corporate && DISABLED_PAGES="index" npm run build
```

Expected: Warning logged, `dist/index.html` still exists

- [ ] **Test 5: Links absent from HTML**

```bash
grep -r "href=\"/careers\"" dist/
```

Expected: No matches when careers is disabled

- [ ] **Commit final**

```bash
git add -A
git commit -m "test(corporate): validate conditional page generation e2e"
```
