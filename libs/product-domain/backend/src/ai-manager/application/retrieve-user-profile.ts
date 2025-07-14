import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'RETRIEVE_USER_PROFILE';

export function makeRetrieveUserProfileUseCase({
  privateDataUserRepository,
  reviewRepository,
  statisticRepository,
  userRepository,
}: Interfaces.MakeRetrieveUserProfileConfig): UseCases.RetrieveUserProfile {
  return async userId => {
    const user = await userRepository.getById(String(userId));

    if (!user) {
      throw Errors.NotFoundResourceError.create('User not found', PATH);
    }

    const privateDataUser = await privateDataUserRepository.getById(String(user.privateDataUserId));

    const checkedPrivateDataUser: Interfaces.UserProfilePrivateDataUser = {
      address: !!privateDataUser?.address,
      kycUrl: !!privateDataUser?.kycUrl,
      latitude: !!privateDataUser?.latitude,
      longitude: !!privateDataUser?.longitude,
      phoneNumber: !!privateDataUser?.phoneNumber,
      rwtUrl: !!privateDataUser?.rwtUrl,
    };

    const reviews = (
      await reviewRepository.getAll({
        limit: 50,
        where: { fields: [{ field: 'userId', value: userId }] },
      })
    ).results;

    const statistic = (
      await statisticRepository.getAll({
        where: { fields: [{ field: 'userId', value: userId }] },
      })
    ).results[0];

    if (!statistic) {
      throw Errors.NotFoundResourceError.create('User statistic not found', PATH);
    }

    return {
      privateDataUser: checkedPrivateDataUser,
      reviews,
      user,
      statistic,
    };
  };
}
