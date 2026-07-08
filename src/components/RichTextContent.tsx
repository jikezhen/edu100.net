import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

type RichTextContentProps = {
  data: DefaultTypedEditorState
  className?: string
}

export function RichTextContent({ data, className }: RichTextContentProps) {
  if (!data) return null

  return (
    <div className={className}>
      <RichText data={data} />
    </div>
  )
}
