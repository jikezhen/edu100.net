import React from 'react'

import { CourseCard } from '@/components/CourseCard'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: '课程',
}

export default async function CoursesPage() {
  const payload = await getPayloadClient()
  const courses = await payload.find({
    collection: 'courses',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 50,
    depth: 1,
  })

  return (
    <div className="page">
      <section className="page-header">
        <div className="container">
          <h1>课程</h1>
          <p>系统化学习路径，从入门到精通</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {courses.docs.length > 0 ? (
            <div className="card-grid">
              {courses.docs.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="empty-state">暂无已发布课程。</p>
          )}
        </div>
      </section>
    </div>
  )
}
