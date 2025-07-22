import { Router } from 'express';

import { workerController } from './controller';
import { Middlewares, GigValidationInput } from '../../dependency-injection';

const router = Router();
const { authorizationMiddleware } = Middlewares;
const { validateRegisterWorkerRequest } = GigValidationInput;

router.post(
  '/register',
  authorizationMiddleware,
  validateRegisterWorkerRequest,
  workerController.register
);

const suffix = '/worker';
const workerRouter = Router().use(suffix, router);

export default workerRouter;
