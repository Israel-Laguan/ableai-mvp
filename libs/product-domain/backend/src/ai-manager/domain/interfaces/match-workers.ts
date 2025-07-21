import { Infra } from '@models/gig';
import type { Repositories as AuthRepositories } from '../../../auth/domain';
import type { Repositories as GigRepositories } from '../../../gig/domain';

export interface MakeMatchWorkersConfig {
  privateDataUserRepository: AuthRepositories.PrivateDataUserRepository;
  userRepository: AuthRepositories.UserRepository;
  workerRepository: GigRepositories.WorkerRepository;
}

export type MatchedWorker = Infra.MatchedWorker;

export type MatchWorkersInput = {
  latitude: number;
  longitude: number;
  radius?: number;
} & Omit<Infra.MatchWorkersInput, 'userIds'>;
