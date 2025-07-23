import { Router } from 'express';

import { gigController } from './controller';
import { GigValidationInput } from '../../dependency-injection';
import { authorizationMiddleware } from '../../dependency-injection/middlewares';

const { registerGigWork, updateProfile } = gigController;

const { validateRegisterGigWork, validateUpdateUserProfile } = GigValidationInput;

const suffix = '/gig';

const router = Router();

router.patch('/profile', authorizationMiddleware, validateUpdateUserProfile, updateProfile);

router.post('/work', authorizationMiddleware, validateRegisterGigWork, registerGigWork);

const gigRouter = Router().use(suffix, router);

export default gigRouter;
