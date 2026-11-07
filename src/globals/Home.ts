import type { Field, GlobalConfig } from 'payload'

import { defaultHome as d } from '../content/defaults'
import { revalidateHome } from '../hooks/revalidateHome'

const multiline = 'Cada Enter es un salto de línea en la página.'

const text = (name: string, label: string, defaultValue: string, required = true): Field => ({
  name,
  label,
  type: 'text',
  required,
  defaultValue,
})

const textarea = (name: string, label: string, defaultValue: string): Field => ({
  name,
  label,
  type: 'textarea',
  required: true,
  defaultValue,
  admin: { description: multiline },
})

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Página de inicio',
  access: { read: () => true },
  hooks: { afterChange: [revalidateHome] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Portada',
          fields: [
            text('title', 'Título', d.hero.title),
            text('titleHighlight', 'Título (parte en color)', d.hero.titleHighlight),
            textarea('description', 'Descripción', d.hero.description),
            {
              type: 'row',
              fields: [
                text('primaryButtonLabel', 'Botón principal', d.hero.primaryButtonLabel),
                text('secondaryButtonLabel', 'Botón secundario', d.hero.secondaryButtonLabel),
              ],
            },
          ],
        },
        {
          name: 'visualDirection',
          label: 'Dirección visual',
          fields: [
            text('title', 'Título', d.visualDirection.title),
            text('videoCaption', 'Texto sobre el video', d.visualDirection.videoCaption),
            {
              name: 'video',
              label: 'Video',
              type: 'upload',
              relationTo: 'media',
              filterOptions: { mimeType: { contains: 'video' } },
              admin: { description: 'Si no subes uno, se usa el video por defecto del sitio.' },
            },
            {
              name: 'poster',
              label: 'Imagen de portada del video (opcional)',
              type: 'upload',
              relationTo: 'media',
              filterOptions: { mimeType: { contains: 'image' } },
            },
          ],
        },
        {
          name: 'pricing',
          label: 'Planes',
          description: 'Las tarjetas se editan en "Planes" (menú izquierdo). Aquí solo el encabezado.',
          fields: [
            text('title', 'Título', d.pricing.title),
            textarea('subtitle', 'Subtítulo', d.pricing.subtitle),
          ],
        },
        {
          name: 'projectCta',
          label: 'Proyecto puntual',
          fields: [
            text('title', 'Título', d.projectCta.title),
            text('titleHighlight', 'Título (parte en color)', d.projectCta.titleHighlight),
            textarea('subtitle', 'Descripción', d.projectCta.subtitle),
            text('boxLabel', 'Etiqueta de la caja', d.projectCta.boxLabel),
            textarea('boxText', 'Texto de la caja', d.projectCta.boxText),
            text('formUrl', 'Enlace del formulario', d.projectCta.formUrl),
          ],
        },
        {
          name: 'contact',
          label: 'Contacto',
          fields: [
            text('title', 'Título', d.contact.title),
            text('titleHighlight', 'Título (parte en color)', d.contact.titleHighlight),
            textarea('description', 'Descripción', d.contact.description),
            textarea('subtitle', 'Texto secundario', d.contact.subtitle),
            {
              type: 'row',
              fields: [
                text('whatsappLabel', 'Botón WhatsApp', d.contact.whatsappLabel),
                text('emailLabel', 'Botón Email', d.contact.emailLabel),
              ],
            },
            text('socialText', 'Texto sobre las redes', d.contact.socialText),
          ],
        },
      ],
    },
  ],
}
