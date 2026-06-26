---
name: dev
description: Start the Astro development server for one of the monorepo projects (corporate or sustainability-portal)
---

This is a monorepo — there is **no `package.json` at the root**. You must `cd` into a project before running `npm run dev`.

## Corporate (zatsit.fr)

```bash
cd corporate && npm run dev
```

Default port: `http://localhost:4321`.

## Sustainability Portal

```bash
cd sustainability-portal && npm run dev
```

Default port: `http://localhost:4321` (or next available if 4321 is taken by another project).

## Notes

- Hot reload is enabled.
- If `node_modules/` is missing, run `npm install` first.
- The two projects use different Tailwind versions (corporate v4, portal v3) — do not share node_modules.
