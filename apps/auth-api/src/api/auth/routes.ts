import { Router } from 'express';

import { authController } from './controller';
import { AuthValidationInput } from '../../dependency-injection';
import { authorizationMiddleware } from '../../dependency-injection/middlewares';

const authRouter = Router();

authRouter.post('/login', authorizationMiddleware, authController.login);

authRouter.post('/register', AuthValidationInput.validateRegisterUser, authController.register);

authRouter.patch(
  '/me',
  authorizationMiddleware,
  AuthValidationInput.validateUpdateMeUser,
  authController.updateMe
);

authRouter.patch(
  '/user/:id',
  authorizationMiddleware,
  AuthValidationInput.validateUpdateUser,
  authController.updateUser
);

export default authRouter;
