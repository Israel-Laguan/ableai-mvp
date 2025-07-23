import { Express } from '@backend';
import { Gig } from '@product-domain/backend';

const { UpdateUserProfileSchema } = Gig.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const GigValidationInput = {
  validateRegisterGigWorkTeam: validateInputMiddleware({
    bodySchema: Gig.Infra.Zod.Schemas.RegisterGigWorkTeamSchema,
  }),

  validateUpdateUserProfile: validateInputMiddleware({
    bodySchema: UpdateUserProfileSchema,
  }),
};
