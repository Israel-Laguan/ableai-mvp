import { Router } from 'express';

import gigRouter from '../api/gig/routes';
import workerRouter from '../api/worker/router';

import { limiterMiddleware } from '../dependency-injection/middlewares';
import pingRoutes from './ping';

const apiV1 = Router();

apiV1.use(pingRoutes);
apiV1.use(limiterMiddleware.middleware, gigRouter);
apiV1.use(limiterMiddleware.middleware, workerRouter);

export default apiV1;
