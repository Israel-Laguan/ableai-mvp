import { Router } from 'express';

import { gigController } from './controller';
import { GigValidationInput } from '../../dependency-injection';
import { authorizationMiddleware } from '../../dependency-injection/middlewares';

const { updateProfile } = gigController;

const { validateUpdateUserProfile } = GigValidationInput;

const gigRouter = Router();

gigRouter.patch('/profile', authorizationMiddleware, validateUpdateUserProfile, updateProfile);

export default gigRouter;
