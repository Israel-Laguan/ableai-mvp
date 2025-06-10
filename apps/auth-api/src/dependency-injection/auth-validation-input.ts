import { Express } from '@backend';
import { Auth } from '@product-domain/backend';

const { LoginUserSchema, EmailVerificationSchema, PhoneVerificationSchema, RegisterUserSchema } =
  Auth.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const AuthValidationInput = {
  validateLoginUser: validateInputMiddleware({
    bodySchema: LoginUserSchema,
  }),

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
