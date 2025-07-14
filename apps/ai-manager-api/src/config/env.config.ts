import z from 'zod';

const envSchema = z.object({
  HOST: z.string().default('localhost'),
  PORT: z.string().default('3002'),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  AI_API_KEY: z.string(),
  MCP_SERVER_URL: z.string().url().min(1),

  GIG_DB_URL: z.string().url().min(1),
  PRIVATE_GIG_DB_URL: z.string().url().min(1),
});

export const env = envSchema.parse(process.env);
