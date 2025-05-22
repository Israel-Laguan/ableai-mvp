import { Auth, Shared } from '@product-domain/backend';

import { validateInputMiddleware } from '../middlewares';

const { ValidateEmailSchema } = Shared.Infra.ZodSchemas;

export const validateBodyEmail = validateInputMiddleware({
  bodySchema: ValidateEmailSchema,
});

export const validateRegisterUser = validateInputMiddleware({
  bodySchema: Auth.Infra.ZodSchemas.RegisterUserSchema,
});
