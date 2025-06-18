import { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS, Utils } from '@shared';
import { Auth } from '@product-domain/backend';
import { UpdateInput } from '../../interfaces';
import { authService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

const { makeBuildObjectDynamically } = Utils;

const buildUpdateServiceInput = makeBuildObjectDynamically<
  Auth.Domain.Interfaces.UpdateInput<UpdateInput>
>({
  admittedKeys: ['idTokenClaims', 'user', 'lastPassword', 'password', 'privateDataUser'],
});

const buildUserUpdateServiceInput = makeBuildObjectDynamically({
  admittedKeys: Auth.Domain.Constants.USER_UPDATE_ADMITTED_KEYS_WITH_ID,
});

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
      const user = buildUserUpdateServiceInput({
        ...req.body.user,
        id: req.user.id,
      });

      const input = buildUpdateServiceInput({
        ...req.body,
        idTokenClaims: req.user,
        user,
      });

      const result = await authService.update(
        input as Auth.Domain.Interfaces.UpdateInput<UpdateInput>
      );

      res.status(HTTP_STATUS_CODE.OK).json(result);
    }
  ),
};
