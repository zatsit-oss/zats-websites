# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run all commands from this `corporate/` directory.

| Command | Description |
|---|---|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npx astro check` | TypeScript / Astro type checking |

There are no automated tests. Validate changes by running the build and previewing in a browser.

## Architecture

**Astro v5 + Tailwind v4** static site deployed to Firebase Hosting.

### Content Collections

All page data lives in `src/content/` as JSON files, validated by Zod schemas in `src/content/config.ts`. Collections: `people`, `services`, `tech`, `legal`. Pages load data via `getEntry('collection', 'slug')`:

```ts
const techData = await getEntry('tech', 'tech');
const { intro, stats, stacks } = techData.data;
```

To add or modify site content (team members, services, tech stacks, legal text), edit the JSON files in `src/content/`.

### Theming

Theme (`light`/`dark`) is stored in `localStorage` under the key `theme` and applied as a `data-theme` attribute on `<html>`. An inline `<script is:inline>` in `Layout.astro` applies the theme before first paint to prevent FOUC, and re-applies it after every Astro ViewTransition (`astro:after-swap`).

CSS custom properties (`--color-*`, `--glass-*`, `--card-bg`, etc.) are defined in `src/styles/global.css` under `[data-theme="light"]`, `[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)`. Always use these tokens rather than hardcoded colors.

### Styling Pattern

Tailwind v4 is configured via `@tailwindcss/vite` (no `tailwind.config` file). Design tokens are declared in a `@theme {}` block in `global.css`.

Rather than composing raw Tailwind utilities everywhere, the codebase uses **semantic CSS classes** defined in `global.css`: `.section`, `.container`, `.btn-primary`, `.btn-secondary`, `.card`, `.service-card`, `.tag`, `.glass`, `.text-gradient`, etc. Prefer extending these or adding new semantic classes over scattering long utility strings in component markup.

### Icons

SVG icons live in `src/assets/icons/` and are imported directly as Astro components:

```astro
import CheckIcon from '../assets/icons/check.svg';
<CheckIcon class="icon-md" />
```

Use `.icon-sm` / `.icon-md` / `.icon-lg` size classes from `global.css`. Never use icon fonts or external icon CDNs.

### Technology Icons

`src/data/technology-icons.ts` maps technology display names (e.g. `'Vue.js'`) to SVG slugs under `public/images/technologies/{slug}.svg`. Add an entry here when introducing a new technology on the tech page.

### Client-Side Scripts

Minimal JS only. Scripts in `src/scripts/` (e.g. `gauge-animation.ts`, `orbit-triangle.ts`) are loaded inline in the specific pages/components that need them. The `ThemeToggle.astro` component is self-contained with its own `<script>`. Re-register event listeners on `astro:after-swap` when using ViewTransitions.

### Environment Variables

Typed via Astro's `env` schema in `astro.config.mjs`. All variables have default values and are public/client-accessible. No `.env` file is required for local development.
