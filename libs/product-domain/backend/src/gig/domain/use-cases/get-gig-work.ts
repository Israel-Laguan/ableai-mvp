import type { Interfaces } from '..';

export type GetAllGigWorksUseCase = (
  input: Interfaces.GetAllGigWorkInput
) => Promise<Interfaces.GetAllGigWorkOutput>;

export type GetAllCompletedGigWorkResumesUseCase = (
  input: Interfaces.GetAllCompletedGigWorkResumesInput
) => Promise<Interfaces.GetAllCompletedGigWorkResumesOutput>;

export type GetOneGigWorkUseCase = (
  input: Interfaces.GetOneGigWorkInput
) => Promise<Interfaces.GetOneGigWorkOutput>;
