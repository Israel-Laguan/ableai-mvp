import z from 'zod';

import type { Interfaces } from '../../../domain';

import { Infra } from '../../../../shared';

export const UpdateGigWorkTeamPaymentSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.UpdateGigWorkTeamPaymentRequestBody>({
    expenses: z.number().positive().optional(),
    id: z.number().int().positive(),
    tips: z.number().positive().optional(),
    received: z.number().positive(),
    taxes: z.number().positive(),
  });
