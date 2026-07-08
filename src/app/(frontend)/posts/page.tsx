import React from 'react'

import { PostCard } from '@/components/PostCard'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: '文章',
}

export default async function PostsPage() {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 50,
    depth: 1,
  })

  return (
    <div className="page">
      <section className="page-header">
        <div className="container">
          <h1>文章</h1>
          <p>教育资讯、学习心得与行业洞察</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.docs.length > 0 ? (
            <div className="card-grid">
              {posts.docs.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="empty-state">暂无已发布文章。</p>
          )}
        </div>
      </section>
    </div>
  )
}
