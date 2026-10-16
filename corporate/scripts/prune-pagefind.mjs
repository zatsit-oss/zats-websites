#!/usr/bin/env node
/**
 * Removes the Pagefind interfaces the site does not use (same script as the
 * blog's).
 *
 * Pagefind always emits ready-made UIs next to the search library and offers
 * no flag to skip them. HeaderSearch renders results from the low-level API,
 * so those bundles are some 400 kB that no page references, published to the
 * bucket for nothing.
 *
 * A denylist of known file names rather than a glob: if Pagefind renames or
 * adds a file, the worst case is that it survives, never that the search
 * breaks because something it needs was deleted.
 */

import { existsSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BUNDLE = join(process.cwd(), 'dist', 'pagefind');

const UNUSED = [
  'pagefind-ui.js',
  'pagefind-ui.css',
  'pagefind-modular-ui.js',
  'pagefind-modular-ui.css',
  'pagefind-component-ui.js',
  'pagefind-component-ui.css',
  // Highlights matches on the destination page; results never link with the
  // highlight parameter, so nothing loads it
  'pagefind-highlight.js',
];

if (!existsSync(BUNDLE)) {
  console.error('prune-pagefind: dist/pagefind is missing, nothing to do.');
  process.exit(0);
}

let freed = 0;
const missing = [];

for (const name of UNUSED) {
  const path = join(BUNDLE, name);
  if (!existsSync(path)) {
    missing.push(name);
    continue;
  }
  freed += statSync(path).size;
  rmSync(path);
}

console.log(`prune-pagefind: removed ${(freed / 1024).toFixed(1)} kB of unused interfaces.`);

if (missing.length > 0) {
  console.warn(`prune-pagefind: not found, the list may be out of date with Pagefind: ${missing.join(', ')}`);
}
