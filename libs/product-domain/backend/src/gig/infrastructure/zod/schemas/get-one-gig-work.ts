import z from 'zod';

import { Infra } from '../../../../shared';
import { Interfaces } from '../../../domain';

export const GetOneGigWorkParamsSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.GetOneGigWorkRequestParams>({
    id: z.string().regex(/^\d+$/, { message: 'id must be a positive integer' }),
  });
