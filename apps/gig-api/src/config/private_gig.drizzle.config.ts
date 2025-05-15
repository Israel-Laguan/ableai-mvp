import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default {
    schema: './src/schema.ts',
    out: './src/private_gig_migrations',
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.PRIVATE_GIG_DB_URL,  
    },
} satisfies Config;