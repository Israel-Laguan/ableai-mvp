import * as p from 'drizzle-orm/pg-core';

import type { User } from '@models/auth';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const users = Schemas.withBaseSchema<User>('users', {
  isBuyerAllowed: p.boolean('is_buyer_allowed').default(true),
  isKycApproved: p.boolean('is_kyc_approved').default(false),
  isPublicProfile: p.boolean('is_public_profile').default(true),
  isRtwApproved: p.boolean('is_rtw_approved').default(false),
  isWorkerAllowed: p.boolean('is_worker_allowed').default(false),
  privateDataUserId: p.integer('private_data_user_id').notNull(),
  roleId: p.integer('role_id').notNull(),
  socialMediaUrl: p.varchar('social_media_url'),
  uid: p.varchar('firebase_uid').notNull().unique(),
});
