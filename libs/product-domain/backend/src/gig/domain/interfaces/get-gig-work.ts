import type { GetAllInput, PaginationResult } from '@models/shared';
import type { Repositories } from '..';
import type { GigWork } from '@models/gig';

export type MakeGetAllGigWorkInput = {
  gigWorkRepository: Repositories.GigWorkRepository;
};

export type GetAllGigWorkInput = Pick<GetAllInput, 'limit' | 'offset' | 'sort'> & {
  userId: number;
};

export type GetAllGigWorkRequestQuery = Omit<GetAllGigWorkInput, 'userId'>;

export type GetAllGigWorkOutput = PaginationResult<GigWork>;
