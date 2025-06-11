import { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { authService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const authController = {
  login: tryCatchAndNext(async (req: Request, res: Response) => {
    const { email } = req.body;
    const userAgent = req.headers['user-agent'];
    const IP = req.headers['x-forwarded-for']?.[0] || req.socket.remoteAddress || req.ip;
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    const {
      idToken: newIdToken,
      privateDataUser,
      user,
    } = await authService.login({
      email,
      IP,
      userAgent,
      idToken,
    });
    res.status(HTTP_STATUS_CODE.OK).json({ idToken: newIdToken, privateDataUser, user });
  }),

  register: tryCatchAndNext(async (req: Request, res: Response) => {
    await authService.register(req.body);
    res.status(HTTP_STATUS_CODE.CREATED).end();
  }),
};
