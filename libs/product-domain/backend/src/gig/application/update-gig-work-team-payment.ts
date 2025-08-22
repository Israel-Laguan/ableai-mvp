import type { Interfaces, UseCases } from '../domain';

import { Errors } from '@shared';

const PATH = 'UPDATE_OFFER_PAYMENT_USE_CASE';

export function makeUpdateGigWorkTeamPayment({
  gigWorkTeamRepository,
  workerSkillRepository,
}: Interfaces.MakeUpdateGigWorkTeamPaymentInput): UseCases.UpdateGigWorkTeamPaymentUseCase {
  return async ({ expenses = 0, id, tips = 0, userId }) => {
    const gigWorkTeam = await gigWorkTeamRepository.getById(String(id));

    if (!gigWorkTeam) {
      throw Errors.NotFoundResourceError.create('gig work team not found', PATH);
    }

    const workerSkill = await workerSkillRepository.getById(String(gigWorkTeam.workerSkillId));

    if (!workerSkill) {
      throw Errors.NotFoundResourceError.create('worker skill not found', PATH);
    }

    const result = await gigWorkTeamRepository.updatePayment({
      expenses,
      id,
      totalPayment: workerSkill.ratePerHour * gigWorkTeam.workTime + tips - expenses,
      userId,
      tips,
    });

    if (!result) {
      throw Errors.NotFoundResourceError.create('gig work team not found', PATH);
    }

    return result;
  };
}
