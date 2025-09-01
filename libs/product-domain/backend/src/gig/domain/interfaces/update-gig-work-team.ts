import type { GigWorkTeam } from '@models/gig';
import type { APP_ROLE } from '@models/shared';
import type { Repositories } from '..';

export type MakeUpdateGigWorkTeamInput = {
  gigWorkTeamRepository: Repositories.GigWorkTeamRepository;
};

export type MakeAcceptGigWorkTeamInput = MakeUpdateGigWorkTeamInput;

export type MakeUpdateGigWorkTeamPaymentInput = MakeUpdateGigWorkTeamInput & {
  workerSkillRepository: Repositories.WorkerSkillRepository;
};

export type UpdateGigWorkTeamStatusInput = Pick<GigWorkTeam, 'status' | 'id'> & {
  appRole: APP_ROLE;
  userId: number;
};

export type AcceptGigWorkTeamInput = Omit<UpdateGigWorkTeamStatusInput, 'status'> & {
  accepted: boolean;
};

export type UpdateGigWorkTeamPaymentInput = Pick<GigWorkTeam, 'id' | 'tips' | 'totalPayment'> & {
  expenses?: number;
  userId: number;
};

export type UpdateGigWorkTeamPaymentUseCaseInput = Omit<
  UpdateGigWorkTeamPaymentInput,
  'totalPayment'
>;

export type UpdateGigWorkTeamStatusRequestBody = Omit<UpdateGigWorkTeamStatusInput, 'userId'>;

export type AcceptGigWorkTeamRequestBody = Pick<
  AcceptGigWorkTeamInput,
  'id' | 'appRole' | 'accepted'
>;

export type UpdateGigWorkTeamPaymentRequestBody = Omit<
  UpdateGigWorkTeamPaymentUseCaseInput,
  'userId'
>;

export type UpdateGigWorkTeamOutput = GigWorkTeam;
