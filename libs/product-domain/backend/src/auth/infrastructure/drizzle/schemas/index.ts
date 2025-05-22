import * as p from 'drizzle-orm/pg-core';

import { Schemas } from '../../../../shared/infrastructure/drizzle';

export const users = Schemas.withBaseSchema('users', {
  password: p.varchar().notNull(),
  privateDataUserId: p.integer('private_data_user_id').notNull(),
  enabled: p.boolean().notNull().default(false),
  roleId: p.integer('role_id').notNull(),
});

export const privateDataUser = Schemas.withBaseSchema('private_data_user', {
  fullName: p.varchar('full_name').notNull(),
  email: p.varchar().notNull().unique(),
  phoneNumber: p.varchar('full_name').unique(),
});
