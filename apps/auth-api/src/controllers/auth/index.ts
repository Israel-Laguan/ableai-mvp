import { Request, Response } from 'express';

import { CONSTANTS } from '@shared';
import { Infra } from '@models/auth';

import { tryCatchAndNext } from '../../utils';
import { AuthUseCases } from '../../dependency-injection';

const { HTTP_STATUS_CODE } = CONSTANTS;

// export const auth = tryCatchAndNext(async (req: Request, res: Response) => {
//   const { email } = req.body;

//   const token = await AuthUseCases.authorized({ email });
//   res.json({ token });
// });

export const register = tryCatchAndNext(async (req: Request, res: Response) => {
  await AuthUseCases.registerUseCase(req.body as Infra.RegisterInput);

  res.status(HTTP_STATUS_CODE.CREATED).json();
});
