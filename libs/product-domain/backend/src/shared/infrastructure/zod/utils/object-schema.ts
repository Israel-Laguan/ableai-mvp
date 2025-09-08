import z from 'zod';

export function makeZodObjectSchema<RawShape extends object>(
  shape: Record<keyof RawShape, z.ZodTypeAny>,
  params?: z.RawCreateParams
) {
  return z.object(shape, params);
}

export function makeTypedZodObject<Schema extends object>() {
  return {
    schema: <ShapeSchema extends Record<keyof Schema, z.ZodTypeAny>>(
      shape: ShapeSchema,
      params?: z.RawCreateParams
    ) => {
      return z.object(shape, params);
    },

    recordOfSchemas: <ShapeSchema extends Record<keyof Schema, z.ZodTypeAny>>(
      shape: ShapeSchema
    ) => {
      return shape;
    },
  };
}
