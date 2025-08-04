import type { Interfaces, UseCases } from '../domain';

export function makeGetAllGigWorksUseCase({
  gigWorkRepository,
}: Interfaces.MakeGetAllGigWorkInput): UseCases.GetAllGigWorksUseCase {
  return async input => {
    return await gigWorkRepository.getAll(input);
  };
}
