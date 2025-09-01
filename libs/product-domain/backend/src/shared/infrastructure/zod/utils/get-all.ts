import z from 'zod';

import { SORTS, GetAllInput } from '@models/shared';

export function makeGetAllSchema<ValidSortFields extends string>(
  validFields: ValidSortFields[] | readonly ValidSortFields[]
): z.ZodObject<{
  limit: z.ZodOptional<z.ZodString>;
  offset: z.ZodOptional<z.ZodString>;
  sort: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}>;
export function makeGetAllSchema<
  ValidSortFields extends string,
  AdditionalQueryParams extends Exclude<PropertyKey, keyof GetAllInput>,
  AdditionalQueryParamsSchema extends Record<AdditionalQueryParams, z.ZodTypeAny>
>(
  validFields: ValidSortFields[] | readonly ValidSortFields[],
  additionalQueryParams: AdditionalQueryParamsSchema
): z.ZodObject<
  {
    limit: z.ZodOptional<z.ZodString>;
    offset: z.ZodOptional<z.ZodString>;
    sort: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
  } & AdditionalQueryParamsSchema
>;
export function makeGetAllSchema<
  ValidSortFields extends string,
  AdditionalQueryParams extends Exclude<PropertyKey, keyof GetAllInput>,
  AdditionalQueryParamsSchema extends Record<AdditionalQueryParams, z.ZodTypeAny>
>(
  validFields: ValidSortFields[] | readonly ValidSortFields[],
  additionalQueryParams?: AdditionalQueryParamsSchema
): z.ZodObject<
  {
    limit: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
    offset: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
    sort: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
  } & AdditionalQueryParamsSchema
> {
  const invalidSortFieldMessage = `Invalid sort. Valid sorts are: ${SORTS.join(
    ', '
  )} and valid fields are: ${validFields.join(', ')}`;

  return z
    .object({
      limit: z
        .string()
        .regex(/^\d+$/, 'Invalid limit')
        .transform(data => {
          return Number(data);
        })
        .optional(),
      offset: z
        .string()
        .regex(/^\d+$/, 'Invalid offset')
        .transform(data => {
          return Number(data);
        })
        .optional(),
      sort: z
        .string()
        .refine(
          sort => {
            const [direction, field] = sort.split(':');
            const isValidDirection = SORTS.includes(direction as (typeof SORTS)[number]);
            const isValidField = validFields.includes(field as ValidSortFields);
            return isValidDirection && isValidField;
          },
          {
            message: invalidSortFieldMessage,
          }
        )
        .optional(),
      ...(additionalQueryParams as AdditionalQueryParamsSchema),
    })
    .strict();
}
