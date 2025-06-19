import * as p from 'drizzle-orm/pg-core';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const privateDataUser = Schemas.withBaseSchema('private_data_user', {
  phoneNumber: p.varchar('phone_number').unique(),
});
