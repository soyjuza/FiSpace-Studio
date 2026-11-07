import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Plans } from './collections/Plans'
import { Users } from './collections/Users'
import { Home } from './globals/Home'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' · FiSpace Studio',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Plans, Media, Users],
  globals: [Home, SiteSettings],
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // La misma base de datos se usa en local y en producción:
    // el esquema solo cambia mediante migraciones (src/migrations), nunca con "push".
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      // Sube directo del navegador a Blob: evita el límite de 4.5 MB de las funciones (videos).
      clientUploads: true,
    }),
  ],
})
