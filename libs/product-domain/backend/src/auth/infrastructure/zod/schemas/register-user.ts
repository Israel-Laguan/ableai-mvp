import { z } from 'zod';

import { emailSchema, fullNameSchema, passwordSchema, phoneNumberSchema } from './shared';

export const registerUserSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema.optional(),
  password: passwordSchema,
});
