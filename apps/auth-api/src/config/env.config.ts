import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  GIG_DB_URL: z.string(),
  PRIVATE_GIG_DB_URL: z.string(),
  GOOGLE_APPLICATION_CREDENTIALS: z
    .string()
    .transform(v => JSON.parse(v))
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
  REDIRECT_AFTER_REGISTER_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
