import type { Buyer, Infra } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

interface CustomMethods {
  updateByUserId: (userId: number, input: Infra.UpdateBuyerInput) => Promise<Buyer[]>;
}

export type BuyerRepository = ISQLCustomRepository<Buyer, CustomMethods>;

export type BuyerRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, Buyer, CustomMethods>;
