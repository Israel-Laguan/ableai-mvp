import { Router } from 'express';

import { assistantController } from './controller';
import { Middlewares, Validation } from '../../dependency-injection';

const {
  handleBuyerRecommendationRequest,
  handleWorkerRecommendationRequest,
  handleRequest,
  matchWorkers,
} = assistantController;
const { validateAssistantInput, validateMatchWorkersInput } = Validation.InputValidation;
const {
  authorizationMiddleware,
  roleAuthorizationMiddlewares: { superAdminGuard },
} = Middlewares;

const assistantsRouter = Router();

assistantsRouter.post(
  '/prompt',
  authorizationMiddleware,
  superAdminGuard,
  validateAssistantInput,
  handleRequest
);
assistantsRouter.post(
  '/match-workers',
  authorizationMiddleware,
  validateMatchWorkersInput,
  matchWorkers
);

const RECOMMENDATIONS = '/recommendations';

assistantsRouter.get(
  RECOMMENDATIONS + '/buyer',
  authorizationMiddleware,
  handleBuyerRecommendationRequest
);

assistantsRouter.get(
  RECOMMENDATIONS + '/worker',
  authorizationMiddleware,
  handleWorkerRecommendationRequest
);

export default assistantsRouter;
