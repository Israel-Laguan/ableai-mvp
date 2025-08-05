import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'GET_ONE_GIG_WORK';

export function makeGetOneGigWorkUseCase({
  gigWorkRepository,
}: Interfaces.MakeGetOneGigWorkInput): UseCases.GetOneGigWorkUseCase {
  return async ({ id, userId }) => {
    const gigWork = await gigWorkRepository.getOneByIdAndUserId(id, userId);

    if (!gigWork) {
      throw Errors.NotFoundResourceError.create('Gig work not found', PATH);
    }

    return gigWork;
  };
}
