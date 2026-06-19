# Work With Us Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Travaillons ensemble" page at `/work-with-us` embedding a Google Form via iframe, with the form URL configurable via environment variable.

**Architecture:** New Astro static page following existing page patterns (Layout + semantic sections). The Google Form URL is declared as a typed env var in `astro.config.mjs` (server context, public access) and rendered server-side into the iframe `src` — no client JS required. The page slug is registered in the `CONTROLLABLE_PAGES` list for optional disabling via `DISABLED_PAGES`.

**Tech Stack:** Astro v5, Tailwind v4, Astro typed env (`envField`)

## Global Constraints

- Code, file names, comments: English
- User-facing content: French
- No client-side JavaScript
- Follow semantic CSS classes from `global.css` (`.section`, `.container`, `.card`, `.section-title`, etc.)
- No external fonts, CDNs, or tracking scripts
- Tailwind v4 via `@tailwindcss/vite` — no `tailwind.config` file
- Commit format: `type(corporate): description` (imperative, no period, under 72 chars)
- No automated tests — validate with `npm run build` from `corporate/` then browser preview

---

### Task 1: Register `CONTACT_FORM_URL` env var

**Files:**
- Modify: `corporate/astro.config.mjs`

**Interfaces:**
- Produces: `CONTACT_FORM_URL` importable from `astro:env/server` in `.astro` files

- [ ] **Step 1: Add env field to schema**

In `corporate/astro.config.mjs`, inside the `env.schema` object, add after `SUSTAINABILITY_URL`:

```js
CONTACT_FORM_URL: envField.string({
  access: 'public',
  context: 'server',
  default: 'https://docs.google.com/forms/d/e/1FAIpQLSemLxDWYfx03obnU_HG3vvDGBfY8nmu6TjNKYgZJowO8JHjUg/viewform?embedded=true',
}),
```

- [ ] **Step 2: Verify type-check passes**

Run from `corporate/`:
```bash
npx astro check
```
Expected: zero errors (or only pre-existing warnings unrelated to this change).

- [ ] **Step 3: Commit**

```bash
git add corporate/astro.config.mjs
git commit -m "feat(corporate): add CONTACT_FORM_URL env variable"
```

---

### Task 2: Register page slug in controllable pages

**Files:**
- Modify: `corporate/src/lib/pages.ts:2`

**Interfaces:**
- Consumes: `CONTROLLABLE_PAGES` array from `corporate/src/lib/pages.ts`
- Produces: `'work-with-us'` slug recognized by `isPageDisabled()` and build hook

- [ ] **Step 1: Add slug to CONTROLLABLE_PAGES**

In `corporate/src/lib/pages.ts`, update line 2:

```ts
export const CONTROLLABLE_PAGES = ['careers', 'find-us', 'join-us', 'team', 'tech', 'work-with-us']
```

- [ ] **Step 2: Commit**

```bash
git add corporate/src/lib/pages.ts
git commit -m "feat(corporate): register work-with-us as controllable page"
```

---

### Task 3: Create the `work-with-us.astro` page

**Files:**
- Create: `corporate/src/pages/work-with-us.astro`

**Interfaces:**
- Consumes: `CONTACT_FORM_URL` from `astro:env/server` (Task 1)
- Consumes: `Layout` from `../layouts/Layout.astro`

- [ ] **Step 1: Create the page file**

Create `corporate/src/pages/work-with-us.astro` with this content:

```astro
---
import Layout from '../layouts/Layout.astro';
import { CONTACT_FORM_URL } from 'astro:env/server';
---

<Layout
  title="Travaillons ensemble"
  description="Vous avez un projet ? Parlons-en. Remplissez notre formulaire et un consultant zatsit vous répondra rapidement."
>
  <section class="section--hero !pb-10 md:!pb-16">
    <div class="hero-decoration">
      <div class="hero-blob hero-blob--primary"></div>
      <div class="hero-blob hero-blob--secondary"></div>
    </div>
    <div class="dot-grid"></div>

    <div class="container">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="section-title--lg hero-title">
          Travaillons <span class="text-gradient-glow">ensemble</span>
        </h1>
        <p class="section-description hero-subtitle">
          Vous avez un projet ambitieux ? Nous aimons les défis techniques
          à fort impact. Décrivez-nous votre besoin, nous vous répondrons rapidement.
        </p>
      </div>
    </div>
  </section>

  <section class="section !pt-8 md:!pt-12">
    <div class="container">
      <div class="max-w-3xl mx-auto">
        <iframe
          src={CONTACT_FORM_URL}
          title="Formulaire de contact — Travaillons ensemble"
          width="100%"
          height="900"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="rounded-xl"
          loading="lazy"
        >
          <p>
            Votre navigateur ne supporte pas les iframes.
            <a href={CONTACT_FORM_URL} target="_blank" rel="noopener noreferrer" class="link-primary">
              Accéder au formulaire de contact
            </a>
          </p>
        </iframe>
      </div>
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Verify type-check passes**

Run from `corporate/`:
```bash
npx astro check
```
Expected: zero errors on the new file.

- [ ] **Step 3: Commit**

```bash
git add corporate/src/pages/work-with-us.astro
git commit -m "feat(corporate): add travaillons ensemble page with Google Form iframe"
```

---

### Task 4: Add nav entry in Header

**Files:**
- Modify: `corporate/src/components/Header.astro:15-18`

**Interfaces:**
- Consumes: `isPageDisabled` from `../lib/pages` (already imported)
- The new link must be inserted between the `join-us` entry (index 3) and the `careers` entry (index 4) in `navLinks`

- [ ] **Step 1: Insert nav link**

In `corporate/src/components/Header.astro`, locate the `navLinks` array. After the `join-us` entry and before the `careers` entry, insert:

```js
  { href: '/work-with-us', label: 'Travaillons ensemble' },
```

The array should look like:

```js
const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/team', label: 'L\'équipe' },
  { href: '/tech', label: 'Notre tech' },
  { href: '/join-us', label: 'Rejoins-nous' },
  { href: '/work-with-us', label: 'Travaillons ensemble' },
  { href: '/careers', label: 'Nos offres d\'emploi' },
  { href: '/find-us', label: 'Nous trouver' },
  { href: 'https://www.linkedin.com/company/zatsit/jobs', label: 'Nos offres d\'emplois', external: true },
];
```

- [ ] **Step 2: Verify build and preview**

Run from `corporate/`:
```bash
npm run build
```
Expected: build completes without errors, `dist/work-with-us/index.html` is generated.

Then:
```bash
npm run preview
```
Open `http://localhost:4321/work-with-us` and verify:
- Hero section renders with gradient title
- Google Form iframe is visible and loads
- Nav shows "Travaillons ensemble" between "Rejoins-nous" and "Nos offres d'emploi"
- Active nav highlight works when on this page
- Mobile menu includes the new entry
- Fallback link inside `<iframe>` tag is correct

- [ ] **Step 3: Commit**

```bash
git add corporate/src/components/Header.astro
git commit -m "feat(corporate): add travaillons ensemble link to navigation"
```
