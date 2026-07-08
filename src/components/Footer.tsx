import React from 'react'

type FooterProps = {
  footerText: string
  contactEmail?: string | null
}

export function Footer({ footerText, contactEmail }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>{footerText}</p>
        {contactEmail && (
          <p>
            联系邮箱：
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        )}
      </div>
    </footer>
  )
}
