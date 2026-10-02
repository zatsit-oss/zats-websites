# Upgrading a zatsit site from Astro 5 to Astro 7

This guide is written so the same upgrade can be repeated on every zatsit Astro project (corporate, sustainability-portal, components, the blog, the tech watcher). It lists every breaking change between 5.x and 7.x, how to detect it in a codebase, and what happened when this monorepo was upgraded (Astro 5.18.2 to 7.3.5, October 2026).

Official sources: [upgrade to v6](https://docs.astro.build/en/guides/upgrade-to/v6/) and [upgrade to v7](https://docs.astro.build/en/guides/upgrade-to/v7/). Read them for any API this guide marks as "not used by us": those are only summarized here.

## Why upgrade

- The 11 `sharp` advisories left after the August 2026 audit cleanup can only be fixed by Astro 7 (it ships `sharp` 0.35). After the upgrade and a lockfile-only `npm audit fix`, all three projects report 0 vulnerabilities.
- Astro 5 is no longer maintained, and Dependabot reopens an Astro 7 pull request at every patch release.

## Method

Upgrade first, fix what breaks, then prove that nothing changed silently. Most of the risky changes in 6 and 7 do not fail the build: they change the HTML.

1. **Check Node.** Astro 6 and 7 require Node `>=22.12.0`. Our CI pins `22.22.3` in `.github/actions/astro/action.yml`.
2. **Build a baseline on Astro 5** and copy `dist/` aside (`cp -R dist ../baseline`).
3. **Bump Astro** in every project of the repository at once. A shared components package must move with its consumers: `astro:assets`, `astro:env` and the compiler are versioned with Astro, and a package on Astro 7 consumed by a site on Astro 5 makes no sense.

   ```bash
   npm install astro@^7      # in each site
   npm install -D astro@^7   # in a components package that only needs it to type-check
   npm dedupe                # see "Leftover Vite 6" below
   ```

4. **Build**, fix each error (sections below), repeat.
5. **Compare with the baseline** (script at the end): visible text, `alt`/`aria-label`/`href`/`class` attributes, order of `<script>`/`<style>` tags, asset weights.
6. **Run `npx astro check`**, then `npm audit` and `npm audit fix` (lockfile only, no `--force`).
7. **Open the pull request and check the Firebase preview** by hand: theme toggle, mobile menu, client-side navigation if `<ClientRouter />` is used, images.

## Breaking changes that hit this monorepo

### Legacy content collections are removed (v6)

Symptom: `LegacyContentConfigError: Found legacy content config file in "src/content/config.ts"`.

Detect: `ls src/content/config.ts`, `grep -rn "type: 'data'\|type: 'content'" src`, `grep -rn "\.render()\|\.slug\|getEntryBySlug\|getDataEntryById" src`.

Fix:

- Move `src/content/config.ts` to `src/content.config.ts` (`git mv` keeps the history).
- Replace `type: 'data'` / `type: 'content'` with a `loader`. For a folder of JSON files: `glob({ pattern: '*.json', base: './src/content/<folder>' })` from `astro/loaders`. The entry id is the file name without extension, so existing `getEntry('legal', 'privacy-policy')` calls keep working.
- If content uses `entry.slug`, switch to `entry.id`; replace `entry.render()` with `render(entry)` imported from `astro:content`.
- `legacy.collectionsBackwardsCompat: true` exists as a temporary escape hatch. We did not need it.

Corporate: four data collections (`legal`, `people`, `services`, `tech`), migrated with a small `jsonIn(folder)` helper in `corporate/src/content.config.ts`. No page code changed.

### `z` from `astro:content` is deprecated, Zod 4 is bundled (v6)

Detect: `grep -rn "astro:schema\|z } from 'astro:content'\|z, .* from 'astro:content'" src`.

Fix: `import { z } from 'astro/zod';`. Then check the schemas against the [Zod 4 changelog](https://zod.dev/v4/changelog). The usual traps:

- `z.string().email()` / `.url()` become `z.email()` / `z.url()`.
- `{ message: '...' }` becomes `{ error: '...' }`.
- `.default()` after `.transform()` must now match the output type; use `.prefault()` for the old behavior.

Corporate only uses `object`, `array`, `string`, `boolean`, `enum`, `optional` and plain `.default()`: no change was needed.

### `<ViewTransitions />` is removed (v6)

Symptom: `[MISSING_EXPORT] "ViewTransitions" is not exported by "astro:transitions"`.

Detect: `grep -rn ViewTransitions src`.

Fix: rename the import and the component to `ClientRouter`. It was already an alias in Astro 5, so the behavior and the emitted script are the same. Also check `grep -rn "handleForms\|TRANSITION_\|isTransition\|createAnimationScope" src`: these were removed in 6 and 7.

Corporate: `src/layouts/Layout.astro`. Whether the site needs a client-side router at all (it costs a script on every page) is a separate eco-design question, not part of the upgrade.

### The Rust compiler rejects invalid markup (v7)

Symptom: `[CompilerError] Closing tag '</br>' has no matching opening tag.` The Go compiler silently repaired invalid HTML; the Rust compiler either fails or passes it through unchanged.

Detect before upgrading:

```bash
# Closing tags on void elements
grep -rnE '</(br|img|input|hr|meta|link|source|area|col|embed|wbr)>' --include='*.astro' src
```

Then build: unclosed non-void tags fail with a clear location. Block elements inside `<p>` do not fail; they render differently, which the text comparison catches.

Corporate: two `</br>` in `src/pages/team.astro`, replaced with `<br>`. The rendered text is identical.

## Breaking changes checked and not triggered here

Each item needs checking on every other project.

| Change | Version | How to detect | Our case |
|---|---|---|---|
| `compressHTML` default becomes `'jsx'`: whitespace between inline elements is removed (`hello <b>world</b>` can render `helloworld`) | v7 | `grep -n compressHTML astro.config.*` | Both sites set `compressHTML: true`, which keeps the v6 behavior. **A project without this line loses spaces silently.** Add `compressHTML: true`, or audit every inline sequence and use `{" "}`. |
| Markdown is rendered by Sätteri instead of remark/rehype | v7 | `grep -rn "remark\|rehype" astro.config.* package.json` | No Markdown here. The blog must check its plugins: keeping them needs `@astrojs/markdown-remark` and `markdown.processor: unified()`. |
| `src/fetch.ts` is a reserved file name (advanced routing) | v7 | `ls src/fetch.ts src/fetch.js` | Absent. Rename it, or set `fetchFile: null`. |
| `@astrojs/db` removed | v7 | `package.json` | Not used. |
| Vite 8 (Rolldown, oxc minifier, Lightning CSS) | v7 | Custom Vite plugins or `vite.build.rollupOptions` | Only `@tailwindcss/vite`, whose peer range includes Vite 8. Emitted CSS now uses range media queries (`@media (width>=768px)`), supported by every current browser. |
| `<script>`/`<style>` emitted in source order | v6 | Compare the tag order with the baseline | Only two independent module scripts swapped (carbon badge and share links). No effect. |
| Endpoints with an extension (`sitemap.xml.ts`) no longer answer with a trailing slash | v6 | `grep -rn "\.xml/\|\.txt/" src public` | Links point to `/sitemap.xml` and `/llms.txt`, without slash. Static output is unaffected anyway. |
| `import.meta.env` always inlined, never coerced (`"true"` stays a string) | v6 | `grep -rn "import.meta.env" src` | Not used: everything goes through `astro:env`. |
| Images: crop by default, never upscale, SVG rasterized when `format` is set, responsive styles moved to classes and `data-*` | v6 | `grep -rn "<Image\|<Picture\|getImage" src` | Same `alt`, `class` and weights on the portal and the shared footer. Check visually on a site that requests sizes larger than the source. |
| `Astro.glob()` removed | v6 | `grep -rn "Astro.glob" src` | Not used. Replace with `import.meta.glob()` or a collection. |
| `routes` removed from `astro:build:done` | v6 | `grep -rn "astro:build:done" src` | Corporate's `build-hook.ts` only uses `dir` and `logger`. |
| `getStaticPaths()` cannot return numeric `params`; `Astro` inside it is deprecated | v6 | `grep -rn getStaticPaths src` | The portal's landscape route returns strings. |
| `%25` forbidden in route file names | v6 | `find src/pages -name '*%25*'` | None. |
| CommonJS config files unsupported | v6 | `ls astro.config.cjs` | `.mjs` everywhere. |
| `prefetch()` `with` option removed | v6 | `grep -rn "prefetch(" src` | Config-level `prefetch` only. |
| Experimental flags to delete (`csp`, `fonts`, `preserveScriptOrder`, `staticImportMetaEnv`, `headingIdCompat`, `rustCompiler`, `queuedRendering`...) | v6, v7 | `grep -n experimental astro.config.*` | None set. |

## Tooling around the upgrade

- **TypeScript stays on 5.x.** TypeScript 7 is the native (Go) rewrite, and `@astrojs/check` 0.9.10 declares `typescript: ^5.0.0 || ^6.0.0`. `dependabot.yml` ignores TypeScript majors until that changes.
- **`@types/node` follows the runtime.** Node 22 in CI: do not take `@types/node` 26.
- **Leftover Vite 6.** After `npm install astro@^7`, npm kept a Vite 6 copy nested under `@tailwindcss/vite` from the old lockfile. `npm dedupe` collapses it onto Vite 8. Check with `npm ls vite`.
- **`astro check`** reported 0 errors on both sites after the upgrade.

## Build comparison script

Run from the folder holding both outputs: `python3 compare.py baseline/ dist/`. It prints, per page, the differences in visible text and in the attributes that matter for accessibility and links, with hashed file names normalized.

```python
import re, sys
from html.parser import HTMLParser
from pathlib import Path

BLOCK = {'p', 'div', 'li', 'h1', 'h2', 'h3', 'h4', 'section', 'br', 'td', 'tr', 'header', 'footer', 'nav', 'button'}
ATTRS = {'alt', 'aria-label', 'title', 'href', 'src', 'class', 'style'}

class Extractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts, self.skip = [], 0
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.skip += 1
        if tag in BLOCK:
            self.parts.append('\n')
        self.parts += [f'\n@{tag}.{k}={v}\n' for k, v in attrs if k in ATTRS and v]
    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip -= 1
    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)

def visible(path):
    extractor = Extractor()
    extractor.feed(path.read_text())
    text = ''.join(extractor.parts)
    text = re.sub(r'\.[A-Za-z0-9_-]{8}\.(css|js)', r'.HASH.\1', text)
    text = re.sub(r'_[A-Za-z0-9]{5,7}\.(webp|svg|png|avif)', r'.\1', text)
    return [re.sub(r'\s+', ' ', line).strip() for line in text.splitlines() if line.strip()]

before, after = Path(sys.argv[1]), Path(sys.argv[2])
for page in sorted(before.rglob('*.html')):
    old, new = visible(page), visible(after / page.relative_to(before))
    if old != new:
        print(f'## {page.relative_to(before)}')
        print('\n'.join(f'- {line}' for line in old if line not in new))
        print('\n'.join(f'+ {line}' for line in new if line not in old))
```

In this monorepo the only difference reported was the name of the shared stylesheet (`careers.css` and `greenscore.css` became `Layout.css`).
