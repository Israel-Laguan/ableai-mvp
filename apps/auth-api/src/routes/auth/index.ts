import { Router } from 'express';

import { AuthController } from '../../controllers';
import { AuthValidation } from '../../dependency-injection';

const authRouter = Router();

authRouter.get(
  '/email-verification',
  AuthValidation.validateQueryEmail,
  AuthController.emailVerification
);
authRouter.post('/register', AuthValidation.validateRegisterUser, AuthController.register);

export default authRouter;
