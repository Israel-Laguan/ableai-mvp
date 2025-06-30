import { Transaction } from '@models/shared';
import { BuyerRepository, PrivateDataUserRepository, UserRepository } from '.';
import { RegisterDto } from '../interfaces';

export type RegisterTransaction<CustomOutput extends object = object> =
  Transaction.RunInTransaction<
    {
      PRIVATE_USER_DATA_REPOSITORY: PrivateDataUserRepository;
      USER_REPOSITORY: UserRepository;
      BUYER_REPOSITORY: BuyerRepository;
    },
    Omit<RegisterDto<CustomOutput>, 'rollback'>
  >;
