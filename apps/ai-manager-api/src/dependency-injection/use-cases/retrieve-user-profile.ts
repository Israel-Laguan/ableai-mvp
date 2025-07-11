import { AiManager } from '@product-domain/backend';
import {
  privateDataUserRepository,
  reviewRepository,
  statisticRepository,
  userRepository,
} from '../repositories';

export const retrieveUserProfile = AiManager.App.makeRetrieveUserProfileUseCase({
  privateDataUserRepository,
  reviewRepository,
  statisticRepository,
  userRepository,
});
