import { Errors } from '@shared';
import type { Interfaces, UseCases } from '../domain';

const PATH = 'REGISTER_GIG_WORK_TEAM';

export function makeRegisterGigWorkTeamUseCase({
  gigWorkTeamRepository,
  skillRepository,
}: Interfaces.MakeRegisterGigWorkTeam): UseCases.RegisterGigWorkTeamUseCase {
  return async input => {
    const skill = await skillRepository.getById(String(input.skillId));

    if (!skill) {
      throw Errors.NotFoundResourceError.create(`Skill with ID ${input.skillId} not found`, PATH);
    }

    return await gigWorkTeamRepository.create({
      ...input,
      endDateOffer: new Date(input.endDateOffer),
      workerId: skill.workerId,
    });
  };
}
