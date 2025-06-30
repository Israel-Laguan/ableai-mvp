import * as p from 'drizzle-orm/pg-core';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';
import { PrivateDataUser } from '@models/auth';

export const privateDataUser = Schemas.withBaseSchema<PrivateDataUser>('private_data_user', {
  address: p.varchar('address'),
  kycUrl: p.varchar('kyc_url'),
  latitude: p.varchar('latitude'),
  longitude: p.varchar('longitude'),
  phoneNumber: p.varchar('phone_number').unique(),
  rwtUrl: p.varchar('rwt_url'),
});
