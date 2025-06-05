import { Router } from 'express';

import authRouter from '../modules/auth/routes';

const apiV1 = Router();

apiV1.use(authRouter);

export default apiV1;
