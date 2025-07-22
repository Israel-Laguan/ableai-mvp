import z from 'zod';

import type { Interfaces } from '../../../domain';

import { Infra } from '../../../../shared';

export const RegisterBuyerSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.RegisterBuyerRequestBody>({
    businessAddress: z.string().optional(),
    businessName: z.string().optional(),
    businessRegistrationNumber: z.string().optional(),
    businessRole: z.string().optional(),
    representativeId: z.string().optional(),
    socialNetworkUrl: z.string().optional(),
    videoUrl: z.string().optional(),
  }).strict();
