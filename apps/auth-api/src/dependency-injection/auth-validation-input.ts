import { Express } from '@backend';
import { Auth } from '@product-domain/backend';

const { registerUserSchema, updateUserSchema } = Auth.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const AuthValidationInput = {
  validateRegisterUser: validateInputMiddleware({
    bodySchema: registerUserSchema,
  }),

  validateUpdateUser: validateInputMiddleware({
    bodySchema: updateUserSchema,
  }),
};
