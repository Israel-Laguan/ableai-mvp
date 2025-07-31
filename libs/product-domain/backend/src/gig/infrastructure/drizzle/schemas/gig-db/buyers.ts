import * as p from 'drizzle-orm/pg-core';

import type { Buyer } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const buyers = Schemas.withBaseSchema<Buyer>('buyers', {
  badgesAwarded: p.varchar('badges_awarded'),
  businessAddress: p.varchar('business_address'),
  businessName: p.varchar('business_name'),
  businessRegistrationNumber: p.varchar('business_registration_number'),
  businessRole: p.varchar('business_role'),
  representativeId: p.varchar('representative_id'),
  socialNetworkUrl: p.varchar('social_network_url'),
  userId: p.integer('user_id').notNull().unique(),
  videoUrl: p.varchar('video_url'),
  responseRate: p.integer('response_rate').default(0),
  wouldWork: p.integer('would_work').default(0),
});
