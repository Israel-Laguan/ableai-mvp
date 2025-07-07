import z from 'zod';

import { CONSTANTS } from '@shared';

const { NODE_ENV } = CONSTANTS;

const envSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV).default(NODE_ENV[0]),
  HOST: z.string().default('localhost'),
  PORT: z.string().default('3005'),

  GIG_DB_URL: z.string(),
  PRIVATE_GIG_DB_URL: z.string(),
});

const draw = envSchema.parse(process.env);
export const env = {
  ...draw,
};
