import type { APP_ROLE, GetAllInput, PaginationResult } from '@models/shared';
import type { Repositories } from '..';
import type { GigWork, GigWorkStatus, WorkerSkill } from '@models/gig';

export type MakeGetAllGigWorkInput = {
  gigWorkRepository: Repositories.GigWorkRepository;
};

export type MakeGetOneGigWorkInput = {
  gigWorkRepository: Repositories.GigWorkRepository;
};

export type MakeGetAllCompletedGigWorkResumes = {
  gigWorkRepository: Repositories.GigWorkRepository;
};

export type GetAllGigWorkInput = Pick<GetAllInput, 'limit' | 'offset' | 'sort'> & {
  status?: GigWorkStatus;
  appRole?: APP_ROLE;
  userId: number;
};

export type GetAllCompletedGigWorkResumesInput = Pick<GetAllInput, 'limit' | 'offset' | 'sort'> & {
  userId: number;
};

export type GetOneGigWorkInput = Pick<GigWork, 'id'> & {
  userId: number;
};

export type GetAllGigWorkRequestQuery = Omit<GetAllGigWorkInput, 'userId'>;

export type GetAllCompletedGigWorkResumesRequestQuery = Omit<
  GetAllCompletedGigWorkResumesInput,
  'userId'
>;

export type GetOneGigWorkRequestParams = { id: string };

export type GetAllGigWorkOutput = PaginationResult<GigWork>;

export type CompletedGigWorkResumes = GigWork & {
  totalPayment: number;
  workers: (WorkerSkill & { uid: string })[];
};

export type GetAllCompletedGigWorkResumesOutput = PaginationResult<CompletedGigWorkResumes>;

export type GetOneGigWorkOutput = GigWork;
