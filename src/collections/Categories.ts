import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOrEditor, anyone } from '../access'
import { slugifyTitle } from '../lib/slugify'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'updatedAt'],
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
    slugField({ fieldToUse: 'name', slugify: slugifyTitle }),
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
    },
    {
      name: 'description',
      type: 'textarea',
      label: '描述',
    },
  ],
}
