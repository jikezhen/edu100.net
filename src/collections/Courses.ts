import type { CollectionConfig } from 'payload'

import { adminOrEditor, authenticatedOrPublished } from '../access'
import { chineseSlugField } from '../fields/chineseSlugField'
import { adminGroups } from '../lib/adminGroups'

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: '课程',
    plural: '课程',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'status', 'publishedAt', 'updatedAt'],
    group: adminGroups.content,
    description: '管理课程内容，含难度、课时、价格与讲师信息。',
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
    chineseSlugField({ fieldToUse: 'title' }),
    {
      name: 'excerpt',
      type: 'textarea',
      label: '课程简介',
      admin: {
        description: '显示在课程列表和详情页顶部的简短介绍。',
      },
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
        description: '填写图片外链地址（当前版本未启用 R2 文件上传）。',
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
        description: '留空表示免费课程。',
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
        description: '仅「已发布」的课程会显示在前台网站。',
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
