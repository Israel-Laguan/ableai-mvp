import type { UpdateEntityInput } from '../../shared';
import type { User } from '../../auth';
import type { Buyer, Worker } from '..';

export type IUpdateUserInput = Pick<User, 'id'>;

export type UpdateBuyerInput = UpdateEntityInput<
  Omit<Buyer, 'userId' | 'wouldWork' | 'responseRate'>
>;

export type UpdateWorkerInput = UpdateEntityInput<Omit<Worker, 'userId'>>;

export type UpdateUserInput = {
  user: IUpdateUserInput;
  buyer: UpdateBuyerInput;
  worker: UpdateWorkerInput;
};
