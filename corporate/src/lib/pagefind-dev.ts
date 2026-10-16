import { existsSync, readFileSync, statSync } from 'fs'
import { extname, join, normalize, sep } from 'path'
import type { AstroIntegration } from 'astro'

// Pagefind indexes the built site, so under `astro dev` /pagefind/ does not
// exist and the search answers nothing. This serves the index of the last
// `npm run build` from dist/pagefind, so the search works in dev too. The index
// is as fresh as that build: rebuild to search new content.
const CONTENT_TYPES: Record<string, string> = {
  '.js': 'text/javascript',
  '.json': 'application/json',
}

export default function pagefindDev(): AstroIntegration {
  return {
    name: 'pagefind-dev',
    hooks: {
      'astro:server:setup': ({ server, logger }) => {
        const root = join(process.cwd(), 'dist', 'pagefind')
        if (!existsSync(root)) {
          logger.warn('Site search: no index in dist/pagefind yet. Run `npm run build` once to search under astro dev.')
        }
        server.middlewares.use('/pagefind', (req, res, next) => {
          const path = normalize(join(root, decodeURIComponent((req.url ?? '/').split('?')[0])))
          // Stay inside dist/pagefind whatever the request path says
          if (!path.startsWith(root + sep) || !existsSync(path) || !statSync(path).isFile()) return next()
          res.setHeader('Content-Type', CONTENT_TYPES[extname(path)] ?? 'application/octet-stream')
          res.setHeader('Cache-Control', 'no-store')
          res.end(readFileSync(path))
        })
      },
    },
  }
}
