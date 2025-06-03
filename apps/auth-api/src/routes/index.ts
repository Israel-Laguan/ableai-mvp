import { Router } from 'express';

import authRouter from './auth';
import gigRouter from './gig';
import privateGigRouter from './private-gig';

const apiV1 = Router();

apiV1.use(gigRouter);
apiV1.use(privateGigRouter);
apiV1.use(authRouter);

export default apiV1;
