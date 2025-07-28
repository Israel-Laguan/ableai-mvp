import type { UserClaims } from '@models/auth';

import { Express } from '@backend';
import { workerServices } from './service';
import { Gig } from '@product-domain/backend';

export const workerController = {
  register: Express.tryCatchAndNext(
    async (
      req: Express.Types.AuthorizedRequest<
        UserClaims,
        never,
        object,
        Gig.Domain.Interfaces.RegisterWorkerRequestBody
      >,
      res
    ) => {
      const result = await workerServices.register({
        ...req.body,
        worker: { ...req.body.worker, userId: req.user.id },
      });
      res.status(201).json(result);
    }
  ),
};
