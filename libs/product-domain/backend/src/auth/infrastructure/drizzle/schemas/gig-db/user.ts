import * as p from 'drizzle-orm/pg-core';

import type { User } from '@models/auth';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const users = Schemas.withBaseSchema<User>('users', {
  isBuyerAllowed: p.boolean('is_buyer_allowed').notNull().default(true),
  isKycApproved: p.boolean('is_kyc_approved').notNull().default(false),
  isPublicProfile: p.boolean('is_public_profile').notNull().default(true),
  isRtwApproved: p.boolean('is_rtw_approved').notNull().default(false),
  isWorkerAllowed: p.boolean('is_worker_allowed').notNull().default(false),
  privateDataUserId: p.integer('private_data_user_id').notNull(),
  roleId: p.integer('role_id').notNull(),
  socialMediaUrl: p.varchar('social_media_url'),
  uid: p.varchar('firebase_uid').notNull().unique(),
});
