import { Router } from 'express';

import { assistantController } from './controller';
import { Middlewares, Validation } from '../../dependency-injection';

const { handleRecommendationRequest, handleRequest, matchWorkers } = assistantController;
const { validateAssistantInput, validateMatchWorkersInput } = Validation.InputValidation;
const { authorizationMiddleware } = Middlewares;

const assistantsRouter = Router();

assistantsRouter.post('/prompt', validateAssistantInput, handleRequest);
assistantsRouter.post(
  '/match-workers',
  authorizationMiddleware,
  validateMatchWorkersInput,
  matchWorkers
);
assistantsRouter.post(
  '/recommendations',
  authorizationMiddleware,
  validateAssistantInput,
  handleRecommendationRequest
);

export default assistantsRouter;
