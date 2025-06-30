import { Transaction } from '@models/shared';
import { BuyerRepository, PrivateDataUserRepository, UserRepository, WorkerRepository } from '.';

export type UpdateTransaction = Transaction.RunInTransaction<
  {
    PRIVATE_USER_DATA_REPOSITORY: PrivateDataUserRepository;
    USER_REPOSITORY: UserRepository;
    BUYER_REPOSITORY: BuyerRepository;
    WORKER_REPOSITORY: WorkerRepository;
  },
  void
>;
