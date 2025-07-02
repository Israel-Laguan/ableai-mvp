import { Express } from '@backend';
import { Auth, Shared } from '@product-domain/backend';

const { RegisterUserSchema, UpdateMeUserSchema, UpdateUserSchema } = Auth.Infra.Zod.Schemas;

const {
  Middlewares: { validateInputMiddleware },
} = Express;

const { ValidateIdSchema } = Shared.Infra.Zod.Schemas;

export const AuthValidationInput = {
  validateRegisterUser: validateInputMiddleware({
    bodySchema: RegisterUserSchema,
  }),

  validateUpdateMeUser: validateInputMiddleware({
    bodySchema: UpdateMeUserSchema,
  }),

  validateUpdateUser: validateInputMiddleware({
    bodySchema: UpdateUserSchema,
    paramsSchema: ValidateIdSchema.transform(obj => {
      const id = parseInt(obj.id, 10);
      return { id };
    }).refine(obj => typeof obj.id === 'number' && !isNaN(obj.id), {
      path: [':id'],
      message: 'ID Should be an number',
    }),
  }),
};
