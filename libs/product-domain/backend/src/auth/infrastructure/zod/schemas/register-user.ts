import { z } from 'zod';

import { EmailSchema, FullNameSchema, PasswordSchema, PhoneNumberSchema } from './shared';

export const RegisterUserSchema = z
  .object({
    fullName: FullNameSchema,
    email: EmailSchema,
    phoneNumber: PhoneNumberSchema.optional(),
    password: PasswordSchema,
  })
  .strict();
