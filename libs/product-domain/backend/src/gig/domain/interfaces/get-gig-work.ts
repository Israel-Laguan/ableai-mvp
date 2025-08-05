import type { GetAllInput, PaginationResult } from '@models/shared';
import type { Repositories } from '..';
import type { GigWork } from '@models/gig';

export type MakeGetAllGigWorkInput = {
  gigWorkRepository: Repositories.GigWorkRepository;
};

export type MakeGetOneGigWorkInput = {
  gigWorkRepository: Repositories.GigWorkRepository;
  buyerRepository: Repositories.BuyerRepository;
};

export type GetAllGigWorkInput = Pick<GetAllInput, 'limit' | 'offset' | 'sort'> & {
  userId: number;
};

export type GetOneGigWorkInput = Pick<GigWork, 'id'> & {
  userId: number;
};

export type GetAllGigWorkRequestQuery = Omit<GetAllGigWorkInput, 'userId'>;

export type GetOneGigWorkRequestParams = { id: string };

export type GetAllGigWorkOutput = PaginationResult<GigWork>;

export type GetOneGigWorkOutput = GigWork;
