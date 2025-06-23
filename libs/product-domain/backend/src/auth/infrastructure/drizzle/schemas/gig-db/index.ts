import * as p from 'drizzle-orm/pg-core';

import { LAST_APP_ROLE } from '@models/auth';
import { Schemas } from '../../../../../shared/infrastructure/drizzle';

const { BUYER, WORKER } = LAST_APP_ROLE;

export const users = Schemas.withBaseSchema('users', {
  uid: p.varchar('firebase_uid').notNull().unique(),
  lastAppRole: p.varchar('last_app_role', { enum: [BUYER, WORKER] }),
  privateDataUserId: p.integer('private_data_user_id').notNull(),
  roleId: p.integer('role_id').notNull(),
});
