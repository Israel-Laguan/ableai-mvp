import type { Request, Response } from 'express';

import type { UserClaims } from '@models/auth';
import type { Gig } from '@product-domain/backend';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { gigService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const gigController = {
  getAllGigWorks: tryCatchAndNext(
    async (
      req: Express.Types.AuthorizedRequest<
        UserClaims,
        Request['params'],
        object,
        object,
        Gig.Domain.Interfaces.GetAllGigWorkRequestQuery
      >,
      res: Response
    ) => {
      const result = await gigService.getAllGigWorks({
        ...req.query,
        userId: req.user.id,
      });

      res.status(HTTP_STATUS_CODE.OK).json(result);
    }
  ),

  getAllGigWorkPayments: tryCatchAndNext(
    async (
      req: Express.Types.AuthorizedRequest<
        UserClaims,
        Request['params'],
        object,
        object,
        Gig.Domain.Interfaces.GetAllGigWorkPaymentsRequestQuery
      >,
      res: Response
    ) => {
      const result = await gigService.getAllGigWorkPayments({
        ...req.query,
        userId: req.user.id,
      });

      res.status(HTTP_STATUS_CODE.OK).json(result);
    }
  ),

  getOneGigWork: tryCatchAndNext(
    async (
      req: Express.Types.AuthorizedRequest<
        UserClaims,
        Gig.Domain.Interfaces.GetOneGigWorkRequestParams
      >,
      res: Response
    ) => {
      const result = await gigService.getOneGigWork({
        id: Number(req.params.id),
        userId: req.user.id,
      });

      res.status(HTTP_STATUS_CODE.OK).json(result);
    }
  ),

  registerGigWork: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UserClaims>, res: Response) => {
      const result = await gigService.registerGigWork({
        gigWork: req.body,
        userId: req.user.id,
      });

      res.status(HTTP_STATUS_CODE.CREATED).json(result);
    }
  ),

  registerGigWorkTeam: tryCatchAndNext(
    async (
      req: Express.Types.AuthorizedRequest<
        UserClaims,
        never,
        object,
        Gig.Domain.Interfaces.RegisterGigWorkTeamRequestBody
      >,
      res: Response
    ) => {
      const result = await gigService.registerGigWorkTeam({ ...req.body, createdBy: req.user.id });
      res.status(HTTP_STATUS_CODE.CREATED).json(result);
    }
  ),

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
