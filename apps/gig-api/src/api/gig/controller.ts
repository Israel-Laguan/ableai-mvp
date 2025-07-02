import { Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { gigService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const gigController = {
  updateMe: tryCatchAndNext(
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
