import z from 'zod';

import type { Interfaces } from '../../../domain';

import { APP_ROLE } from '@models/shared';
import { Infra } from '../../../../shared';

export const GetOneGigWorkTeamParamsSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.GetOneGigWorkTeamRequestParams>({
    id: z.string().regex(/^\d+$/, { message: 'id must be a positive integer' }),
    appRole: z.enum([APP_ROLE.WORKER, APP_ROLE.BUYER]),
  });
