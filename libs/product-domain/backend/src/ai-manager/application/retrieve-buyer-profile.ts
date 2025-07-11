import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'RETRIEVE_BUYER_PROFILE';

export function makeRetrieveBuyerProfileUseCase({
  buyerRepository,
  skillHireRepository,
}: Interfaces.MakeRetrieveBuyerProfileConfig): UseCases.RetrieveBuyerProfile {
  return async userId => {
    const buyer = (
      await buyerRepository.getAll({ where: { fields: [{ field: 'userId', value: userId }] } })
    ).results[0];

    if (!buyer) {
      throw Errors.NotFoundResourceError.create('Buyer not found', PATH);
    }

    const skills = await skillHireRepository.getAll({
      where: { fields: [{ field: 'buyerId', value: buyer.id }] },
    });

    return {
      buyer,
      skills: skills.results,
    };
  };
}
