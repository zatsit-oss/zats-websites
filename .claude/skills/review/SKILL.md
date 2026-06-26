---
name: review
description: Perform a code review of recent changes against this monorepo's quality standards
---

Perform a code review of recent changes. Always identify which project the change affects (`corporate/`, `sustainability-portal/`, `components/`) and apply the relevant standards.

## Review Checklist

### TypeScript & Code Quality
- No `any` types
- Proper error handling
- Clear naming conventions (camelCase, PascalCase per `.claude/rules/rules.md`)
- Functions are small and focused
- No unused variables or imports

### Astro & Components
- Props have TypeScript interfaces
- Components follow single responsibility
- `client:*` directives used sparingly (minimal JS, prefer static)
- Data structures extracted from templates into the frontmatter section

### Accessibility
- Semantic HTML elements used (`<nav>`, `<main>`, `<section>`, etc.)
- Interactive elements have accessible names (text or `aria-label`)
- Form inputs have associated `<label>`s
- Color contrast meets WCAG AA
- Keyboard navigation works, focus states visible
- Images have meaningful `alt` (or empty `alt=""` for purely decorative)

### Performance & Eco-design
- Minimal client-side JavaScript
- No unnecessary dependencies
- Images optimized (WebP/AVIF, correct dimensions, lazy-loaded below the fold)
- No external font CDN, no tracking scripts
- Page weight target respected (< 500KB per page)

### Responsive
- Mobile-first approach
- Tested at mobile, tablet, desktop breakpoints
- No horizontal scroll on any viewport

### Security
- No secrets in code (.env, API keys, tokens)
- User inputs validated and sanitized
- LocalStorage limited to non-sensitive UX preferences

### Git
- Commits follow Angular convention (`type(scope): description`)
- Scope matches the affected project (`corporate`, `portal`, `components`, `ci`)
- Imperative mood, no capital at start, under 72 chars

## Commands to Run

```bash
# Per project (cd into the right one first)
npx astro check       # Type / template check
npm run build         # Verify production build passes
```
