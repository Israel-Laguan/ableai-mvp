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
