import { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { authService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const authController = {
  login: tryCatchAndNext(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'];
    const IP = req.headers['x-forwarded-for']?.[0] || req.socket.remoteAddress || req.ip;
    const { accessToken, refreshToken, lastAppRole } = await authService.login({
      email,
      IP,
      password,
      userAgent,
    });
    res.status(HTTP_STATUS_CODE.OK).json({ accessToken, refreshToken, lastAppRole });
  }),

  register: tryCatchAndNext(async (req: Request, res: Response) => {
    await authService.register(req.body);
    res.status(HTTP_STATUS_CODE.CREATED).end();
  }),
};
