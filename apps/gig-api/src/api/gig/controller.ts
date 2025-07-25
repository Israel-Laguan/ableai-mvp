import type { Request, Response } from 'express';

import type { UserClaims } from '@models/auth';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { gigService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const gigController = {
  registerGigWork: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UserClaims>, res: Response) => {
      const result = await gigService.registerGigWork({
        gigWork: req.body,
        userId: req.user.id,
      });

      res.status(HTTP_STATUS_CODE.CREATED).json(result);
    }
  ),

  registerGigWorkTeam: tryCatchAndNext(async (req: Request, res: Response) => {
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
