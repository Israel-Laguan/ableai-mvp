import * as z from 'zod';

import { Interfaces } from '../../../domain';

import { Infra } from '../../../../shared';

export const RegisterGigWorkSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.RegisterGigWorkRequestBody>({
    additionalInstructions: z.string().optional(),
    address: z.string(),
    description: z.string(),
    endDate: z.string().date(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    paymentPerHour: z.number().min(0),
    skills: z.array(z.string()).min(1).nonempty(),
    startDate: z.string().date(),
    title: z.string().min(1).max(250),
  })
    .strict()
    .superRefine((data, ctx) => {
      if (new Date(data.startDate) >= new Date(data.endDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Start date must be before end date',
        });
        return z.NEVER;
      }
    });
