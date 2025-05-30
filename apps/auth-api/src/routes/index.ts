import { Router } from 'express';

import gig from './gig';
import privateGig from './private-gig';

const globalPrefix = '/api/auth/v1';

const apiV1 = Router();

apiV1.use(globalPrefix, gig);
apiV1.use(globalPrefix, privateGig);

export default apiV1;
export { globalPrefix };
