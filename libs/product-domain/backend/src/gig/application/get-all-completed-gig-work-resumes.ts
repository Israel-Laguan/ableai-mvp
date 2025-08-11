import { Interfaces, UseCases } from '../domain';

export function makeGetAllCompletedGigWorkResumesUseCase({
  gigWorkRepository,
}: Interfaces.MakeGetAllCompletedGigWorkResumes): UseCases.GetAllCompletedGigWorkResumesUseCase {
  return async input => {
    return await gigWorkRepository.getAllCompletedGigWorkResumes(input);
  };
}
