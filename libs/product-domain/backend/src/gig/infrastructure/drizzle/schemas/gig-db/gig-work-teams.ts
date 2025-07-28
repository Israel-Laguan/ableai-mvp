import * as p from 'drizzle-orm/pg-core';

import { Constants, type GigWorkTeam } from '@models/gig';

import { Schemas } from '../../../../../shared/infrastructure/drizzle';

const {
  GIG_WORK_TEAM_STATUS: { PENDING, ACCEPTED, REJECTED, COMPLETED, CANCELLED, PAID },
} = Constants;

export const gigWorkTeams = Schemas.withBaseSchema<GigWorkTeam>('gig_work_teams', {
  awardedBadge: p.varchar('awarded_badge'),
  delegateTo: p.integer('delegate_to'),
  endDateOffer: p.timestamp('end_date_offer'),
  endGig: p.boolean('end_gig').default(false),
  expenses: p.numeric('expenses', { mode: 'number' }).default(0),
  feedback: p.varchar('feedback'),
  gigWorkId: p.integer('gig_work_id'),
  isAcceptedOffer: p.boolean('is_accepted_offer').default(false),
  paymentId: p.integer('payment_id'),
  workerSkillId: p.integer('worker_skill_id'),
  status: p
    .varchar('status', {
      enum: [PENDING, ACCEPTED, REJECTED, COMPLETED, CANCELLED, PAID],
    })
    .default(PENDING),
  tips: p.numeric('tips', { mode: 'number' }).default(0),
  totalPayment: p.numeric('total_payment', { mode: 'number' }).default(0),
  workerId: p.integer('worker_id').notNull(),
  workTime: p.integer('work_time').default(0),
  wouldWork: p.boolean('would_work').default(true),
});
