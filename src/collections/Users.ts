import type { CollectionConfig } from 'payload'

import { adminGroups } from '../lib/adminGroups'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: '用户',
    plural: '用户',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'roles', 'updatedAt'],
    group: adminGroups.system,
    description: '管理系统登录账号与角色权限。',
  },
  auth: {
    useAPIKey: true,
    tokenExpiration: 7200,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '姓名',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: [
        { label: '管理员', value: 'admin' },
        { label: '编辑', value: 'editor' },
      ],
      label: '角色',
      admin: {
        description: '管理员可管理用户与站点设置，编辑可管理内容。',
      },
      access: {
        update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
      },
    },
  ],
}
