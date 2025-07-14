import z from 'zod';

export const AiManagerSchema = z
  .object({
    prompt: z.string().min(1, 'Prompt is required'),
  })
  .strict();
