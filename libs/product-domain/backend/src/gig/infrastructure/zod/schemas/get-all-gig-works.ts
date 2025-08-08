import z from 'zod';

import { APP_ROLE } from '@models/shared';
import { Constants as GigModelConstants } from '@models/gig';
import { Infra } from '../../../../shared';
import { Constants, Interfaces } from '../../../domain';

export const GetAllGigWorksSchema =
  Infra.Zod.Utils.makeGetAllSchema<Interfaces.GetAllGigWorkRequestQuery>({
    validSortFields: Constants.VALID_GIG_WORK_SORT_FIELDS,
    additionalQueryParams: {
      appRole: z.enum([APP_ROLE.WORKER, APP_ROLE.BUYER]).optional(),
      status: z
        .enum([
          GigModelConstants.GIG_WORK_STATUS.PENDING,
          GigModelConstants.GIG_WORK_STATUS.IN_PROGRESS,
          GigModelConstants.GIG_WORK_STATUS.COMPLETED,
        ])
        .optional(),
    },
  });
