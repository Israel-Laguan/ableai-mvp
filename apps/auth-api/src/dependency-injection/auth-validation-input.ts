import { Express } from '@backend';
import { Auth } from '@product-domain/backend';

const { RegisterUserSchema, UpdateUserSchema } = Auth.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const AuthValidationInput = {
  validateRegisterUser: validateInputMiddleware({
    bodySchema: RegisterUserSchema,
  }),

  validateUpdateUser: validateInputMiddleware({
    bodySchema: UpdateUserSchema,
  }),
};
