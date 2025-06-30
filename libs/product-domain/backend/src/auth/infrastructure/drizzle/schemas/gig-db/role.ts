import * as p from 'drizzle-orm/pg-core';

import type { Role } from '@models/auth';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const roles = Schemas.withBaseSchema<Role>('roles', {
  name: p.varchar('name').notNull().unique(),
});
