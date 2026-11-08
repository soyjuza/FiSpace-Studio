import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" ALTER COLUMN "contact_title" SET DEFAULT 'Trabajo con un número';
  ALTER TABLE "home" ALTER COLUMN "contact_description" SET DEFAULT 'Solo colaboro activamente con 3 clientes al mismo tiempo.
  Lo hago por enfoque.
  Si trabajamos juntos, me integro a tu sistema: analizo métricas, reviso rendimiento y
  optimizo de forma constante.';
  ALTER TABLE "home" ALTER COLUMN "contact_subtitle" SET DEFAULT 'Si buscas dirección visual real orientada a métricas,
  este es el siguiente paso.
  Cuéntame qué estás construyendo, qué estás vendiendo y dónde estás perdiendo rendimiento.
  Si veo que puedo aportar impacto real, trabajamos.
  Si no, te lo diré con honestidad.';`)

  // Arreglos de texto (solo si el contenido sigue igual al original)
  await db.execute(sql`
  UPDATE "home" SET "contact_title" = 'Trabajo con un número' WHERE "contact_title" = 'Trabajo con un numero';
  UPDATE "home" SET "contact_description" = replace("contact_description", E'tiempo.\nlo hago', E'tiempo.\nLo hago');
  UPDATE "home" SET "contact_subtitle" = replace("contact_subtitle", E'métricas\nEste es', E'métricas,\neste es');`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" ALTER COLUMN "contact_title" SET DEFAULT 'Trabajo con un numero';
  ALTER TABLE "home" ALTER COLUMN "contact_description" SET DEFAULT 'Solo colaboro activamente con 3 clientes al mismo tiempo.
  lo hago por enfoque.
  Si trabajamos juntos, me integro a tu sistema: analizo métricas, reviso rendimiento y
  optimizo de forma constante.';
  ALTER TABLE "home" ALTER COLUMN "contact_subtitle" SET DEFAULT 'Si buscas dirección visual real orientada a métricas
  Este es el siguiente paso.
  Cuéntame qué estás construyendo, qué estás vendiendo y dónde estás perdiendo rendimiento.
  Si veo que puedo aportar impacto real, trabajamos.
  Si no, te lo diré con honestidad.';`)
}
