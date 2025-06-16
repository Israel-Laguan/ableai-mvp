import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  HOST: z.string().default('localhost'),
  PORT: z.string().default('3003'),
  GIG_DB_URL: z.string(),
});

export const env = envSchema.parse(process.env);
