import * as p from 'drizzle-orm/pg-core';

import type { GigWorkTeam } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

export const gigWorkTeams = Schemas.withBaseSchema<GigWorkTeam>('gig_work_teams', {
  awardedBadge: p.varchar('awarded_badge'),
  delegateTo: p.integer('delegate_to'),
  endDateOffer: p.timestamp('end_date_offer'),
  endGig: p.boolean('end_gig'),
  feedback: p.varchar('feedback'),
  gigWorkId: p.integer('gig_work_id'),
  isAcceptedOffer: p.boolean('is_accepted_offer'),
  paymentId: p.integer('payment_id'),
  skillId: p.integer('skill_id'),
  tips: p.numeric('tips', { mode: 'number' }).default(0),
  totalPayment: p.numeric('total_payment', { mode: 'number' }),
  workerId: p.integer('worker_id'),
  workTime: p.integer('work_time').default(0),
  wouldWork: p.boolean('would_work').default(true),
});
