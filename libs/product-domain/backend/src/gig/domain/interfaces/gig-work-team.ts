import type { GigWorkTeam } from '@models/gig';
import type { CreateEntityInput } from '@models/shared';
import type { Repositories } from '..';

export interface MakeRegisterGigWorkTeam {
  gigWorkTeamRepository: Repositories.GigWorkTeamRepository;
  workerSkillRepository: Repositories.WorkerSkillRepository;
}

export type RegisterGigWorkTeamInput = CreateEntityInput<
  Omit<
    GigWorkTeam,
    | 'awardedBadge'
    | 'delegateTo'
    | 'endGig'
    | 'expenses'
    | 'feedback'
    | 'isAcceptedOffer'
    | 'paymentId'
    | 'status'
    | 'tips'
    | 'workTime'
    | 'wouldWork'
    | 'totalPayment'
  >
>;

export type RegisterGigWorkTeamRequestBody = Omit<
  RegisterGigWorkTeamInput,
  'workerId' | 'createdBy'
>;

export type RegisterGigWorkTeamOutput = GigWorkTeam;
