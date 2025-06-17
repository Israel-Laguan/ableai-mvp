import z from 'zod';

import { CONSTANTS } from '@shared';

const { NODE_ENV } = CONSTANTS;

const envSchema = z.object({
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
          project_id: z.string(),
          client_email: z.string(),
          private_key: z.string().refine(val => val.includes('-----BEGIN PRIVATE KEY-----'), {
            message: 'Invalid private key format',
          }),
        })
        .parse(v)
    ),

  HOST: z.string().default('localhost'),

  NODE_ENV: z.enum(NODE_ENV).default(NODE_ENV[0]),

  REDIS_USERNAME: z.string().default('default'),
  REDIS_PASSWORD: z.string().default(''),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z
    .string()
    .default('6379')
    .transform(v => Number(v)),

  PORT: z.string().default('3001'),

  PRIVATE_GIG_DB_URL: z.string(),
});

const draw = envSchema.parse(process.env);
export const env = {
  ...draw,
  GOOGLE_SERVICE_ACCOUNT: {
    projectId: draw.GOOGLE_SERVICE_ACCOUNT.project_id,
    clientEmail: draw.GOOGLE_SERVICE_ACCOUNT.client_email,
    privateKey: draw.GOOGLE_SERVICE_ACCOUNT.private_key.replace(/\\n/g, '\n'), // Ensure newlines are correctly formatted
  },
};
