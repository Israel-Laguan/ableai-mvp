import z from 'zod';

import type { Location } from '@models/shared';

import { Infra } from '../../../../shared';

export const LocationSchema = Infra.Zod.Utils.makeZodObjectSchema<Location>({
  latitude: z.number(),
  longitude: z.number(),
});
