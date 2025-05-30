import { Router } from 'express';

import pingRoutes from './ping';

const apiV1 = Router();

apiV1.use(pingRoutes);

export default apiV1;
