import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOrEditor, authenticatedOrPublished } from '../access'
import { slugifyTitle } from '../lib/slugify'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: authenticatedOrPublished,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '标题',
    },
    slugField({ fieldToUse: 'title', slugify: slugifyTitle }),
    {
      name: 'excerpt',
      type: 'textarea',
      label: '摘要',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: '正文',
    },
    {
      name: 'featuredImageUrl',
      type: 'text',
      label: '封面图 URL',
      admin: {
        description: '填写图片外链地址（当前版本未启用 R2 文件上传）',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: '分类',
      filterOptions: {
        type: { equals: 'post' },
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: '作者',
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: '草稿', value: 'draft' },
        { label: '已发布', value: 'published' },
      ],
      label: '状态',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: '发布时间',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation, originalDoc }) => {
        if (data.status === 'published' && !data.publishedAt) {
          if (operation === 'create' || originalDoc?.status !== 'published') {
            data.publishedAt = new Date().toISOString()
          }
        }
        return data
      },
    ],
  },
}
