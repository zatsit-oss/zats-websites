// Gives every h2 to h6 without an id one derived from its text.
//
// Pagefind only links a search result to a section when that section's heading
// carries an id; without one, the result opens the top of the page. Most
// headings of the site are written without ids, so rather than adding dozens by
// hand (and forgetting the next one), the middleware fills the gaps on every
// rendered page, the same way in `astro dev` and in the build. Ids written in
// the source are never touched: use one when an anchor must stay stable.

const HEADING = /<h([2-6])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g;
const EXISTING_ID = /\sid="([^"]+)"/g;

const ENTITIES: Record<string, string> = { '&amp;': '&', '&nbsp;': ' ', '&#39;': "'", '&quot;': '"', '&lt;': '<', '&gt;': '>' };

const slugify = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[#a-z0-9]+;/gi, (entity) => ENTITIES[entity] ?? ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/, '');

export function addHeadingIds(html: string): string {
  const taken = new Set([...html.matchAll(EXISTING_ID)].map((match) => match[1]));
  return html.replace(HEADING, (whole, level: string, attributes = '', content: string) => {
    if (/\sid=/.test(attributes)) return whole;
    const base = slugify(content) || `section-${level}`;
    let id = base;
    for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
    taken.add(id);
    return `<h${level} id="${id}"${attributes}>${content}</h${level}>`;
  });
}
