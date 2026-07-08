import type { CollectionConfig } from 'payload'

import { adminOrEditor, anyone } from '../access'
import { chineseSlugField } from '../fields/chineseSlugField'
import { adminGroups } from '../lib/adminGroups'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: '分类',
    plural: '分类',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'updatedAt'],
    group: adminGroups.content,
    description: '为文章和课程提供分类标签。',
  },
  access: {
    read: anyone,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: '分类名称',
    },
    chineseSlugField({ fieldToUse: 'name' }),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'post',
      options: [
        { label: '文章', value: 'post' },
        { label: '课程', value: 'course' },
      ],
      label: '分类类型',
      admin: {
        description: '区分该分类用于文章还是课程。',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: '描述',
    },
  ],
}
