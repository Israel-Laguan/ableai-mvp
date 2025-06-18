import z from 'zod';

import { EmailSchema, FullNameSchema, PasswordSchema, PhoneNumberSchema } from './shared';

export const UpdateUserSchema = z
  .object({
    lastPassword: PasswordSchema.optional(),

    password: PasswordSchema.optional(),

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
  })
  .superRefine((data, ctx) => {
    if (data.password && !data.lastPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'lastPassword is required when password is provided',
        path: ['lastPassword'],
      });
    }
  });
