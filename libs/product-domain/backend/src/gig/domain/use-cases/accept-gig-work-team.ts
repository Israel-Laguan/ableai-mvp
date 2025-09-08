import { Interfaces } from '..';

export type AcceptGigWorkTeamUseCase = (
  input: Interfaces.AcceptGigWorkTeamInput
) => Promise<Interfaces.UpdateGigWorkTeamOutput>;
