import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'UPDATE_OFFER_PAYMENT_USE_CASE';

export function makeUpdateGigWorkTeamPayment({
  gigWorkTeamRepository,
}: Interfaces.MakeUpdateGigWorkTeamPaymentInput): UseCases.UpdateGigWorkTeamPaymentUseCase {
  return async ({ expenses = 0, id, received, taxes, tips = 0, userId }) => {
    const result = await gigWorkTeamRepository.updatePayment({
      expenses,
      id,
      totalPayment: received + tips - taxes - expenses,
      userId,
      tips,
    });

    if (!result) {
      throw Errors.NotFoundResourceError.create('gig work team not found', PATH);
    }

    return result;
  };
}
