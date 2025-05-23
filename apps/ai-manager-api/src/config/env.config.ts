import z from 'zod';

const envSchema = z.object({
  HOST: z.string().default('localhost'),
  PORT: z.string().default('3002'),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  GIG_DB_URL: z.string().min(1),
  ENV_JWT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
