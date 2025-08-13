import type { GigWork } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';
import type { Interfaces } from '..';

type OmitBase = 'getAll';

export type GetAllGigWorksPayments = (
  input: Interfaces.GetAllGigWorkPaymentsInput
) => Promise<Interfaces.GetAllGigWorkPaymentsOutput>;

export type GetOneGigWorkByIdAndUserId = (id: number, userId: number) => Promise<GigWork | null>;

export type GetAllGigWorks = (
  input: Interfaces.GetAllGigWorkInput
) => Promise<Interfaces.GetAllGigWorkOutput>;

type CustomMethods = {
  getAll: GetAllGigWorks;
  getAllGigWorkPayments: GetAllGigWorksPayments;
  getOneByIdAndUserId: GetOneGigWorkByIdAndUserId;
};

export type GigWorkRepository = ISQLCustomRepository<GigWork, CustomMethods, OmitBase>;

export type GigWorkRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  GigWork,
  CustomMethods,
  OmitBase
>;
