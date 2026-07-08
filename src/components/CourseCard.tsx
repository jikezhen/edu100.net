import Link from 'next/link'
import React from 'react'

import type { Course } from '@/payload-types'
import { courseDetailPath } from '@/lib/routes'

const levelLabels: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
}

type CourseCardProps = {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const categoryName =
    course.category && typeof course.category === 'object' ? course.category.name : undefined

  return (
    <article className="card">
      {course.featuredImageUrl && (
        <div className="card-image">
          <img src={course.featuredImageUrl} alt={course.title} />
        </div>
      )}
      <div className="card-body">
        <div className="card-tags">
          {categoryName && <span className="card-tag">{categoryName}</span>}
          <span className="card-tag card-tag--muted">{levelLabels[course.level] || course.level}</span>
        </div>
        <h3>
          <Link href={courseDetailPath(course.slug)}>{course.title}</Link>
        </h3>
        {course.excerpt && <p>{course.excerpt}</p>}
        <div className="card-meta-row">
          {course.duration && <span>{course.duration}</span>}
          <span className="card-price">
            {course.price != null && course.price > 0 ? `¥${course.price}` : '免费'}
          </span>
        </div>
      </div>
    </article>
  )
}
