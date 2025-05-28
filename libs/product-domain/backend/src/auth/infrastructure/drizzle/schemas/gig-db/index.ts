import * as p from 'drizzle-orm/pg-core';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const users = Schemas.withBaseSchema('users', {
  password: p.varchar().notNull(),
  privateDataUserId: p.integer('private_data_user_id').notNull(),
  enabled: p.boolean().notNull().default(false),
  roleId: p.integer('role_id').notNull(),
});
