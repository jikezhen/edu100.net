import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOrEditor, authenticatedOrPublished } from '../access'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'status', 'publishedAt', 'updatedAt'],
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
      label: '课程名称',
    },
    slugField({ fieldToUse: 'title' }),
    {
      name: 'excerpt',
      type: 'textarea',
      label: '课程简介',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: '课程详情',
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
        type: { equals: 'course' },
      },
    },
    {
      name: 'instructor',
      type: 'relationship',
      relationTo: 'users',
      label: '讲师',
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      defaultValue: 'beginner',
      options: [
        { label: '入门', value: 'beginner' },
        { label: '进阶', value: 'intermediate' },
        { label: '高级', value: 'advanced' },
      ],
      label: '难度',
    },
    {
      name: 'duration',
      type: 'text',
      label: '课时',
      admin: {
        description: '例如：12 课时 / 24 小时',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: '价格（元）',
      admin: {
        description: '留空表示免费课程',
      },
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
