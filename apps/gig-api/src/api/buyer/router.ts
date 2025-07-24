import { Router } from 'express';

import { buyerController } from './controller';
import { Middlewares, GigValidationInput } from '../../dependency-injection';

const router = Router();
const { authorizationMiddleware } = Middlewares;
const { validateRegisterBuyerRequest } = GigValidationInput;

const suffix = '/buyer';

router.post('', authorizationMiddleware, validateRegisterBuyerRequest, buyerController.register);

const buyerRouter = Router().use(suffix, router);

export default buyerRouter;
