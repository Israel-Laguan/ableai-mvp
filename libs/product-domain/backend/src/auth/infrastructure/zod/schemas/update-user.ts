import z from 'zod';

import { PhoneNumberSchema } from './shared';

export const UpdateMeUserSchema = z
  .object({
    privateDataUser: z
      .object({
        phoneNumber: PhoneNumberSchema.optional(),
      })
      .strict()
      .optional(),
  })
  .strict();
