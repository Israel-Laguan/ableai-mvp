import { Router } from 'express';

import auth from './auth';
import gig from './gig';
import privateGig from './private-gig';

const apiV1 = Router();

apiV1.use(gig);
apiV1.use(privateGig);
apiV1.use(auth);

export default apiV1;
