import { Router } from 'express';

import { authController } from './controller';
import { AuthValidationInput } from '../../dependency-injection';
import {
  authorizationMiddleware,
  roleAuthorizationMiddlewares,
} from '../../dependency-injection/middlewares';

const { superAdminGuard } = roleAuthorizationMiddlewares;

const { login, register, switchAppRole, updateMe, updateUser } = authController;

const { validateRegisterUser, validateUpdateMeUser, validateUpdateUser } = AuthValidationInput;

const authRouter = Router();

authRouter.post('/login', authorizationMiddleware, login);

authRouter.post('/register', validateRegisterUser, register);

authRouter.post('/switch-app-role', authorizationMiddleware, switchAppRole);

authRouter.patch('/me', authorizationMiddleware, validateUpdateMeUser, updateMe);

authRouter.patch(
  '/user/:id',
  authorizationMiddleware,
  superAdminGuard,
  validateUpdateUser,
  updateUser
);

export default authRouter;
