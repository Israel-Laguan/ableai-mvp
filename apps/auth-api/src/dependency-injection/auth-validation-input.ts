import { Express } from '@backend';
import { Auth } from '@product-domain/backend';

const { EmailVerificationSchema, PhoneVerificationSchema, RegisterUserSchema } =
  Auth.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const AuthValidationInput = {
  validatePhoneVerification: validateInputMiddleware({
    bodySchema: PhoneVerificationSchema,
  }),

  validateQueryEmail: validateInputMiddleware({
    querySchema: EmailVerificationSchema,
  }),

  validateRegisterUser: validateInputMiddleware({
    bodySchema: RegisterUserSchema,
  }),
};
