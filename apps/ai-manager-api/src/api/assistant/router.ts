import { Router } from 'express';

import { assistantController } from './controller';
import { InputValidation } from '../../dependency-injection/validation';

const { handleRequest } = assistantController;
const { validateAssistantInput } = InputValidation;

const assistantsRouter = Router();

assistantsRouter.post('/assistants', validateAssistantInput, handleRequest);

export default assistantsRouter;
