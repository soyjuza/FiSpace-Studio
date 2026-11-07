import type { CollectionConfig } from 'payload'

import { revalidateHome } from '../hooks/revalidateHome'

export const Plans: CollectionConfig = {
  slug: 'plans',
  labels: { singular: 'Plan', plural: 'Planes' },
  // Permite reordenar las tarjetas arrastrándolas en el panel.
  orderable: true,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'buttonLabel', 'highlighted', 'updatedAt'],
    description: 'Tarjetas de la sección "Cómo colaboro con tu negocio". Arrástralas para cambiar el orden.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateHome],
    afterDelete: [revalidateHome],
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      required: true,
    },
    {
      name: 'introLabel',
      label: 'Texto antes de la lista',
      type: 'text',
      admin: { description: 'Ej: "Trabajo sobre:" o "incluye:"' },
    },
    {
      name: 'features',
      label: 'Puntos de la lista',
      type: 'array',
      labels: { singular: 'Punto', plural: 'Puntos' },
      fields: [{ name: 'text', label: 'Texto', type: 'text', required: true }],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonLabel',
          label: 'Texto del botón',
          type: 'text',
          required: true,
        },
        {
          name: 'highlighted',
          label: 'Tarjeta destacada',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Le da el borde/realce especial.' },
        },
      ],
    },
    {
      name: 'whatsappMessage',
      label: 'Mensaje de WhatsApp',
      type: 'textarea',
      admin: {
        description:
          'Mensaje que se escribe automáticamente cuando alguien toca el botón. Si lo dejas vacío, solo abre el chat.',
      },
    },
  ],
}
