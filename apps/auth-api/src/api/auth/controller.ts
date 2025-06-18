import { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { authService } from './service';
import { Auth } from '@product-domain/backend';
import { UpdateInput } from '../../interfaces';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const authController = {
  login: tryCatchAndNext(async (req: Request, res: Response) => {
    const { email } = req.body;
    const userAgent = req.headers['user-agent'];
    const IP = req.headers['x-forwarded-for']?.[0] || req.socket.remoteAddress || req.ip;
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    const { customToken, privateDataUser, user } = await authService.login({
      email,
      IP,
      userAgent,
      idToken,
    });

    res.status(HTTP_STATUS_CODE.OK).json({ customToken, privateDataUser, user });
  }),

  register: tryCatchAndNext(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    res.status(HTTP_STATUS_CODE.CREATED).json(result);
  }),

  update: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UpdateInput['idTokenClaims']>, res: Response) => {
      const input: Auth.Domain.Interfaces.UpdateInput<UpdateInput> = {
        idTokenClaims: req.user,
        user: {
          ...req.body.user,
          id: req.user.id,
        },
      };

      const { lastPassword, password, privateDataUser } = req.body;

      if (lastPassword && password) {
        input.lastPassword = lastPassword;
        input.password = password;
      }

      if (privateDataUser) {
        input.privateDataUser = { ...privateDataUser };
      }

      const result = await authService.update(input);

      res.status(HTTP_STATUS_CODE.OK).json(result);
    }
  ),
};
