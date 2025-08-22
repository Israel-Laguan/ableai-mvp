import type { Interfaces } from '../../../domain';

import z from 'zod';

import { Constants } from '@models/gig';
import { APP_ROLE } from '@models/shared';
import { Infra } from '../../../../shared';

const { BUYER, WORKER } = APP_ROLE;
const {
  GIG_WORK_TEAM_STATUS: { CANCELLED, COMPLETED, PAID, STARTED },
} = Constants;

export const UpdateGigWorkTeamStatusSchema =
  Infra.Zod.Utils.makeTypedZodObject<Interfaces.UpdateGigWorkTeamStatusRequestBody>()
    .schema({
      status: z.enum([CANCELLED, COMPLETED, PAID, STARTED]),
      id: z.number().positive(),
      appRole: z.enum([BUYER, WORKER]),
    })
    .strict();
