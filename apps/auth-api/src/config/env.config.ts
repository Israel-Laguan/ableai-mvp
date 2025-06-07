import z from 'zod';

import { CONSTANTS } from '@shared';

const { NODE_ENV } = CONSTANTS;

const envSchema = z.object({
  EMAIL: z.string().email(),
  EMAIL_API_KEY: z.string(),

  ENV_JWT_SECRET: z.string(),

  GIG_DB_URL: z.string(),

  GOOGLE_SERVICE_ACCOUNT: z
    .string()
    .transform(v => {
      const decoded = Buffer.from(v, 'base64').toString('utf8');
      return JSON.parse(decoded);
    })
    .refine(v =>
      z
        .object({
          projectId: z.string(),
          clientEmail: z.string(),
          privateKey: z.string().refine(val => val.includes('-----BEGIN PRIVATE KEY-----'), {
            message: 'Invalid private key format',
          }),
        })
        .parse(v)
    ),

  HOST: z.string().default('localhost'),

  NODE_ENV: z.enum(NODE_ENV).default(NODE_ENV[0]),

  PORT: z.string().default('3001'),

  PRIVATE_GIG_DB_URL: z.string(),

  REDIRECT_AFTER_REGISTER_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
