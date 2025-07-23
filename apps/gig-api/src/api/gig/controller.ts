import type { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { gigService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const gigController = {
  registerWorker: tryCatchAndNext(async (req: Request, res: Response) => {
    const result = await gigService.registerGigWorkTeam(req.body);
    res.status(HTTP_STATUS_CODE.CREATED).json(result);
  }),

  updateProfile: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<{ id: number }>, res: Response) => {
      const result = await gigService.updateUser({
        ...req.body,
        user: {
          id: req.user.id,
        },
      });

      res.status(HTTP_STATUS_CODE.UPDATED).json(result);
    }
  ),
};
