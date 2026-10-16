import { BLOG_URL } from 'astro:env/client';

/**
 * Counts the posts in the blog's RSS feed at build time, so the figure never
 * drifts from what the blog publishes. Returns null when the feed cannot be
 * read: the page then links to the blog without a figure, and the build never
 * fails on a third-party outage.
 */
export async function getBlogPostCount(): Promise<number | null> {
  try {
    const response = await fetch(new URL('rss.xml', BLOG_URL.endsWith('/') ? BLOG_URL : `${BLOG_URL}/`), {
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return null;
    const count = (await response.text()).match(/<item>/g)?.length ?? 0;
    return count > 0 ? count : null;
  } catch {
    return null;
  }
}
