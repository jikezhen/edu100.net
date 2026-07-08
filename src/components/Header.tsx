import Link from 'next/link'
import React from 'react'

type HeaderProps = {
  siteName: string
}

export function Header({ siteName }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          {siteName}
        </Link>
        <nav className="nav">
          <Link href="/">首页</Link>
          <Link href="/courses">课程</Link>
          <Link href="/posts">文章</Link>
          <Link href="/admin" className="nav-admin">
            管理后台
          </Link>
        </nav>
      </div>
    </header>
  )
}
