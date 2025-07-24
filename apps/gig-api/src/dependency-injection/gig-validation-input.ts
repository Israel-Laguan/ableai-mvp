import { Express } from '@backend';
import { Gig } from '@product-domain/backend';

const { RegisterBuyerSchema, RegisterWorkerSchema, UpdateUserProfileSchema } =
  Gig.Infra.Zod.Schemas;

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

  validateRegisterBuyerRequest: validateInputMiddleware({
    bodySchema: RegisterBuyerSchema,
  }),

  validateRegisterWorkerRequest: validateInputMiddleware({
    bodySchema: RegisterWorkerSchema,
  }),
};
