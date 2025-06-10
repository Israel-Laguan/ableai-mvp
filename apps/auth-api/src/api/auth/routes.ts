import { Router } from 'express';

import { authController } from './controller';
import { AuthValidationInput } from '../../dependency-injection';

const authRouter = Router();

authRouter.post('/login', AuthValidationInput.validateLoginUser, authController.login);

authRouter.post('/register', AuthValidationInput.validateRegisterUser, authController.register);

export default authRouter;
