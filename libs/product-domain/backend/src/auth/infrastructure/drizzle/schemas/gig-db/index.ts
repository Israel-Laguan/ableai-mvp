import * as p from 'drizzle-orm/pg-core';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const users = Schemas.withBaseSchema('users', {
  avatarUrl: p.varchar('avatar_url'),
  displayName: p.varchar('display_name'),
  lastAppRole: p.varchar('last_app_role'),
  lastViewBuyer: p.varchar('last_view_buyer'),
  lastViewWorker: p.varchar('last_view_worker'),
  password: p.varchar().notNull(),
  privateDataUserId: p.integer('private_data_user_id').notNull(),
  enabled: p.boolean().notNull().default(false),
  roleId: p.integer('role_id').notNull(),
});
