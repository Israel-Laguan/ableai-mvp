import { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { authService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const authController = {
  register: tryCatchAndNext(async (req: Request, res: Response) => {
    await authService.register(req.body);
    res.status(HTTP_STATUS_CODE.CREATED).end();
  }),

  verifyEmail: tryCatchAndNext(async (req: Request, res: Response) => {
    await authService.verifyEmail(req.query.email as string);
    res.status(HTTP_STATUS_CODE.OK).end();
  }),

  verifyPhoneNumber: tryCatchAndNext(async (req: Request, res: Response) => {
    const { idToken } = req.body;

    const { verified } = await authService.verifyPhoneNumber({
      idToken,
    });
    res.status(HTTP_STATUS_CODE.OK).json({
      verified,
    });
  }),
};
