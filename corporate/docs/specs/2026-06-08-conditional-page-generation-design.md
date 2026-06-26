# Conditional Page Generation Design

**Date:** 2026-06-08  
**Project:** Zatsit Corporate Website  
**Feature:** Environment-based page activation/deactivation at build time

## Overview

Enable selective page generation based on `DISABLED_PAGES` environment variable set at build time. This allows deploying different site configurations without code changes—some instances may exclude certain sections (e.g., Careers page) while keeping core pages (home, legal) always present.

## Requirements

- Home page (`index.astro`) always generated
- Legal pages (`legal-notice.astro`, `privacy-policy.astro`) always generated
- Other pages (`careers`, `find-us`, `join-us`, `team`, `tech`) can be disabled via env var
- Pages disabled must not exist in build output (zero stub files)
- Navigation buttons/links to disabled pages must not render (hidden at build time, not CSS-hidden)
- Easy to configure: single env var with comma-separated slugs
- Zero runtime overhead for enabled pages

## Solution Architecture

### 1. Environment Variable Configuration

**astro.config.mjs** env schema:
- Add `DISABLED_PAGES` field
- Type: `string`
- Required: `false` (default: empty string = no pages disabled)
- Access: `public` (accessible in Astro components)
- Context: `client` (available at build time)
- Default value: `''`

Example usage:
```bash
# All pages enabled (default)
npm run build

# Careers page disabled
DISABLED_PAGES=careers npm run build

# Multiple pages disabled
DISABLED_PAGES=careers,find-us npm run build
```

### 2. Helper Utilities

**Location:** `src/lib/pages.ts`

```typescript
import { getSecret } from 'astro:env/client'

export function getDisabledPages(): string[] {
  const disabledPagesStr = getSecret('DISABLED_PAGES')
  if (!disabledPagesStr || disabledPagesStr.trim() === '') return []
  return disabledPagesStr.split(',').map(s => s.trim())
}

export function isPageDisabled(slug: string): boolean {
  return getDisabledPages().includes(slug)
}

export const ALWAYS_GENERATED_PAGES = ['index', 'legal-notice', 'privacy-policy']

export function getControllablePages(): string[] {
  return ['careers', 'find-us', 'join-us', 'team', 'tech']
}
```

These utilities are:
- Imported in components for conditional button rendering
- Imported in the build hook for post-build cleanup

### 3. Post-Build Cleanup Hook

**Location:** `src/lib/build-hook.ts`

Astro integration that runs after `astro build`:

```typescript
import { promises as fs } from 'fs'
import { join } from 'path'
import type { AstroIntegration } from 'astro'
import { getDisabledPages, ALWAYS_GENERATED_PAGES } from './pages'

export default function buildCleanup(): AstroIntegration {
  return {
    name: 'cleanup-disabled-pages',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const disabledPages = getDisabledPages()
        const distDir = dir.pathname

        for (const slug of disabledPages) {
          if (ALWAYS_GENERATED_PAGES.includes(slug)) {
            console.warn(`⚠️  Page "${slug}" is protected and cannot be disabled`)
            continue
          }

          const pagePath = join(distDir, slug, 'index.html')
          try {
            await fs.unlink(pagePath)
            console.log(`✓ Removed disabled page: ${slug}`)
          } catch (error: any) {
            if (error.code === 'ENOENT') {
              console.warn(`⚠️  Page "${slug}" not found in dist (was it generated?)`)
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

**Integration in astro.config.mjs:**
```typescript
import buildCleanup from './src/lib/build-hook'

export default defineConfig({
  // ... existing config
  integrations: [buildCleanup(), tailwindcss()],
})
```

Note: Order matters—integrations run in the order defined.

### 4. Navigation & UI Components

**Pages affected:** Any component displaying navigation links or CTAs to site pages:
- `src/components/Header.astro`
- `src/components/Footer.astro`
- Any menu/navigation components
- Any CTA buttons linking to pages

**Implementation pattern:**
```astro
---
import { isPageDisabled } from '@/lib/pages'
---

<!-- Only render if page is enabled -->
{!isPageDisabled('careers') && (
  <a href="/careers" class="btn-primary">
    Join Our Team
  </a>
)}

<!-- Or for a nav menu -->
<nav>
  <a href="/">Home</a>
  {!isPageDisabled('team') && <a href="/team">Team</a>}
  {!isPageDisabled('tech') && <a href="/tech">Technologies</a>}
  {!isPageDisabled('careers') && <a href="/careers">Careers</a>}
  {!isPageDisabled('find-us') && <a href="/find-us">Find Us</a>}
  {!isPageDisabled('join-us') && <a href="/join-us">Join Us</a>}
  <a href="/legal-notice">Legal</a>
  <a href="/privacy-policy">Privacy</a>
</nav>
```

**Build-time evaluation:**
- `isPageDisabled()` is evaluated at build time (during component rendering)
- If a page is disabled, the entire link element is omitted from the generated HTML
- Zero client-side logic or CSS `display: none` tricks

### 5. Behavior Summary

| Scenario | Behavior |
|----------|----------|
| Page enabled, no env var | Page renders, link exists | 
| Page disabled via `DISABLED_PAGES` | Page file removed from `dist/`, link omitted from components |
| User navigates to disabled page URL | 404 (file doesn't exist in dist) |
| Page in `ALWAYS_GENERATED_PAGES` listed in `DISABLED_PAGES` | Warning logged, page still generated (safety guard) |
| Empty `DISABLED_PAGES` (default) | All pages generated, all links rendered |

## Implementation Checklist

- [ ] Add `DISABLED_PAGES` to `astro.config.mjs` env schema
- [ ] Create `src/lib/pages.ts` with helper functions
- [ ] Create `src/lib/build-hook.ts` with Astro integration
- [ ] Register build hook in `astro.config.mjs`
- [ ] Update `Header.astro`, `Footer.astro`, and any other nav components to use `isPageDisabled()`
- [ ] Test build with `DISABLED_PAGES=careers` and verify `dist/careers/` does not exist
- [ ] Test that links to disabled pages do not render
- [ ] Test that links to enabled pages still render
- [ ] Verify protected pages (home, legal) cannot be disabled
- [ ] Build and preview locally to confirm 404 behavior

## Files Changed

- `astro.config.mjs` (add env var, register hook)
- `src/lib/pages.ts` (new file, utilities)
- `src/lib/build-hook.ts` (new file, integration)
- `src/components/Header.astro` (conditional link rendering)
- `src/components/Footer.astro` (conditional link rendering)
- Any other nav/menu components using page links

## Considerations

### Performance
- Zero runtime overhead (all logic at build time)
- No client-side JavaScript added
- No additional HTTP requests

### Maintenance
- Single source of truth: `DISABLED_PAGES` env var
- Helper functions centralized in `src/lib/pages.ts`
- Build hook is self-contained and easy to test

### Backwards Compatibility
- Default behavior unchanged (empty `DISABLED_PAGES` = all pages enabled)
- Existing links in content/components work as-is unless explicitly updated

### Safety
- Protected pages (`index`, `legal-notice`, `privacy-policy`) cannot be disabled
- Hook logs warnings if protected pages are listed in `DISABLED_PAGES`
- Graceful handling of missing pages (logs warning, continues build)

## Testing Strategy

**Unit tests:**
- `getDisabledPages()` parses env var correctly
- `isPageDisabled()` returns correct boolean for various slugs
- Protected pages always return `false` for `isPageDisabled()`

**Integration tests:**
- Build with various `DISABLED_PAGES` values
- Verify correct files exist/missing in `dist/`
- Run `npm run preview` and confirm 404 for disabled pages
- Inspect generated HTML and verify links omitted

**Manual testing:**
```bash
# Build with careers disabled
DISABLED_PAGES=careers npm run build
ls dist/careers/  # Should be empty or not exist

# Preview and test
npm run preview
# Visit http://localhost:3000/careers → should show 404
# Verify no "Careers" link in navigation
```
