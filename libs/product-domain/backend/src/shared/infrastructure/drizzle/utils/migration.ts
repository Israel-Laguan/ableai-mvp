import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';

type DbConnection = ReturnType<typeof drizzle>;

export async function runMigrations({
  db,
  migrationsFolder,
}: {
  db: DbConnection;
  migrationsFolder: string;
}) {
  try {
    await migrate(db, {
      migrationsFolder,
    });
    console.log('Migrations ran successfully');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}
