import * as p from 'drizzle-orm/pg-core';

import type { SkillHires } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const skillHires = Schemas.withBaseSchema<SkillHires>('skill_hires', {
  name: p.varchar('name').notNull(),
  buyerId: p.integer('buyer_id').notNull(),
  gigsCompleted: p.integer('gigs_completed').default(0),
});
