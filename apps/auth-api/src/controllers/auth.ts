import { Request, Response } from 'express';

import { CONSTANTS } from '@shared';

import { Express } from '@backend';
import { UseCases } from '../dependency-injection';

const { HTTP_STATUS_CODE } = CONSTANTS;

const { tryCatchAndNext } = Express;

// export const auth = tryCatchAndNext(async (req: Request, res: Response) => {
//   const { email } = req.body;

//   const token = await AuthUseCases.authorized({ email });
//   res.json({ token });
// });

export const register = tryCatchAndNext(async (req: Request, res: Response) => {
  await UseCases.registerUseCase(req.body);

  res.status(HTTP_STATUS_CODE.CREATED).json();
});
