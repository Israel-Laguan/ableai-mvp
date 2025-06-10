import * as p from 'drizzle-orm/pg-core';

import { LAST_APP_ROLE } from '@models/auth';
import { Schemas } from '../../../../../shared/infrastructure/drizzle';

const { BUYER, WORKER } = LAST_APP_ROLE;

export const users = Schemas.withBaseSchema('users', {
  avatarUrl: p.varchar('avatar_url'),
  blockId: p.varchar('block_id'),
  displayName: p.varchar('display_name'),
  lastAppRole: p.varchar('last_app_role', { enum: [BUYER, WORKER] }),
  lastViewBuyer: p.varchar('last_view_buyer'),
  lastViewWorker: p.varchar('last_view_worker'),
  loginAttempts: p.integer('login_attempts').notNull().default(0),
  privateDataUserId: p.integer('private_data_user_id').notNull(),
  roleId: p.integer('role_id').notNull(),
});
