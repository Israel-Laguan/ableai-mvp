import { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { UpdateInput } from '../../interfaces';
import { authService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const authController = {
  login: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UpdateInput['idTokenClaims']>, res: Response) => {
      const userAgent = req.headers['user-agent'];
      const IP = req.headers['x-forwarded-for']?.[0] || req.socket.remoteAddress || req.ip;

      const { privateDataUser, user } = await authService.login({
        email: req.user.email,
        IP,
        userAgent,
      });

      res.status(HTTP_STATUS_CODE.OK).json({ privateDataUser, user });
    }
  ),

  register: tryCatchAndNext(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    res.status(HTTP_STATUS_CODE.CREATED).json(result);
  }),

  update: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UpdateInput['idTokenClaims']>, res: Response) => {
      const result = await authService.update({
        ...req.body,
        idTokenClaims: req.user,
        user: {
          ...req.body.user,
          id: req.user.id,
        },
      });

      res.status(HTTP_STATUS_CODE.OK).json(result);
    }
  ),
};
