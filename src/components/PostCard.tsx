import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

type PostCardProps = {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const categoryName =
    post.category && typeof post.category === 'object' ? post.category.name : undefined

  return (
    <article className="card">
      {post.featuredImageUrl && (
        <div className="card-image">
          <img src={post.featuredImageUrl} alt={post.title} />
        </div>
      )}
      <div className="card-body">
        {categoryName && <span className="card-tag">{categoryName}</span>}
        <h3>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h3>
        {post.excerpt && <p>{post.excerpt}</p>}
        {post.publishedAt && (
          <time className="card-meta" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
          </time>
        )}
      </div>
    </article>
  )
}
