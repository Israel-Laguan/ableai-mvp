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

  handleBuyerRecommendationRequest: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UserClaims>, res: Response) => {
      const { id } = req.user;
      const response = await assistantService.handleBuyerRecommendationRequest(id);
      res.send(response);
    }
  ),

  handleWorkerRecommendationRequest: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UserClaims>, res: Response) => {
      const { id } = req.user;
      const response = await assistantService.handleWorkerRecommendationRequest(id);
      res.send(response);
    }
  ),
};
