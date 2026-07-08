import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { getSiteSettings } from '@/lib/payload'

import './styles.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  description: 'Edu100.net 教育内容平台 — 精选课程与优质文章',
  title: {
    default: 'Edu100.net',
    template: '%s | Edu100.net',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const settings = await getSiteSettings()

  return (
    <html lang="zh-CN">
      <body>
        <Header siteName={settings.siteName || 'Edu100.net'} />
        <main>{children}</main>
        <Footer
          contactEmail={settings.contactEmail}
          footerText={settings.footerText || '© Edu100.net 教育内容平台'}
        />
      </body>
    </html>
  )
}
