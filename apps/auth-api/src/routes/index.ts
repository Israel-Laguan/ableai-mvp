import { Router } from 'express';

import { Express } from '@backend';
import gig from './gig';
import privateGig from './private-gig';

const globalPrefix = '/api/auth/v1';

const apiV1 = Router();

apiV1.use(globalPrefix, gig);
apiV1.use(globalPrefix, privateGig);
apiV1.use(globalPrefix, Express.Api.Health.router);

export default apiV1;
export { globalPrefix };
