import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './src/gig_migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.GIG_DB_URL,
  },
} satisfies Config;
