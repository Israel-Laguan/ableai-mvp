import { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { fakerService } from './service';
import { UserClaims } from '@models/auth';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const fakerController = {
  generateFakeGigWorkPayments: tryCatchAndNext(
    async (req: Express.Types.AuthorizedRequest<UserClaims>, res: Response) => {
      await fakerService.generateFakeGigWorkPayments(req.user.id);
      res.end();
    }
  ),

  generateFakeUserData: tryCatchAndNext(async (req: Request, res: Response) => {
    const fakeUserData = await fakerService.generateFakeUserData(req.body);
    res.status(HTTP_STATUS_CODE.OK).json(fakeUserData);
  }),

  generateFakeWorkers: tryCatchAndNext(async (req: Request, res: Response) => {
    await fakerService.generateFakeWorkers(req.body);
    res.end();
  }),

  removeFakeUserData: tryCatchAndNext(async (req: Request, res: Response) => {
    const { userId } = req.params;
    await fakerService.removeFakeUserData(userId);
    res.status(HTTP_STATUS_CODE.UPDATED).send();
  }),
};
