/**
 * Payload's default slugify strips non-ASCII characters, leaving Chinese titles with an empty slug.
 * Keep letters/numbers from any script (including CJK) so Chinese titles produce valid slugs.
 */
export const slugifyTitle = ({ valueToSlugify }: { valueToSlugify?: unknown }) => {
  const value = typeof valueToSlugify === 'string' ? valueToSlugify.trim() : ''
  if (!value) return undefined

  const slug = value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return slug || `item-${Date.now().toString(36)}`
}
