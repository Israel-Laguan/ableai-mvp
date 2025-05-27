import type { Config } from 'drizzle-kit';

export default {
  schema: './src/shared/infrastructure/drizzle/mocks/schema.ts',
  out: './src/shared/infrastructure/drizzle/migrations/gig-migrations',
  strict: true,
  dialect: 'postgresql',
} satisfies Config;
