import { Request, Response } from 'express';

import { Express } from '@backend';
import { CONSTANTS } from '@shared';
import { fakerService } from './service';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const fakerController = {
  generateFakeUserData: tryCatchAndNext(async (req: Request, res: Response) => {
    const fakeUserData = await fakerService.generateFakeUserData(req.body);
    res.status(HTTP_STATUS_CODE.OK).json(fakeUserData);
  }),

  removeFakeUserData: tryCatchAndNext(async (req: Request, res: Response) => {
    const { userId } = req.params;
    await fakerService.removeFakeUserData(userId);
    res.status(HTTP_STATUS_CODE.UPDATED).send();
  }),
};
