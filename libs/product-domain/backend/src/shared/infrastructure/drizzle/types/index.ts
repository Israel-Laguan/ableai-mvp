import { Schemas } from '..';

export type DrizzleSchema<Schema extends object> = ReturnType<
  typeof Schemas.withBaseSchema<Schema>
>;
