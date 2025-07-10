import { Router } from 'express';

import fakerRouter from '../api/faker/router';

const apiV1 = Router();

apiV1.use(fakerRouter);

export default apiV1;
