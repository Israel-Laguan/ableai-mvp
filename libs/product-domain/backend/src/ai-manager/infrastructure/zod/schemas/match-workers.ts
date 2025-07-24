import z from 'zod';

import type { Interfaces } from '../../../domain';

import { Infra } from '../../../../shared';

export const MatchWorkersInputSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.MatchWorkersInput>({
    discardedWorkers: z.array(z.number()).optional(),
    gigDate: z.string().date(),
    hourlyRate: z.number().int().positive().optional(),
    limit: z.number().int().positive().default(5),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    radius: z.number().int().positive().default(10),
    offset: z.number().int().nonnegative().default(0),
    required: z.array(z.string()).min(1).optional(),
    skills: z.array(z.string()).min(1),
  }).strict();
