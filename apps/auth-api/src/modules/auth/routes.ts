import { Router } from 'express';

import { authController } from './controller';
import { AuthValidation } from '../../dependency-injection';

const authRouter = Router();

authRouter.get(
  '/email-verification',
  AuthValidation.validateQueryEmail,
  authController.verifyEmail
);

authRouter.post('/register', AuthValidation.validateRegisterUser, authController.register);

export default authRouter;
