import { z } from 'zod';

export const PhoneVerificationSchema = z.object({
  idToken: z.string({ message: 'idToken is required.' }).nonempty(),
});
