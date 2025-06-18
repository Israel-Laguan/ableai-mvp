import z from 'zod';

import { EmailSchema, FullNameSchema, PhoneNumberSchema } from './shared';

export const UpdateUserSchema = z.object({
  privateDataUser: z
    .object({
      fullName: FullNameSchema.optional(),
      email: EmailSchema.optional(),
      phoneNumber: PhoneNumberSchema.optional(),
    })
    .optional(),

  user: z
    .object({
      avatarUrl: z.string().url().optional(),
      displayName: z.string().optional(),
      lastAppRole: z.string().optional(),
      lastViewBuyer: z.string().optional(),
      lastViewWorker: z.string().optional(),
    })
    .optional(),
});
