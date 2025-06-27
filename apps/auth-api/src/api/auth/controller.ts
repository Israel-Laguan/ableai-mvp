import { Request, Response } from 'express';

import type { SwitchAppRoleInput, UpdateInput } from '../../interfaces';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { authService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const authController = {
  login: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UpdateInput['idTokenClaims']>, res: Response) => {
      const userAgent = req.headers['user-agent'];
      const IP = req.headers['x-forwarded-for']?.[0] || req.socket.remoteAddress || req.ip;
      const { privateDataUser, user } = await authService.login({
        id: req.user.id,
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

  switchAppRole: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<SwitchAppRoleInput>, res: Response) => {
      await authService.switchAppRole({
        appRole: req.body.appRole,
        id: req.user.id,
        roleId: req.user.roleId,
      });

      res.status(HTTP_STATUS_CODE.UPDATED).end();
    }
  ),

  updateUser: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UpdateInput['idTokenClaims']>, res: Response) => {
      const result = await authService.updateUser({
        ...req.body,
        idTokenClaims: req.user,
        user: {
          ...req.body.user,
          id: parseInt(req.params.id, 10),
        },
      });

      res.status(HTTP_STATUS_CODE.UPDATED).json(result);
    }
  ),

  updateMe: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UpdateInput['idTokenClaims']>, res: Response) => {
      const result = await authService.updateUser({
        ...req.body,
        idTokenClaims: req.user,
        user: {
          ...req.body.user,
          id: req.user.id,
        },
      });

      res.status(HTTP_STATUS_CODE.UPDATED).json(result);
    }
  ),
};
