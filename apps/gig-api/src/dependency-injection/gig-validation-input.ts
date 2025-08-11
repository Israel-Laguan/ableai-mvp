import { Express } from '@backend';
import { Gig } from '@product-domain/backend';

const {
  RegisterGigWorkSchema,
  RegisterBuyerSchema,
  RegisterGigWorkTeamSchema,
  RegisterWorkerSchema,
  UpdateUserProfileSchema,
} = Gig.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const GigValidationInput = {
  validateGetAllGigWorks: validateInputMiddleware({
    querySchema: Gig.Infra.Zod.Schemas.GetAllGigWorksSchema,
  }),

  validateGetAllCompletedGigWorkResumes: validateInputMiddleware({
    querySchema: Gig.Infra.Zod.Schemas.GetAllCompletedGigWorkResumesSchema,
  }),

  validateGetOneGigWork: validateInputMiddleware({
    paramsSchema: Gig.Infra.Zod.Schemas.GetOneGigWorkParamsSchema,
  }),

  validateRegisterGigWorkTeam: validateInputMiddleware({
    bodySchema: RegisterGigWorkTeamSchema,
  }),

  validateUpdateUserProfile: validateInputMiddleware({
    bodySchema: UpdateUserProfileSchema,
  }),

  validateRegisterGigWork: validateInputMiddleware({
    bodySchema: RegisterGigWorkSchema,
  }),

  validateRegisterBuyerRequest: validateInputMiddleware({
    bodySchema: RegisterBuyerSchema,
  }),

  validateRegisterWorkerRequest: validateInputMiddleware({
    bodySchema: RegisterWorkerSchema,
  }),
};
