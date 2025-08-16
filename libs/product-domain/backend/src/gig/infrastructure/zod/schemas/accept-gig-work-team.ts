import z from 'zod';

import type { Interfaces } from '../../../domain';

import { APP_ROLE } from '@models/shared';
import { Infra } from '../../../../shared';

const { BUYER, WORKER } = APP_ROLE;

export const AcceptGigWorkTeamSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.AcceptGigWorkTeamRequestBody>({
    accepted: z.boolean(),
    id: z.number().int().positive(),
    appRole: z.enum([BUYER, WORKER]),
  }).strict();
