import z from 'zod';

import { emailSchema, fullNameSchema, passwordSchema, phoneNumberSchema } from './shared';

export const updateUserSchema = z
  .object({
    lastPassword: passwordSchema.optional(),

    password: passwordSchema.optional(),

    privateDataUser: z
      .object({
        fullName: fullNameSchema.optional(),
        email: emailSchema.optional(),
        phoneNumber: phoneNumberSchema.optional(),
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
