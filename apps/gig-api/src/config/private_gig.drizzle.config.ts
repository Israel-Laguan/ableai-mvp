import type { Config } from 'drizzle-kit';

export default {
    schema: './src/schema.ts',
    out: './src/private_gig_migrations',
    dbCredentials: {
        host: process.env.DB_HOST ?? 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        user: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        database: process.env.DB_NAME ?? 'private_gig_db',
    },
    strict: true,
    dialect: 'postgresql'
} satisfies Config;