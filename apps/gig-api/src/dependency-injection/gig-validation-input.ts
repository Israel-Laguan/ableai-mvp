import { Express } from '@backend';
import { Gig } from '@product-domain/backend';

const { UpdateUserProfileSchema } = Gig.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const GigValidationInput = {
  validateUpdateUserProfile: validateInputMiddleware({
    bodySchema: UpdateUserProfileSchema,
  }),

  validateRegisterBuyerRequest: validateInputMiddleware({
    bodySchema: Gig.Infra.Zod.Schemas.RegisterBuyerSchema,
  }),
};
