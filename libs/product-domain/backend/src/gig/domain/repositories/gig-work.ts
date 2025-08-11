import type { GigWork } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';
import type { Interfaces } from '..';

type OmitBase = 'getAll';

export type GetAllCompletedGigWorksResumes = (
  input: Interfaces.GetAllCompletedGigWorkResumesInput
) => Promise<Interfaces.GetAllCompletedGigWorkResumesOutput>;

export type GetOneGigWorkByIdAndUserId = (id: number, userId: number) => Promise<GigWork | null>;

export type GetAllGigWorks = (
  input: Interfaces.GetAllGigWorkInput
) => Promise<Interfaces.GetAllGigWorkOutput>;

type CustomMethods = {
  getAll: GetAllGigWorks;
  getAllCompletedGigWorkResumes: GetAllCompletedGigWorksResumes;
  getOneByIdAndUserId: GetOneGigWorkByIdAndUserId;
};

export type GigWorkRepository = ISQLCustomRepository<GigWork, CustomMethods, OmitBase>;

export type GigWorkRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  GigWork,
  CustomMethods,
  OmitBase
>;
