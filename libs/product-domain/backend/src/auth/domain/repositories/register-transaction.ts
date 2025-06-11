import { Transaction } from '@models/shared';
import { PrivateDataUserRepository, UserRepository } from '.';

export type RegisterTransaction<CustomOutput extends object = object> =
  Transaction.RunInTransaction<
    {
      PRIVATE_USER_DATA_REPOSITORY: PrivateDataUserRepository;
      USER_REPOSITORY: UserRepository;
    },
    CustomOutput
  >;
