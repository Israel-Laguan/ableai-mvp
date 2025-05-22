import { Router } from 'express';

import authRoutes from './auth';
import pingRoutes from './ping';

const globalPrefix = 'api/auth/v1';

const apiV1 = Router();

apiV1.use(globalPrefix, authRoutes);
apiV1.use(globalPrefix, pingRoutes);

export default apiV1;
