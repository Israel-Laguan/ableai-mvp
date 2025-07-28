import type { Buyer, Infra } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';
import { Interfaces } from '..';

type OmitBase = 'create';

interface CustomMethods {
  updateByUserId: (userId: number, input: Infra.UpdateBuyerInput) => Promise<Buyer[]>;
  create: (input: Interfaces.RegisterBuyerInput) => Promise<Buyer>;
}

export type BuyerRepository = ISQLCustomRepository<Buyer, CustomMethods, OmitBase>;

export type BuyerRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  Buyer,
  CustomMethods,
  OmitBase
>;
