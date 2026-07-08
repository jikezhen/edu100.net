import type { CollectionConfig } from 'payload'

import { adminOrEditor, authenticatedOrPublished } from '../access'
import { chineseSlugField } from '../fields/chineseSlugField'
import { adminGroups } from '../lib/adminGroups'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: '文章',
    plural: '文章',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'updatedAt'],
    group: adminGroups.content,
    description: '管理教育文章，支持富文本正文与发布状态。',
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
    chineseSlugField({ fieldToUse: 'title' }),
    {
      name: 'excerpt',
      type: 'textarea',
      label: '摘要',
      admin: {
        description: '显示在列表页和详情页顶部的简短介绍。',
      },
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
        description: '填写图片外链地址（当前版本未启用 R2 文件上传）。',
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
        description: '仅「已发布」的内容会显示在前台网站。',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: '发布时间',
      admin: {
        position: 'sidebar',
        description: '设置为「已发布」时会自动填入当前时间。',
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
