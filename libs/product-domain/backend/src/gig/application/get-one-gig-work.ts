import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'GET_ONE_GIG_WORK';

export function makeGetOneGigWorkUseCase({
  buyerRepository,
  gigWorkRepository,
}: Interfaces.MakeGetOneGigWorkInput): UseCases.GetOneGigWorkUseCase {
  return async ({ id, userId }) => {
    const gigWork = await gigWorkRepository.getById(String(id));

    if (!gigWork) {
      throw Errors.NotFoundResourceError.create('Gig work not found', PATH);
    }

    const buyer = await buyerRepository.getById(String(gigWork.buyerId));

    if (!(buyer && buyer.userId === userId)) {
      throw Errors.NotFoundResourceError.create('Gig work not found', PATH);
    }

    return gigWork;
  };
}
