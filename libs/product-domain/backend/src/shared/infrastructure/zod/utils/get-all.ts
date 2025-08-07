import z from 'zod';

import { SORTS, GetAllInput } from '@models/shared';
import { makeZodObjectSchema } from '../utils';

type MakeZodGetAllSchema<Schema extends object> = {
  validSortFields: string[] | readonly string[];
  additionalQueryParams?: Omit<Record<keyof Schema, z.ZodTypeAny>, keyof GetAllInput>;
};

export function makeGetAllSchema<Schema extends object>({
  validSortFields,
  additionalQueryParams,
}: MakeZodGetAllSchema<Schema>) {
  return makeZodObjectSchema<Omit<GetAllInput, 'where'>>({
    ...additionalQueryParams,
    limit: z.string().regex(/^\d+$/, 'Invalid limit').optional(),
    sort: z
      .string()
      .refine(
        str =>
          str.includes(':') &&
          SORTS.includes(str.split(':')[0] as (typeof SORTS)[number]) &&
          validSortFields.includes(str.split(':')[1]),
        {
          message: `Invalid sort. Valid sorts are: ${SORTS.join(
            ', '
          )} and valid fields are: ${validSortFields.join(', ')}`,
        }
      )
      .optional(),
    offset: z.string().regex(/^\d+$/, 'Invalid offset').optional(),
  }).strict();
}
