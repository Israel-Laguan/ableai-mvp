import z from 'zod';

export function makeZodObjectSchema<RawShape extends object>(
  shape: Record<keyof RawShape, z.ZodTypeAny>,
  params?: z.RawCreateParams
) {
  return z.object(shape, params);
}
