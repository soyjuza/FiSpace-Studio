import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [{ name: 'name', label: 'Nombre', type: 'text' }],
}
