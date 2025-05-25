import { Router, Request, Response } from 'express';
import { llmService } from '../../dependency-injection';

const assistantsRouter = Router();

assistantsRouter.post('/assistants', async (req: Request, res: Response) => {
  const response = await llmService({ prompt: req.body.prompt });
  res.send(response);
});

export default assistantsRouter;
