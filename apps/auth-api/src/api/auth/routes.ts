import { Router } from 'express';

import { authController } from './controller';
import { AuthValidationInput } from '../../dependency-injection';
import {
  authorizationMiddleware,
  roleAuthorizationMiddlewares,
} from '../../dependency-injection/middlewares';

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
  roleAuthorizationMiddlewares.superAdminGuard,
  AuthValidationInput.validateUpdateUser,
  authController.updateUser
);

export default authRouter;
