import { z } from 'zod';

export const RegisterUserSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email().nonempty(),
  phoneNumber: z.string().nullable(),
  password: z.string().min(10),
});
