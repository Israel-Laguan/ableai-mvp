import type { Buyer } from '@models/gig';
import type { CreateEntityInput } from '@models/shared';
import type { Constants, Repositories, Services } from '..';

export type RegisterBuyerRepositoriesRecord = {
  [Constants.REGISTER_BUYER_REPOSITORIES.BUYER_REPOSITORY]: Repositories.BuyerRepository;
};

export interface MakeRegisterBuyerInput {
  runInTransaction: Services.RegisterBuyerTransaction;
}

export type RegisterBuyerInput = Omit<
  CreateEntityInput<Buyer>,
  'badgesAwarded' | 'responseRate' | 'wouldWork'
>;

export type RegisterBuyerRequestBody = Omit<RegisterBuyerInput, 'userId'>;

export type RegisterBuyerOutput = {
  buyer: Buyer;
};
