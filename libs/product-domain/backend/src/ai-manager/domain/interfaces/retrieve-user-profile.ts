import type { PrivateDataUser, User } from '@models/auth';
import type { Review, Statistic } from '@models/gig';
import type { Repositories as AuthRepositories } from '../../../auth/domain';
import type { Repositories as GigRepositories } from '../../../gig/domain';
import { IOmitBase } from '@models/shared';

export interface MakeRetrieveUserProfileConfig {
  userRepository: AuthRepositories.UserRepository;
  privateDataUserRepository: AuthRepositories.PrivateDataUserRepository;
  reviewRepository: GigRepositories.ReviewRepository;
  statisticRepository: GigRepositories.StatisticRepository;
}

export type UserProfilePrivateDataUser = Record<keyof Omit<PrivateDataUser, IOmitBase>, boolean>;

export interface UserProfile {
  privateDataUser: UserProfilePrivateDataUser | null;
  reviews: Review[];
  statistic: Statistic;
  user: User;
}
