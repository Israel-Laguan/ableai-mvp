import { Router } from 'express';

import { gigController } from './controller';
import { GigValidationInput } from '../../dependency-injection';
import { authorizationMiddleware } from '../../dependency-injection/middlewares';

const { updateMe } = gigController;

const { validateUpdateMeUser } = GigValidationInput;

const gigRouter = Router();

gigRouter.patch('/profile', authorizationMiddleware, validateUpdateMeUser, updateMe);

export default gigRouter;
