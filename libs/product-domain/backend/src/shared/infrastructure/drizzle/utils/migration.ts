import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

type DbConnection = ReturnType<typeof drizzle>;

export async function runMigrations({
  db,
  migrationsFolder,
}: {
  db: DbConnection;
  migrationsFolder: string;
}) {
  try {
    const dbName = await db
      .execute(sql`SELECT current_database() AS "current_database";`)
      .then(result => result.rows[0]['current_database']);

    const migrationsInDb = await db
      .execute(
        sql`
      SELECT *
      FROM drizzle.__drizzle_migrations
      ORDER BY created_at ASC;
    `
      )
      .then(result => result.rows);

    const migrationsInJournal = JSON.parse(
      fs.readFileSync(`${migrationsFolder}/meta/_journal.json`, 'utf8')
    );

    const dbRowsCount = migrationsInDb.length;

    const journalRowsCount = Array.isArray(migrationsInJournal.entries)
      ? migrationsInJournal.entries.length
      : 0;

    if (dbRowsCount === journalRowsCount) {
      console.log(
        '\x1b[32m%s\x1b[0m',
        `No new migrations to apply. \x1b[1m'${dbName}'\x1b[0m\x1b[32m is up to date.\x1b[0m`
      );

      return;
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `Migrations from \x1b[1m'${dbName}'\x1b[0m\x1b[33m out of sync. Pending migrations:`
      );
      for (let i = dbRowsCount; i < journalRowsCount; i++) {
        const entry = migrationsInJournal.entries[i];
        if (entry && entry.tag) {
          console.log('\x1b[33m%s\x1b[0m', `${entry.tag}`);
        }
      }
      console.log('\x1b[33m%s\x1b[0m', 'Running migrations...');
    }

    await migrate(db, {
      migrationsFolder,
    });
    console.log('\x1b[32m%s\x1b[0m', 'Migrations ran successfully');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}
