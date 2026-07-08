import Link from 'next/link'
import React from 'react'

import { CourseCard } from '@/components/CourseCard'
import { PostCard } from '@/components/PostCard'
import { getPayloadClient, getSiteSettings } from '@/lib/payload'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const settings = await getSiteSettings()

  const [posts, courses] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: 'courses',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 3,
      depth: 1,
    }),
  ])

  return (
    <div className="page">
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">{settings.tagline || '专注优质教育内容'}</p>
          <h1>{settings.heroTitle || '开启你的学习之旅'}</h1>
          <p className="hero-subtitle">
            {settings.heroSubtitle || '精选课程与优质文章，助力持续成长'}
          </p>
          <div className="hero-actions">
            <Link href="/courses" className="btn btn-primary">
              浏览课程
            </Link>
            <Link href="/posts" className="btn btn-secondary">
              阅读文章
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>精选课程</h2>
            <Link href="/courses" className="section-link">
              查看全部 →
            </Link>
          </div>
          {courses.docs.length > 0 ? (
            <div className="card-grid">
              {courses.docs.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="empty-state">暂无已发布课程，请前往管理后台添加内容。</p>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>最新文章</h2>
            <Link href="/posts" className="section-link">
              查看全部 →
            </Link>
          </div>
          {posts.docs.length > 0 ? (
            <div className="card-grid">
              {posts.docs.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="empty-state">暂无已发布文章，请前往管理后台添加内容。</p>
          )}
        </div>
      </section>
    </div>
  )
}
