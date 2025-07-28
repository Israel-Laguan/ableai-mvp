import { AiManager } from '@product-domain/backend';
import { privateDataUserRepository, reviewRepository, userRepository } from '../repositories';

export const retrieveUserProfile = AiManager.App.makeRetrieveUserProfileUseCase({
  privateDataUserRepository,
  reviewRepository,
  userRepository,
});
