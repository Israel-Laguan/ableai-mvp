import { Router } from 'express';

import { gigController } from './controller';
import { GigValidationInput } from '../../dependency-injection';
import { authorizationMiddleware } from '../../dependency-injection/middlewares';

const { registerGigWorkTeam, updateProfile } = gigController;

const { validateRegisterGigWorkTeam, validateUpdateUserProfile } = GigValidationInput;

const suffix = '/gig';

const router = Router();

router.patch('/profile', authorizationMiddleware, validateUpdateUserProfile, updateProfile);

router.post(
  '/work-team',
  authorizationMiddleware,
  validateRegisterGigWorkTeam,
  registerGigWorkTeam
);

const gigRouter = Router().use(suffix, router);

export default gigRouter;
