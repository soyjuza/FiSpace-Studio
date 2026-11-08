/**
 * URL pública del sitio. En Vercel se toma del dominio de producción
 * (si un día se conecta un dominio propio, se actualiza solo).
 */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://fispace-studio.vercel.app'
