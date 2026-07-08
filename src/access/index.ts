import type { Access } from 'payload'

export const anyone: Access = () => true

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const adminOnly: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}

export const adminOrEditor: Access = ({ req: { user } }) => {
  if (!user) return false
  return Boolean(user.roles?.includes('admin') || user.roles?.includes('editor'))
}

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { status: { equals: 'published' } }
}
