import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';

interface DrizzleVercelDbConnection {
  poolConfig: PoolConfig;
}

export function createDrizzlePostgresDbConnection({ poolConfig }: DrizzleVercelDbConnection) {
  const client = new Pool(poolConfig);

  return drizzle(client);
}
