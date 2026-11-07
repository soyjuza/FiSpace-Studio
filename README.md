# FiSpace Studio

Landing de **FiSpace Studio** con panel de administración para editar el contenido sin programar.

**Stack:** Next.js 16 (App Router) · Payload CMS 3 · Postgres (Neon) · Vercel Blob · TypeScript

## Estructura

```
src/
├─ app/(frontend)/      Página pública (estática, se regenera al guardar en el panel)
├─ app/(payload)/       Panel /admin y API de Payload
├─ collections/         Planes, Archivos (media), Usuarios
├─ globals/             Página de inicio (textos por sección) y Ajustes generales
├─ components/          Secciones, robots SVG y componentes cliente (video, carrusel, loader)
├─ content/defaults.ts  Contenido inicial / respaldo
└─ migrations/          Migraciones de esquema y de contenido
```

## Desarrollo

Requiere Node `>=24.22.1` (ver `.nvmrc`) y pnpm.

```bash
vercel env pull          # trae DATABASE_URL, BLOB_READ_WRITE_TOKEN y PAYLOAD_SECRET
pnpm install
pnpm migrate             # aplica migraciones pendientes
pnpm dev                 # http://localhost:3000  ·  panel en /admin
```

### Cambiar el esquema (campos del panel)

El esquema **solo** cambia con migraciones (`push: false`), porque local y producción comparten base de datos:

```bash
pnpm migrate:create nombre-del-cambio
pnpm migrate
pnpm generate:types
```

En Vercel, `pnpm vercel-build` corre `payload migrate` antes de `next build`.
