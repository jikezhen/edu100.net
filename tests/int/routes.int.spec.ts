import { describe, expect, it } from 'vitest'

import { courseDetailPath, decodeRouteSlug, postDetailPath } from '@/lib/routes'

describe('routes', () => {
  it('decodes percent-encoded Chinese slugs from Next.js params', () => {
    expect(decodeRouteSlug('%E6%96%87%E7%AB%A0-1')).toBe('文章-1')
    expect(decodeRouteSlug('local-post-123')).toBe('local-post-123')
  })

  it('builds encoded detail paths for non-ASCII slugs', () => {
    expect(postDetailPath('文章-1')).toBe('/posts/%E6%96%87%E7%AB%A0-1')
    expect(courseDetailPath('课程-1')).toBe('/courses/%E8%AF%BE%E7%A8%8B-1')
  })
})
