import type { GlobalConfig } from 'payload'

import { adminOnly, anyone } from '../access'
import { adminGroups } from '../lib/adminGroups'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: '站点设置',
  admin: {
    group: adminGroups.site,
    description: '配置站点名称、首页文案、页脚信息等全局内容。',
  },
  access: {
    read: anyone,
    update: adminOnly,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Edu100.net',
      label: '站点名称',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: '专注优质教育内容',
      label: '标语',
    },
    {
      name: 'description',
      type: 'textarea',
      label: '站点描述',
    },
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: '开启你的学习之旅',
      label: '首页主标题',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      defaultValue: '精选课程与优质文章，助力持续成长',
      label: '首页副标题',
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: '联系邮箱',
    },
    {
      name: 'footerText',
      type: 'text',
      defaultValue: '© Edu100.net 教育内容平台',
      label: '页脚文字',
    },
  ],
}
