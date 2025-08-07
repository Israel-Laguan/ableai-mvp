import type { Interfaces } from '..';

export type GetAllGigWorksUseCase = (
  input: Interfaces.GetAllGigWorkInput
) => Promise<Interfaces.GetAllGigWorkOutput>;

export type GetOneGigWorkUseCase = (
  input: Interfaces.GetOneGigWorkInput
) => Promise<Interfaces.GetOneGigWorkOutput>;
