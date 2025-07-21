import { Request, Response } from 'express';

import type { UserClaims } from '@models/auth';

import { Express } from '@backend';
import { assistantService } from './service';

const { tryCatchAndNext } = Express;

export const assistantController = {
  handleRequest: tryCatchAndNext(async (req: Request, res: Response) => {
    const response = await assistantService.handleUserPrompt(req.body.prompt);
    res.send(response);
  }),

  matchWorkers: tryCatchAndNext(async (req: Request, res: Response) => {
    const response = await assistantService.matchWorkers(req.body);
    res.send(response);
  }),

  handleRecommendationRequest: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UserClaims>, res: Response) => {
      const { prompt } = req.body;
      const { id } = req.user;
      const response = await assistantService.handleRecommendationRequest(prompt, id);
      res.send(response);
    }
  ),
};
