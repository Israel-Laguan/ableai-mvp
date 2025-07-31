import type { Interfaces } from '..';

export type RegisterGigWorkTeamUseCase = (
  input: Omit<Interfaces.RegisterGigWorkTeamInput, 'workerId'>
) => Promise<Interfaces.RegisterGigWorkTeamOutput>;
