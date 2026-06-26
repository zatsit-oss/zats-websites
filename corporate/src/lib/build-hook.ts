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
          .map((s: string) => s.trim())
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
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
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
