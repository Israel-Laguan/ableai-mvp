import { Router } from 'express';

import { authController } from './controller';
import { AuthValidationInput } from '../../dependency-injection';
import { authorizationMiddleware } from '../../dependency-injection/middlewares';

const authRouter = Router();

authRouter.post('/login', authController.login);

authRouter.post('/register', AuthValidationInput.validateRegisterUser, authController.register);

authRouter.put(
  '/update',
  authorizationMiddleware,
  AuthValidationInput.validateUpdateUser,
  authController.update
);

export default authRouter;
