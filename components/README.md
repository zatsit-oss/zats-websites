# @zatsit/components

This repository contains the shared components library used by other projects in this repository..

# How to install it

1) As Local file dependency, in the consumer's `package.json`:

```json
{
  "dependencies": {
    "@zatit/components": "file:../components"
  }
}
```

Then run `npm install` in the consumer project.

2) Tailwind integration

Tailwind only scans files listed in the `content` array of `tailwind.config`. 
If your shared components contain utility classes (e.g. `mt-8`), you must ensure they are visible to Tailwind by one of the following methods:

In the consumer project's `tailwind.config.mjs`, 

- import and use the **components libray preset**
- also scan the components' source files by adding them to `content`

```js
/** @type {import('tailwindcss').Config} */
import preset from '../components/tailwind.preset.mjs'

export default {
    content: [
        './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
        '../components/src/**/*.{astro,html,js,jsx,ts,tsx}' 
    ],
    presets: [preset],
}

```

The preset avoids duplicating theme and plugin configuration, but you still need to provide the `content` globs so Tailwind includes component classes.

# How to use it (Usage examples (Astro))

Direct import from the package (monorepo / file install)

```astro
---
import Header from '@zatsit/components/src/layouts/Header.astro'
---

<Header />
```

For cleaner entry points, add an `exports` field or a compiled `dist/index.mjs` in the `components` package and import like:

```astro
import { Header } from '@zatit/components'
```

# Useful commands

## Generate precompiled CSS:

```bash
npx tailwindcss -c tailwind.preset.mjs -i ./src/index.css -o ./dist/components.css --minify
```

# Quick troubleshooting

- Missing Tailwind utilities (e.g. `mt-8`): either the components' source files are not included in `content`, or the compiled CSS is not imported.
- Ensure the consumer rebuilds Tailwind after config or source changes (restarting `dev` may be required).
