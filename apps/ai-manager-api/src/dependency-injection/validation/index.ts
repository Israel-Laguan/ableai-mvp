import { Express } from '@backend';
import { AiManager } from '@product-domain/backend';

const {
  Middlewares: { validateInputMiddleware },
} = Express;

export const InputValidation = {
  validateAssistantInput: validateInputMiddleware({
    bodySchema: AiManager.Infra.Zod.Schemas.AiManagerSchema,
  }),
};
