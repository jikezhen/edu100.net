/**
 * Next.js may pass dynamic [slug] params still percent-encoded for non-ASCII paths.
 */
export function decodeRouteSlug(rawSlug: string): string {
  try {
    return decodeURIComponent(rawSlug)
  } catch {
    return rawSlug
  }
}

export function postDetailPath(slug: string): string {
  return `/posts/${encodeURIComponent(slug)}`
}

export function courseDetailPath(slug: string): string {
  return `/courses/${encodeURIComponent(slug)}`
}
