import { Router } from 'express';

import { workerController } from './controller';
import { Middlewares, GigValidationInput } from '../../dependency-injection';

const router = Router();
const { authorizationMiddleware } = Middlewares;
const { validateRegisterWorkerRequest } = GigValidationInput;

const suffix = '/worker';

router.post('', authorizationMiddleware, validateRegisterWorkerRequest, workerController.register);

const workerRouter = Router().use(suffix, router);

export default workerRouter;
