import { Express } from '@backend';
import { Gig } from '@product-domain/backend';

const { UpdateMeUserSchema } = Gig.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const GigValidationInput = {
  validateUpdateMeUser: validateInputMiddleware({
    bodySchema: UpdateMeUserSchema,
  }),
};
