import type { UserClaims } from '@models/auth';

import { Express } from '@backend';
import { workerServices } from './service';

type AuthorizedRequest = Express.Types.AuthorizedRequest<UserClaims>;

export const workerController = {
  register: Express.tryCatchAndNext(async (req: AuthorizedRequest, res) => {
    const result = await workerServices.register({ ...req.body, userId: req.user.id });
    res.status(201).json(result);
  }),
};
