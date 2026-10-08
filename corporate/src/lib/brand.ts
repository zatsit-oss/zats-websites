/**
 * The brand is always set in bold in running text (see AGENTS.md, "Brand").
 * Content collections hold plain strings, so this wraps every `zatsit` in
 * <strong> after escaping the text, for use with `set:html`.
 */
const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const withBoldBrand = (text: string) =>
  escapeHtml(text).replace(/\bzatsit\b/g, '<strong>zatsit</strong>');
