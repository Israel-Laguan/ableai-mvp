import type { GigWorkTeam } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';
import type { Interfaces } from '..';

type OmittedBaseMethods = 'create';

type CustomMethods = {
  create: (input: Interfaces.RegisterGigWorkTeamInput) => Promise<GigWorkTeam>;
};

export type GigWorkTeamRepository = ISQLCustomRepository<
  GigWorkTeam,
  CustomMethods,
  OmittedBaseMethods
>;

export type GigWorkTeamRepositoryMaker<TDatabase> = ISQLRepositoryMaker<
  TDatabase,
  GigWorkTeam,
  CustomMethods,
  OmittedBaseMethods
>;
