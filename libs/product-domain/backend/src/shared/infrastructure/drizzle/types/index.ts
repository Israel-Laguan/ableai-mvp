import type { Schemas } from '..';

export type DrizzleSchemaCustomData<ColumnKeys extends PropertyKey> = {
  columns: {
    [K in ColumnKeys]: {
      key: K;
      name: string;
    };
  };
  columnKeys: ColumnKeys[];
  isSchema: true;
  tableName: string;
};

export type DrizzleSchema<Schema extends object> = ReturnType<
  typeof Schemas.withBaseSchema<Schema>
>;

export type ColumnKey<Schema extends object> =
  DrizzleSchema<Schema>['_customs']['data']['columnKeys'][number];

export type MakeColumnInput<Schema extends object> = {
  schema: DrizzleSchema<Schema>;
  columnKey: ColumnKey<Schema>;
  columnAlias?: string;
  schemaAlias?: string;
};

export type MakeColumnsInput<Schema extends object> = Pick<
  MakeColumnInput<Schema>,
  'schema' | 'schemaAlias'
> & {
  columns: ColumnKey<Schema>[];
  useDefaultAlias?: boolean;
};

export type MakeColumnsWithColumnOptionsInput<Schema extends object> = Omit<
  MakeColumnsInput<Schema>,
  'columns'
> & {
  columns: string[] | '*';
};
