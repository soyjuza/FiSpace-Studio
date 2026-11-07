import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "credit_name" SET DEFAULT 'soyjuza';
  ALTER TABLE "site_settings" ALTER COLUMN "credit_url" SET DEFAULT 'https://github.com/soyjuza';
  UPDATE "site_settings" SET "credit_name" = 'soyjuza' WHERE "credit_name" = 'zapatacode';
  UPDATE "site_settings" SET "credit_url" = 'https://github.com/soyjuza' WHERE "credit_url" = 'https://github.com/zapatacode';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "credit_name" SET DEFAULT 'zapatacode';
  ALTER TABLE "site_settings" ALTER COLUMN "credit_url" SET DEFAULT 'https://github.com/zapatacode';`)
}
