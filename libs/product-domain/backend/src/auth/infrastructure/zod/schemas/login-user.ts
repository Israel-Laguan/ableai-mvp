import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z
    .string({ message: 'Email is required.' })
    .email({ message: 'Invalid email address.' })
    .nonempty(),

  password: z
    .string({ message: 'Password is required' })
    .min(10, { message: 'Invalid password length.' }),
});
