import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { RichTextContent } from '@/components/RichTextContent'
import { getPayloadClient } from '@/lib/payload'

const levelLabels: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'courses',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    limit: 1,
  })

  const course = result.docs[0]
  if (!course) return { title: '课程未找到' }

  return {
    title: course.title,
    description: course.excerpt || undefined,
  }
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'courses',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 1,
  })

  const course = result.docs[0]
  if (!course) notFound()

  const categoryName =
    course.category && typeof course.category === 'object' ? course.category.name : undefined
  const instructorName =
    course.instructor && typeof course.instructor === 'object'
      ? course.instructor.name || course.instructor.email
      : undefined

  return (
    <div className="page">
      <article className="article">
        <div className="container article-container">
          <Link href="/courses" className="back-link">
            ← 返回课程列表
          </Link>

          {course.featuredImageUrl && (
            <div className="article-cover">
              <img src={course.featuredImageUrl} alt={course.title} />
            </div>
          )}

          <header className="article-header">
            <div className="card-tags">
              {categoryName && <span className="card-tag">{categoryName}</span>}
              <span className="card-tag card-tag--muted">
                {levelLabels[course.level] || course.level}
              </span>
            </div>
            <h1>{course.title}</h1>
            <div className="article-meta">
              {instructorName && <span>讲师：{instructorName}</span>}
              {course.duration && <span>课时：{course.duration}</span>}
              <span className="card-price">
                {course.price != null && course.price > 0 ? `¥${course.price}` : '免费'}
              </span>
            </div>
            {course.excerpt && <p className="article-excerpt">{course.excerpt}</p>}
          </header>

          <RichTextContent className="article-content" data={course.description} />
        </div>
      </article>
    </div>
  )
}
