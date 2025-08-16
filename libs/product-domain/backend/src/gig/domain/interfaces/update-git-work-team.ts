import type { GigWorkTeam } from '@models/gig';
import type { APP_ROLE } from '@models/shared';
import type { Repositories } from '..';

export type MakeAcceptGigWorkTeamInput = {
  gigWorkTeamRepository: Repositories.GigWorkTeamRepository;
};

export type MakeUpdateGigWorkTeamPaymentInput = {
  gigWorkTeamRepository: Repositories.GigWorkTeamRepository;
};

export type UpdateGitWorkTeamStatusInput = Pick<GigWorkTeam, 'status' | 'id'> & {
  appRole: APP_ROLE;
  userId: number;
};

export type AcceptGigWorkTeamInput = Pick<
  UpdateGitWorkTeamStatusInput,
  'id' | 'userId' | 'appRole'
> & {
  accepted: boolean;
};

export type UpdateGigWorkTeamPaymentInput = Pick<GigWorkTeam, 'id' | 'tips' | 'totalPayment'> & {
  expenses?: number;
  userId: number;
};

export type UpdateGigWorkTeamPaymentUseCaseInput = Omit<
  UpdateGigWorkTeamPaymentInput,
  'totalPayment'
> & {
  received: number;
  taxes: number;
};

export type AcceptGigWorkTeamRequestBody = Pick<
  AcceptGigWorkTeamInput,
  'id' | 'appRole' | 'accepted'
>;

export type UpdateGigWorkTeamPaymentRequestBody = Omit<
  UpdateGigWorkTeamPaymentUseCaseInput,
  'userId'
>;

export type UpdateGigWorkTeamOutput = GigWorkTeam;
