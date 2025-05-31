import { Router } from 'express';

import { register } from '../../controllers';

const prefix = 'auth';

const router = Router();

router.post(`/${prefix}/register`, register);

export default router;
