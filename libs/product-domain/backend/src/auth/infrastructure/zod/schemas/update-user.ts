import z from 'zod';

import type { UpdateInput } from '../../../domain/interfaces';

import { makeZodObjectSchema } from '../../../../shared/infrastructure/zod/utils';
import { AddressSchema, PhoneNumberSchema } from './shared';
import { Infra } from '@models/auth';

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

const PrivateDataUser = makeZodObjectSchema<Infra.UpdatePrivateDataInput>({
  address: AddressSchema.optional(),
  kycUrl: z.string().url().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  phoneNumber: PhoneNumberSchema.optional(),
  rwtUrl: z.string().url().optional(),
})
  .strict()
  .superRefine((data, ctx) => {
    const hasLat = data.latitude !== undefined;
    const hasLng = data.longitude !== undefined;
    if (hasLat !== hasLng) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Both latitude and longitude must be provided together.',
        path: hasLat ? ['longitude'] : ['latitude'],
      });
    }
  });

const UserSchema = makeZodObjectSchema<Omit<Infra.IUpdateUserInput, 'id'>>({
  isBuyerAllowed: z.boolean().optional(),
  isKycApproved: z.boolean().optional(),
  isPublicProfile: z.boolean().optional(),
  isRtwApproved: z.boolean().optional(),
  isWorkerAllowed: z.boolean().optional(),
  socialMediaUrl: z.string().url().optional(),
}).strict();

const WorkerSchema = makeZodObjectSchema<Infra.UpdateWorkerInput>({
  feedbackSummary: z.string().optional(),
  slotAvailability: z.string(),
  socialNetworkUrl: z.string().url().optional(),
  tags: z.string().optional(),
}).strict();

export const UpdateMeUserSchema = makeZodObjectSchema<UpdateInput>({
  buyer: BuyerSchema.optional(),
  privateDataUser: PrivateDataUser.optional(),
  user: UserSchema.optional(),
  worker: WorkerSchema.optional(),
});
