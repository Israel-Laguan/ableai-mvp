import z from 'zod';

import type { Interfaces } from '../../../domain';

import { Infra } from '../../../../shared';
import { LocationSchema } from '.';

export const MatchWorkersInputSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.MatchWorkersInput>({
    userId: z.number().int().positive(),
    distanceInKm: z.number().int().positive().default(10),
    limit: z.number().int().positive().default(5),
    location: LocationSchema.optional(),
    skills: z.array(z.string()).min(1),
    startDate: z.string().date(),
  }).strict();
