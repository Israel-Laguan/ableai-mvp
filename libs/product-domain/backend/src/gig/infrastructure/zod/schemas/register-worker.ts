import { z } from 'zod';

import type { Interfaces } from '../../../domain';

import { Infra } from '../../../../shared';

export const RegisterWorkerSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.RegisterWorkerRequestBody>({
    socialNetworkUrl: z.string().url().optional(),
    tags: z.string().optional(),
  }).strict();
