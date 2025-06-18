import z from 'zod';

export const emailSchema = z
  .string({ message: 'Email is required.' })
  .email({ message: 'Invalid email address.' })
  .nonempty();

export const fullNameSchema = z
  .string({ message: 'Full name is required.' })
  .min(3, { message: 'Full name must be at least 3 characters.' });

export const passwordSchema = z
  .string({ message: 'Password is required' })
  .min(10, { message: 'Password must be at least 10 characters.' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  .optional();

export const phoneNumberSchema = z.string().startsWith('+');
