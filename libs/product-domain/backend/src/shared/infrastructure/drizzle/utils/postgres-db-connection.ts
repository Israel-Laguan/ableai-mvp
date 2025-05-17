import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

interface DrizzleVercelDbConnection {
  connectionString: string;
}

export function createDrizzlePostgresDbConnection(config: DrizzleVercelDbConnection) {
  const { connectionString } = config;

  const client = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return drizzle(client);
}
