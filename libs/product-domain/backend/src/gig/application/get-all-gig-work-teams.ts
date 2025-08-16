import type { Interfaces, UseCases } from '../domain';

export function makeGetAllGigWorkTeamsUseCase({
  gigWorkTeamRepository,
}: Interfaces.MakeGetAllGigWorkTeamInput): UseCases.GetAllGigWorkTeamsUseCase {
  return async input => {
    return await gigWorkTeamRepository.getAll(input);
  };
}
