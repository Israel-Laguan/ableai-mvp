import { Router } from 'express';

import authRouter from '../api/auth/routes';
import { limiterMiddleware } from '../dependency-injection/middlewares';

const apiV1 = Router();

apiV1.use(limiterMiddleware, authRouter);

export default apiV1;
