import { Router } from 'express';

import { gigController } from './controller';
import { GigValidationInput } from '../../dependency-injection';
import { authorizationMiddleware } from '../../dependency-injection/middlewares';

const { registerGigWork, registerGigWorkTeam, updateProfile } = gigController;

const { validateRegisterGigWork, validateRegisterGigWorkTeam, validateUpdateUserProfile } =
  GigValidationInput;

const suffix = '/gig';
const GigWorkSuffix = '/gig-work';
const GigWorkTeamSuffix = '/work-team';

const router = Router();

router.patch('/profile', authorizationMiddleware, validateUpdateUserProfile, updateProfile);

router.post(GigWorkSuffix, authorizationMiddleware, validateRegisterGigWork, registerGigWork);
router.get(
  GigWorkSuffix,
  authorizationMiddleware,
  GigValidationInput.validateGetAllGigWorks,
  gigController.getAllGigWorks
);
router.get(
  GigWorkSuffix + '/payments',
  authorizationMiddleware,
  GigValidationInput.validateGetAllGigWorkPayments,
  gigController.getAllGigWorkPayments
);
router.get(
  GigWorkSuffix + '/:id',
  authorizationMiddleware,
  GigValidationInput.validateGetOneGigWork,
  gigController.getOneGigWork
);

router.post(
  GigWorkTeamSuffix,
  authorizationMiddleware,
  validateRegisterGigWorkTeam,
  registerGigWorkTeam
);

const gigRouter = Router().use(suffix, router);

export default gigRouter;
