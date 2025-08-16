import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { SQL, sql } from 'drizzle-orm';
import { match, P } from 'ts-pattern';

import type { GigWorkTeam } from '@models/gig';
import type { PaginationResult, Sort, Utils } from '@models/shared';
import type { Interfaces, Repositories } from '../../../../domain';

import { APP_ROLE, SORT } from '@models/shared';

import { Infra as SharedInfra } from '../../../../../shared';

import { buyers, gigWorks, gigWorkTeams, workers } from '../../schemas';

const {
  Drizzle: {
    Utils: {
      DrizzleSQLFactory: {
        make: {
          select,
          sql: {
            functions: { arrayAgg },
            parts,
          },
        },
      },
    },
  },
} = SharedInfra;

const gigWorkTeamSelectSchema = select(gigWorkTeams);
const arrayOfValuesSelectAlias = 'values';

function selectPart(
  select?: Interfaces.GetAllGigWorkTeamsInput['select'],
  resultType?: Interfaces.GetAllGigWorkTeamsResultType
): SQL {
  return match(select)
    .with(P.array(P.string), select => {
      return match(resultType)
        .with('arrayOfValues', () => {
          return sql`
            SELECT  ${arrayAgg(
              gigWorkTeamSelectSchema.column(select[0]),
              arrayOfValuesSelectAlias
            )}`;
        })

        .otherwise(() => {
          return sql`
            SELECT ${gigWorkTeamSelectSchema.columns(select, true)}`;
        });
    })

    .otherwise(() => {
      return sql`
          SELECT ${gigWorkTeamSelectSchema.columns('*', true)}`;
    });
}

const fromPart = sql`FROM ${gigWorkTeams}`;

function joinPart(userId: number, appRole?: APP_ROLE) {
  return match(appRole)
    .with(APP_ROLE.BUYER, () => {
      return sql`
        LEFT JOIN ${gigWorks} ON ${gigWorks.id} = ${gigWorkTeams.gigWorkId}`;
    })
    .otherwise(() => {
      return null;
    });
}

function wherePart(
  userId: number,
  where?: Interfaces.GetAllGigWorkTeamsInput['where'],
  appRole?: APP_ROLE
) {
  return sql`
    WHERE ${parts(
      match(appRole)
        .with(APP_ROLE.BUYER, () => {
          return sql`
            ${gigWorks.buyerId} = (
                SELECT ${buyers.id} FROM ${buyers} WHERE ${buyers.userId} = ${userId}
              )`;
        })
        .with(APP_ROLE.WORKER, () => {
          return sql`
            ${gigWorkTeams.workerId} = (
              SELECT ${workers.id} FROM ${workers} WHERE ${workers.userId} = ${userId}
            )`;
        })
        .otherwise(() => {
          return sql`${gigWorkTeams.createdBy} = ${userId}`;
        }),

      match(where)
        .with({ fields: P.array({ field: P.string, value: P._ }) }, where => {
          const validWhereFields = where?.fields.filter(field => field.value !== null);

          return parts(
            ...validWhereFields.map(field => {
              return sql`AND ${gigWorkTeams[field.field]} = ${field.value}`;
            })
          );
        })

        .otherwise(() => {
          return null;
        })
    )}`;
}

function sortByPart(sort?: Sort) {
  return match(sort)
    .with(P.string, sort => {
      const [direction, field] = sort.split(':');
      const validateDirection = direction.toUpperCase() === SORT.DESC ? SORT.DESC : SORT.ASC;
      const validateField = gigWorkTeams._customs.data.columnKeys.includes(
        field as Interfaces.GigWorkTeamColumns
      )
        ? (field as Interfaces.GigWorkTeamColumns)
        : null;

      return match({
        validateDirection,
        validateField,
      })
        .with(
          { validateDirection: P.string, validateField: P.string },
          ({ validateDirection, validateField }) => {
            return sql`ORDER BY ${gigWorkTeams[validateField]} ${sql.raw(validateDirection)}`;
          }
        )
        .otherwise(() => {
          return null;
        });
    })

    .otherwise(() => {
      return null;
    });
}

function limitAndOffsetPart(
  limit = 10,
  offset = 0,
  resultType?: Interfaces.GetAllGigWorkTeamsResultType
) {
  return match(resultType)
    .with('arrayOfValues', () => {
      return null;
    })
    .otherwise(() => {
      return sql`
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    });
}

type IColumn = Interfaces.GigWorkTeamColumns;

export function makeGetAllGigWorkTeams(db: NodePgDatabase): Repositories.GetAllGigWorkTeams {
  async function getAllGigWorkTeams(
    input: Interfaces.GetAllGigWorkTeamsBaseInput
  ): Promise<PaginationResult<GigWorkTeam>>;
  async function getAllGigWorkTeams<Column extends IColumn = IColumn>(
    input: Interfaces.GetAllGigWorkTeamsArrayOfOneInput<Column>,
    resultType: Interfaces.GetAllGigWorkTeamsResultType
  ): Promise<Interfaces.GetAllGigWorkTeamsArrayOfOne<Column>>;
  async function getAllGigWorkTeams<Column extends IColumn = IColumn>(
    input: Interfaces.GetAllGigWorkTeamsRecordOfManyInput<Column>
  ): Promise<PaginationResult<Interfaces.GetAllGigWorkTeamsRecordOfMany<Column>>>;
  async function getAllGigWorkTeams<Column extends IColumn = IColumn>(
    {
      appRole,
      limit = 10,
      offset = 0,
      sort,
      select,
      userId,
      where,
    }: Interfaces.GetAllGigWorkTeamsInput<Column>,
    resultType?: Interfaces.GetAllGigWorkTeamsResultType
  ): Promise<Interfaces.GetAllGigWorkTeamsOutput<Column>> {
    const queryHead = parts(
      selectPart(select, resultType),
      fromPart,
      joinPart(userId, appRole),
      wherePart(userId, where, appRole)
    );

    const mainQuery = parts(
      queryHead,
      sortByPart(sort),
      limitAndOffsetPart(limit, offset, resultType)
    );

    return match(resultType)
      .returnType<Promise<Interfaces.GetAllGigWorkTeamsOutput<Column>>>()
      .with('arrayOfValues', async () => {
        const queryResult = await db.execute<Interfaces.GetAllGigWorkTeamsArrayOfOne<Column>>(
          mainQuery
        );

        return queryResult.rows[0];
      })

      .otherwise(async () => {
        const countQuery = parts(
          sql`SELECT COUNT(*)::int AS total`,
          fromPart,
          joinPart(userId, appRole),
          wherePart(userId, where, appRole)
        );

        const [queryResult, countQueryResult] = await Promise.all([
          db.execute<
            Utils.InterfaceToRecord<GigWorkTeam> | Interfaces.GetAllGigWorkTeamsRecordOfMany
          >(mainQuery),
          db.execute<{ total: number }>(countQuery),
        ]);

        const currentPage = Math.floor(offset / limit) + 1;
        const results = queryResult.rows;
        const total = countQueryResult.rows[0].total;
        const totalPages = Math.ceil(total / limit);

        return { currentPage, results, total, totalPages };
      });
  }

  return getAllGigWorkTeams;
}
