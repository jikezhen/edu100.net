import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { RichTextContent } from '@/components/RichTextContent'
import { getPayloadClient } from '@/lib/payload'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    limit: 1,
  })

  const post = result.docs[0]
  if (!post) return { title: '文章未找到' }

  return {
    title: post.title,
    description: post.excerpt || undefined,
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 1,
  })

  const post = result.docs[0]
  if (!post) notFound()

  const categoryName =
    post.category && typeof post.category === 'object' ? post.category.name : undefined
  const authorName =
    post.author && typeof post.author === 'object'
      ? post.author.name || post.author.email
      : undefined

  return (
    <div className="page">
      <article className="article">
        <div className="container article-container">
          <Link href="/posts" className="back-link">
            ← 返回文章列表
          </Link>

          {post.featuredImageUrl && (
            <div className="article-cover">
              <img src={post.featuredImageUrl} alt={post.title} />
            </div>
          )}

          <header className="article-header">
            {categoryName && <span className="card-tag">{categoryName}</span>}
            <h1>{post.title}</h1>
            <div className="article-meta">
              {authorName && <span>作者：{authorName}</span>}
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
                </time>
              )}
            </div>
            {post.excerpt && <p className="article-excerpt">{post.excerpt}</p>}
          </header>

          <RichTextContent className="article-content" data={post.content} />
        </div>
      </article>
    </div>
  )
}
