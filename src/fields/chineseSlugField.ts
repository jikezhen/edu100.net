import { slugField } from 'payload'

import { slugifyTitle } from '../lib/slugify'

type ChineseSlugFieldArgs = {
  fieldToUse: string
}

export function chineseSlugField({ fieldToUse }: ChineseSlugFieldArgs) {
  return slugField({
    fieldToUse,
    slugify: slugifyTitle,
    position: 'sidebar',
    overrides: (field) => {
      const checkbox = field.fields?.[0]
      const slugInput = field.fields?.[1]

      if (checkbox?.type === 'checkbox' && checkbox.admin) {
        checkbox.admin = {
          ...checkbox.admin,
          description: '启用后，保存时将自动根据标题生成 URL 别名。',
        }
      }

      if (slugInput?.type === 'text') {
        slugInput.label = 'URL 别名'
        slugInput.admin = {
          ...slugInput.admin,
          description: '用于前台详情页地址，例如：/posts/文章-1',
        }
      }

      return field
    },
  })
}
