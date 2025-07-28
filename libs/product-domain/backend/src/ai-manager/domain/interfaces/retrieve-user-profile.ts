import type { PrivateDataUser, User } from '@models/auth';
import type { Review } from '@models/gig';
import type { Repositories as AuthRepositories } from '../../../auth/domain';
import type { Repositories as GigRepositories } from '../../../gig/domain';
import { IOmitBase } from '@models/shared';

export interface MakeRetrieveUserProfileConfig {
  userRepository: AuthRepositories.UserRepository;
  privateDataUserRepository: AuthRepositories.PrivateDataUserRepository;
  reviewRepository: GigRepositories.ReviewRepository;
}

export type UserProfilePrivateDataUser = Record<keyof Omit<PrivateDataUser, IOmitBase>, boolean>;

export interface UserProfile {
  privateDataUser: UserProfilePrivateDataUser | null;
  reviews: Review[];
  user: User;
}
