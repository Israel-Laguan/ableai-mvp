import * as p from 'drizzle-orm/pg-core';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const privateDataUser = Schemas.withBaseSchema('private_data_user', {
  fullName: p.varchar('full_name').notNull(),
  email: p.varchar().notNull().unique(),
  phoneNumber: p.varchar('full_name').unique(),
});
