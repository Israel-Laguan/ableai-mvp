import { Transaction } from '@models/shared';
import { RegisterWorkerOutput, RegisterWorkerRepositoriesRecord } from '../interfaces';

export type RegisterWorkerTransaction = Transaction.RunInTransaction<
  RegisterWorkerRepositoriesRecord,
  RegisterWorkerOutput
>;
