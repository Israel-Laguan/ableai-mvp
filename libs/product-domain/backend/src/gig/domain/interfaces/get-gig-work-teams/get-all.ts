import type { APP_ROLE, GetAllInput, IBase, PaginationResult } from '@models/shared';
import type { Repositories } from '../..';
import type { GigWorkTeam } from '@models/gig';

export type MakeGetAllGigWorkTeamInput = {
  gigWorkTeamRepository: Repositories.GigWorkTeamRepository;
};

export type GetAllGigWorkTeamsResultType = 'arrayOfValues' | undefined;

export type GigWorkTeamColumns = keyof GigWorkTeam | keyof IBase;

type BaseGetAllInput = GetAllInput<GigWorkTeam> & { userId: number; appRole?: APP_ROLE };

export type GetAllGigWorkTeamsBaseInput = Omit<BaseGetAllInput, 'select'> & {
  select?: undefined;
};

export type GetAllGigWorkTeamsRecordOfManyInput<
  Column extends GigWorkTeamColumns = GigWorkTeamColumns
> = Omit<BaseGetAllInput, 'select'> & {
  select: Column[];
};

export type GetAllGigWorkTeamsArrayOfOneInput<
  Column extends GigWorkTeamColumns = GigWorkTeamColumns
> = Omit<BaseGetAllInput, 'select'> & {
  select: [Column];
};

export type GetAllGigWorkTeamsInput<Column extends GigWorkTeamColumns = GigWorkTeamColumns> =
  | GetAllGigWorkTeamsBaseInput
  | GetAllGigWorkTeamsRecordOfManyInput<Column>
  | GetAllGigWorkTeamsArrayOfOneInput<Column>;

export type GetAllGigWorkTeamRequestQuery = Omit<GetAllGigWorkTeamsBaseInput, 'userId' | 'where'>;

export type GetAllGigWorkTeamRequestBody = Pick<GetAllGigWorkTeamsBaseInput, 'where' | 'appRole'>;

export type GetAllGigWorkTeamsArrayOfOne<Column extends GigWorkTeamColumns = GigWorkTeamColumns> = {
  values: GigWorkTeam[Column][];
};

export type GetAllGigWorkTeamsRecordOfMany<Column extends GigWorkTeamColumns = GigWorkTeamColumns> =
  { [K in Column]: GigWorkTeam[K] };

export type GetAllGigWorkTeamsOutput<Column extends GigWorkTeamColumns = GigWorkTeamColumns> =
  | PaginationResult<GigWorkTeam>
  | GetAllGigWorkTeamsArrayOfOne<Column>
  | PaginationResult<GetAllGigWorkTeamsRecordOfMany<Column>>;
