import { Router } from 'express';

import authRouter from '../api/auth/routes';

const apiV1 = Router();

apiV1.use(authRouter);

export default apiV1;
