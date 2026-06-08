export const ALWAYS_GENERATED_PAGES = ['index', 'legal-notice', 'privacy-policy']
export const CONTROLLABLE_PAGES = ['careers', 'find-us', 'join-us', 'team', 'tech']

export function getDisabledPages(): string[] {
  const DISABLED_PAGES = process.env.DISABLED_PAGES ?? ''
  if (!DISABLED_PAGES || DISABLED_PAGES.trim() === '') {
    return []
  }
  return DISABLED_PAGES.split(',').map(slug => slug.trim())
}

export function isPageDisabled(slug: string): boolean {
  return getDisabledPages().includes(slug)
}
