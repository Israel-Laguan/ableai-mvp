import { Router } from 'express';

import auth from './auth';
import gig from './gig';
import privateGig from './private-gig';

const globalPrefix = '/api/auth/v1';

const apiV1 = Router();

apiV1.use(globalPrefix, gig);
apiV1.use(globalPrefix, privateGig);
apiV1.use(globalPrefix, auth);

export default apiV1;
export { globalPrefix };
