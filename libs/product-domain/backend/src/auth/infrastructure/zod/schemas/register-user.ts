import { z } from 'zod';

export const RegisterUserSchema = z.object({
  fullName: z
    .string({ message: 'Full name is required.' })
    .min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z
    .string({ message: 'Email is required.' })
    .email({ message: 'Invalid email address.' })
    .nonempty(),
  phoneNumber: z.string().nullable(),
  password: z
    .string({ message: 'Password is required' })
    .min(10, { message: 'Password must be at least 10 characters.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
});
