import type { GigWorkTeam } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type GigWorkTeamRepository = ISQLCustomRepository<GigWorkTeam>;

export type GigWorkTeamRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, GigWorkTeam>;
