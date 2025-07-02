import { Transaction } from '@models/shared';
import { PrivateDataUserRepository, UserRepository } from '.';

export type UpdateTransaction = Transaction.RunInTransaction<
  {
    PRIVATE_USER_DATA_REPOSITORY: PrivateDataUserRepository;
    USER_REPOSITORY: UserRepository;
  },
  void
>;
