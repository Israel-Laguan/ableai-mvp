import { Router } from 'express';

import { buyerController } from './controller';
import { Middlewares, GigValidationInput } from '../../dependency-injection';

const router = Router();
const { authorizationMiddleware } = Middlewares;
const { validateRegisterBuyerRequest } = GigValidationInput;

router.post(
  '/register',
  authorizationMiddleware,
  validateRegisterBuyerRequest,
  buyerController.register
);

const suffix = '/buyer';
const buyerRouter = Router().use(suffix, router);

export default buyerRouter;
