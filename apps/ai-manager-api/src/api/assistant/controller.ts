import { Request, Response } from 'express';

import { Express } from '@backend';
import { assistantService } from './service';

const { tryCatchAndNext } = Express;

export const assistantController = {
  handleRequest: tryCatchAndNext(async (req: Request, res: Response) => {
    const response = await assistantService.handleUserPrompt(req.body.prompt);
    res.send(response);
  }),
};
