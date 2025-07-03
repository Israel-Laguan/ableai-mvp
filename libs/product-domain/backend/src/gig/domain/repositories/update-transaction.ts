import { Transaction } from '@models/shared';
import { BuyerRepository, WorkerRepository } from '.';
import { UserRepository } from '../../../auth/domain/repositories';

export type UpdateTransaction = Transaction.RunInTransaction<
  {
    USER_REPOSITORY: UserRepository;
    BUYER_REPOSITORY: BuyerRepository;
    WORKER_REPOSITORY: WorkerRepository;
  },
  void
>;
