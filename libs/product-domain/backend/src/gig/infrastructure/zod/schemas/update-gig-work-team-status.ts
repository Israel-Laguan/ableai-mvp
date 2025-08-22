import type { Interfaces } from '../../../domain';

import z from 'zod';

import { Constants } from '@models/gig';
import { APP_ROLE } from '@models/shared';
import { Infra } from '../../../../shared';

const { BUYER, WORKER } = APP_ROLE;
const {
  GIG_WORK_TEAM_STATUS: { ACCEPTED, CANCELLED, COMPLETED, PAID, REJECTED, STARTED },
} = Constants;

export const UpdateGigWorkTeamStatusSchema =
  Infra.Zod.Utils.makeTypedZodObject<Interfaces.UpdateGitWorkTeamStatusInput>()
    .schema({
      status: z.enum([ACCEPTED, CANCELLED, COMPLETED, PAID, REJECTED, STARTED]),
      id: z.number().positive(),
      appRole: z.enum([BUYER, WORKER]),
      userId: z.number().positive(),
    })
    .strict();
