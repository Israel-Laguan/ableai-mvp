import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  HOST: z.string().default('localhost'),
  PORT: z.string().default('3001'),
  GIG_DB_URL: z.string(),
  PRIVATE_GIG_DB_URL: z.string(),
  GOOGLE_APPLICATION_CREDENTIALS: z
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
  REDIRECT_AFTER_REGISTER_URL: z.string().url(),
  EMAIL_CREDENTIALS: z
    .string()
    .transform(v => {
      const decoded = Buffer.from(v, 'base64').toString('utf8');
      return JSON.parse(decoded);
    })
    .refine(v =>
      z
        .object({
          user: z.string().email(),
          pass: z.string(),
        })
        .parse(v)
    ),
});

export const env = envSchema.parse(process.env);
