import { Transaction } from '@models/shared';
import { RegisterBuyerOutput, RegisterBuyerRepositoriesRecord } from '../interfaces';

export type RegisterBuyerTransaction = Transaction.RunInTransaction<
  RegisterBuyerRepositoriesRecord,
  RegisterBuyerOutput
>;
