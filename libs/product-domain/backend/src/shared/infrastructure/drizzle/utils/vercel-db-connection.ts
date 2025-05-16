// # Libs
import { createPool } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

interface DrizzleVercelDbConnection {
  connectionString: string;
}

export function createDrizzleVercelDbConnection(config: DrizzleVercelDbConnection) {
  const { connectionString } = config;

  const client = createPool({
    connectionString,
  })

  return drizzle(client);
}