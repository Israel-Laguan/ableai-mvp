import { Router } from 'express';

import { assistantController } from './controller';

const { handleRequest } = assistantController;

const assistantsRouter = Router();

assistantsRouter.post('/assistants', handleRequest);

export default assistantsRouter;
