import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { defaultHome, defaultPlans, defaultSettings } from '../content/defaults'

/**
 * Carga el contenido actual de la página (textos y planes) en el CMS.
 * Corre una sola vez, como cualquier migración.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const context = { disableRevalidate: true }

  const existing = await payload.count({ collection: 'plans', req })
  if (existing.totalDocs === 0) {
    for (const plan of defaultPlans) {
      await payload.create({ collection: 'plans', data: plan, req, context })
    }
  }

  await payload.updateGlobal({ slug: 'home', data: defaultHome, req, context })
  await payload.updateGlobal({ slug: 'site-settings', data: defaultSettings, req, context })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({ collection: 'plans', where: { id: { exists: true } }, req })
}
