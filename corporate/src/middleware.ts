import { defineMiddleware } from 'astro:middleware';
import { addHeadingIds } from './lib/heading-ids';

// Runs on every page, in dev and when the build prerenders it
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = await response.text();
  return new Response(addHeadingIds(html), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
});
