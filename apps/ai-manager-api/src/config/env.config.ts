import z from 'zod';

const envSchema = z.object({
  HOST: z.string().default('localhost'),
  PORT: z.string().default('3002'),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  AI_API_KEY: z.string(),
  MCP_SERVER_URL: z.string().url().min(1),

  GIG_DB_URL: z.string().url().min(1),
  PRIVATE_GIG_DB_URL: z.string().url().min(1),

  GOOGLE_SERVICE_ACCOUNT: z
    .string()
    .transform((v, ctx) => {
      try {
        const decoded = Buffer.from(v, 'base64').toString('utf8');
        return JSON.parse(decoded);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid GOOGLE_SERVICE_ACCOUNT. Must be a base64 encoded JSON object.',
        });
        return z.NEVER;
      }
    })
    .pipe(
      z.object({
        project_id: z.string().min(1),
        client_email: z.string().email(),
        private_key: z.string().refine(val => val.includes('-----BEGIN PRIVATE KEY-----'), {
          message: 'Invalid private key format',
        }),
      })
    )
    .transform(creds => ({
      projectId: creds.project_id,
      clientEmail: creds.client_email,
      privateKey: creds.private_key.replace(/\\n/g, '\n'),
    })),
});

export const env = envSchema.parse(process.env);
