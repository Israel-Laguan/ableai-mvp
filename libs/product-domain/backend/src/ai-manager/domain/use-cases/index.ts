import { Interfaces } from '..';

export type MatchWorkers = (
  input: Interfaces.MatchWorkersInput
) => Promise<Interfaces.MatchedWorker[] | []>;
