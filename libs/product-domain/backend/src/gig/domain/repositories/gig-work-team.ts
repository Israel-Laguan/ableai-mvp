import type { GigWorkTeam } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker, PaginationResult } from '@models/shared';
import type { Interfaces } from '..';

type OmittedBaseMethods = 'create' | 'getAll';

type IColumn = Interfaces.GigWorkTeamColumns;

export interface GetAllGigWorkTeams {
  (input: Interfaces.GetAllGigWorkTeamsBaseInput): Promise<PaginationResult<GigWorkTeam>>;
  <Column extends IColumn = IColumn>(
    input: Interfaces.GetAllGigWorkTeamsArrayOfOneInput<Column>,
    resultType: 'arrayOfValues'
  ): Promise<Interfaces.GetAllGigWorkTeamsArrayOfOne<Column>>;
  <Column extends IColumn = IColumn>(
    input: Interfaces.GetAllGigWorkTeamsRecordOfManyInput<Column>
  ): Promise<PaginationResult<Interfaces.GetAllGigWorkTeamsRecordOfMany<Column>>>;
}

export type GetOneGigWorkTeam = (
  input: Interfaces.GetOneGigWorkTeamInput
) => Promise<GigWorkTeam | null>;

export type UpdateGigWorkTeamStatus = (
  input: Interfaces.UpdateGigWorkTeamStatusInput
) => Promise<GigWorkTeam | null>;

export type UpdateGigWorkTeamPayment = (
  input: Interfaces.UpdateGigWorkTeamPaymentInput
) => Promise<GigWorkTeam | null>;

type CustomMethods = {
  create: (input: Interfaces.RegisterGigWorkTeamInput) => Promise<GigWorkTeam>;
  getAll: GetAllGigWorkTeams;
  getOne: GetOneGigWorkTeam;
  updateStatus: UpdateGigWorkTeamStatus;
  updatePayment: UpdateGigWorkTeamPayment;
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
