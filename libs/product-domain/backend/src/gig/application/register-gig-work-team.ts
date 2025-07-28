import { Errors } from '@shared';
import type { Interfaces, UseCases } from '../domain';

const PATH = 'REGISTER_GIG_WORK_TEAM';

export function makeRegisterGigWorkTeamUseCase({
  gigWorkTeamRepository,
  workerSkillRepository: workerSkillRepository,
}: Interfaces.MakeRegisterGigWorkTeam): UseCases.RegisterGigWorkTeamUseCase {
  return async input => {
    const workerSkill = await workerSkillRepository.getById(String(input.workerSkillId));

    if (!workerSkill) {
      throw Errors.NotFoundResourceError.create(
        `Skill with ID ${input.workerSkillId} not found`,
        PATH
      );
    }

    return await gigWorkTeamRepository.create({
      ...input,
      endDateOffer: new Date(input.endDateOffer),
      workerId: workerSkill.workerId,
    });
  };
}
