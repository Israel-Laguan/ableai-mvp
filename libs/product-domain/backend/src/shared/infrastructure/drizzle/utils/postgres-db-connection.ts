import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolOptions } from 'pg';

interface DrizzleVercelDbConnection {
  connectionString: string;
  environment: 'development' | 'production' | 'test';
}

export function createDrizzlePostgresDbConnection(config: DrizzleVercelDbConnection) {
  const { connectionString } = config;

  const poolOptions = {
    connectionString,
  } as PoolOptions;

  if (config.environment !== 'development') {
    poolOptions.ssl = {
      rejectUnauthorized: false,
    };
  }

  const client = new Pool(poolOptions);

  return drizzle(client);
}
