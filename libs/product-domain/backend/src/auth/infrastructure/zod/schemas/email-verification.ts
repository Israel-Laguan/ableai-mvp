import { z } from 'zod';

export const EmailVerificationSchema = z.object({
  email: z.string({ message: 'Email is required.' }).nonempty(),
});
