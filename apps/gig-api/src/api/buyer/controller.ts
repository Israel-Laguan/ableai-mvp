import type { UserClaims } from '@models/auth';

import { Express } from '@backend';
import { buyerServices } from './service';

type AuthorizedRequest = Express.Types.AuthorizedRequest<UserClaims>;

export const buyerController = {
  register: Express.tryCatchAndNext(async (req: AuthorizedRequest, res) => {
    const result = await buyerServices.register({ ...req.body, userId: req.user.id });
    res.status(201).json(result);
  }),
};
