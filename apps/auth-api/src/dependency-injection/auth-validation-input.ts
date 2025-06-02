import { Express } from '@backend';
import { Auth, Shared } from '@product-domain/backend';

const { ValidateEmailSchema } = Shared.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const validateQueryEmail = validateInputMiddleware({
  querySchema: ValidateEmailSchema,
});

export const validateRegisterUser = validateInputMiddleware({
  bodySchema: Auth.Infra.Zod.Schemas.RegisterUserSchema,
});
