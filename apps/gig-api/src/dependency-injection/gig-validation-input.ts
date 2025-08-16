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
  validateAcceptGigWorkTeam: validateInputMiddleware({
    bodySchema: Gig.Infra.Zod.Schemas.AcceptGigWorkTeamSchema,
  }),

  validateGetAllGigWorks: validateInputMiddleware({
    querySchema: Gig.Infra.Zod.Schemas.GetAllGigWorksSchema,
  }),

  validateGetAllGigWorkPayments: validateInputMiddleware({
    querySchema: Gig.Infra.Zod.Schemas.GetAllGigWorkPaymentsSchema,
  }),

  validateGetAllGigWorkTeams: validateInputMiddleware({
    querySchema: Gig.Infra.Zod.Schemas.GetAllGigWorkTeamsRequestQuerySchema,
    bodySchema: Gig.Infra.Zod.Schemas.GetAllGigWorkTeamsRequestBodySchema,
  }),

  validateGetOneGigWork: validateInputMiddleware({
    paramsSchema: Gig.Infra.Zod.Schemas.GetOneGigWorkParamsSchema,
  }),

  validateGetOneGigWorkTeam: validateInputMiddleware({
    paramsSchema: Gig.Infra.Zod.Schemas.GetOneGigWorkTeamParamsSchema,
  }),

  validateRegisterGigWorkTeam: validateInputMiddleware({
    bodySchema: RegisterGigWorkTeamSchema,
  }),

  validateGigWorTeamPaymentUpdate: validateInputMiddleware({
    bodySchema: Gig.Infra.Zod.Schemas.UpdateGigWorkTeamPaymentSchema,
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
