import { Router } from 'express';

import { assistantController } from './controller';
import { InputValidation } from '../../dependency-injection/validation';

const { handleRequest, matchWorkers } = assistantController;
const { validateAssistantInput, validateMatchWorkersInput } = InputValidation;

const assistantsRouter = Router();

assistantsRouter.post('/prompt', validateAssistantInput, handleRequest);
assistantsRouter.post('/match-workers', validateMatchWorkersInput, matchWorkers);

export default assistantsRouter;
