import { Router } from 'express';

import { authController } from './controller';
import { AuthValidationInput } from '../../dependency-injection';

const authRouter = Router();

authRouter.get(
  '/email-verification',
  AuthValidationInput.validateQueryEmail,
  authController.verifyEmail
);

authRouter.post('/login', AuthValidationInput.validateLoginUser, authController.login);

authRouter.post('/register', AuthValidationInput.validateRegisterUser, authController.register);

authRouter.post(
  '/verify-phone-number',
  AuthValidationInput.validatePhoneVerification,
  authController.verifyPhoneNumber
);

export default authRouter;
