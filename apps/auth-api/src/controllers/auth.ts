import { Request, Response } from 'express';

import { CONSTANTS } from '@shared';

import { Express } from '@backend';
import { UseCases } from '../dependency-injection';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

export const emailVerification = tryCatchAndNext(async (req: Request, res: Response) => {
  await UseCases.verifyEmailUseCase(req.query.email as string);

  res.status(HTTP_STATUS_CODE.OK).end();
});

export const register = tryCatchAndNext(async (req: Request, res: Response) => {
  await UseCases.registerUseCase(req.body);

  res.status(HTTP_STATUS_CODE.CREATED).end();
});
