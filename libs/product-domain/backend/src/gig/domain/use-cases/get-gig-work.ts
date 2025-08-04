import type { Interfaces } from '..';

export type GetAllGigWorksUseCase = (
  input: Interfaces.GetAllGigWorkInput
) => Promise<Interfaces.GetAllGigWorkOutput>;
