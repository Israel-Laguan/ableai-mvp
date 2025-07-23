import * as z from 'zod';

import type { Interfaces } from '../../../domain';

import { Infra } from '../../../../shared';

export const RegisterGigWorkTeamSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.RegisterGigWorkTeamRequestBody>({
    endDateOffer: z.date(),
    gigWorkId: z.number().positive(),
    skillId: z.number().positive(),
    totalPayment: z.number().positive(),
  });
