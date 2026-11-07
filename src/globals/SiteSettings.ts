import type { GlobalConfig } from 'payload'

import { defaultSettings as d } from '../content/defaults'
import { revalidateHome } from '../hooks/revalidateHome'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Ajustes generales',
  access: { read: () => true },
  hooks: { afterChange: [revalidateHome] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'email', label: 'Email de contacto', type: 'email', required: true, defaultValue: d.email },
        {
          name: 'whatsappNumber',
          label: 'Número de WhatsApp',
          type: 'text',
          required: true,
          defaultValue: d.whatsappNumber,
          admin: { description: 'Con indicativo y sin "+" ni espacios. Ej: 573001234567' },
          validate: (value: string | null | undefined) =>
            !value || /^\d{8,15}$/.test(value) || 'Solo números, con indicativo del país (8 a 15 dígitos).',
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Redes sociales',
      type: 'array',
      labels: { singular: 'Red', plural: 'Redes' },
      defaultValue: d.socialLinks,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', label: 'Nombre', type: 'text', required: true },
            { name: 'url', label: 'Enlace', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'footerText', label: 'Texto del pie de página', type: 'text', defaultValue: d.footerText },
    {
      type: 'row',
      fields: [
        { name: 'creditName', label: 'Crédito: nombre', type: 'text', defaultValue: d.creditName },
        { name: 'creditUrl', label: 'Crédito: enlace', type: 'text', defaultValue: d.creditUrl },
      ],
    },
  ],
}
