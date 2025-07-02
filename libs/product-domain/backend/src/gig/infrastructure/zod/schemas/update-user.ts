import z from 'zod';

import type { UpdateInput } from '../../../domain/interfaces';

import { Infra } from '@models/gig';
import { makeZodObjectSchema } from '../../../../shared/infrastructure/zod/utils';

const BuyerSchema = makeZodObjectSchema<Infra.UpdateBuyerInput>({
  badgesAwarded: z.string().optional(),
  businessAddress: z.string().optional(),
  businessName: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  businessRole: z.string().optional(),
  representativeId: z.string().optional(),
  socialNetworkUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
}).strict();

const WorkerSchema = makeZodObjectSchema<Infra.UpdateWorkerInput>({
  feedbackSummary: z.string().optional(),
  socialNetworkUrl: z.string().url().optional(),
  tags: z.string().optional(),
}).strict();

export const UpdateMeUserSchema = makeZodObjectSchema<Omit<UpdateInput, 'user'>>({
  buyer: BuyerSchema.optional(),
  worker: WorkerSchema.optional(),
});
