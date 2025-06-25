import type { Buyer } from '@models/auth';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type BuyerRepository = ISQLCustomRepository<Buyer>;

export type BuyerRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, Buyer>;
