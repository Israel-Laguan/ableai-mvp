import type { APP_ROLE, GetAllInput, PaginationResult } from '@models/shared';
import type { Repositories } from '..';
import type { GigWork, GigWorkStatus } from '@models/gig';

export type MakeGetAllGigWorkInput = {
  gigWorkRepository: Repositories.GigWorkRepository;
};

export type MakeGetOneGigWorkInput = {
  gigWorkRepository: Repositories.GigWorkRepository;
};

export type GetAllGigWorkInput = Pick<GetAllInput, 'limit' | 'offset' | 'sort'> & {
  status?: GigWorkStatus;
  appRole?: APP_ROLE;
  userId: number;
};

export type GetOneGigWorkInput = Pick<GigWork, 'id'> & {
  userId: number;
};

export type GetAllGigWorkRequestQuery = Omit<GetAllGigWorkInput, 'userId'>;

export type GetOneGigWorkRequestParams = { id: string };

export type GetAllGigWorkOutput = PaginationResult<GigWork>;

export type GetOneGigWorkOutput = GigWork;
