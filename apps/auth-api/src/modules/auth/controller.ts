import { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { authService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

const register = tryCatchAndNext(async (req: Request, res: Response) => {
  await authService.register(req.body);

  res.status(HTTP_STATUS_CODE.CREATED).end();
});

const verifyEmail = tryCatchAndNext(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.query.email as string);

  res.status(HTTP_STATUS_CODE.OK).end();
});

export const authController = {
  register,
  verifyEmail,
};
