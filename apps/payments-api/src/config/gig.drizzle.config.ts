import type { Config } from 'drizzle-kit';

export default {
    schema: './src/schema.ts',
    out: './src/gig_migrations',
    dbCredentials: {
        host: process.env.DB_HOST ?? 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        user: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        database: process.env.DB_NAME ?? 'gig_db',
        ssl: process.env.DB_SSL === 'true'
    },
    strict: true,
    dialect: 'postgresql',
} satisfies Config;