import z from 'zod';

import type { GigWorkTeam } from '@models/gig';
import { type IBase } from '@models/shared';
import type { Interfaces } from '../../../domain';

import { Constants } from '@models/gig';
import { APP_ROLE } from '@models/shared';
import { Infra } from '../../../../shared';

const {
  GIG_WORK_TEAM_STATUS: { ACCEPTED, CANCELLED, COMPLETED, PAID, PENDING, REJECTED },
} = Constants;

const fieldDataTypeSchemas = Infra.Zod.Utils.makeTypedZodObject<
  GigWorkTeam & IBase
>().recordOfSchemas({
  awardedBadge: z.string(),
  createdBy: z.number().positive(),
  delegateTo: z.number().positive(),
  endDateOffer: z.date(),
  endGig: z.boolean(),
  expenses: z.number().min(0),
  feedback: z.string(),
  gigWorkId: z.number().positive(),
  isAcceptedOffer: z.boolean(),
  paymentId: z.number().positive(),
  workerSkillId: z.number().positive(),
  status: z.enum([ACCEPTED, CANCELLED, COMPLETED, PAID, PENDING, REJECTED]),
  tips: z.number().min(0),
  totalPayment: z.number().min(0),
  workerId: z.number().positive(),
  workTime: z.number().min(0),
  wouldWork: z.boolean(),
  id: z.number().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const validFields = Object.keys(fieldDataTypeSchemas) as [keyof GigWorkTeam];

const WhereBodySchema = z
  .object({
    fields: z.array(
      z.object({
        field: z.enum(validFields),
        value: z.any(),
      })
    ),
  })
  .superRefine((obj, ctx) => {
    obj.fields.forEach(fieldObj => {
      const fieldResult = fieldDataTypeSchemas[fieldObj.field].safeParse(fieldObj.value);

      if (!fieldResult.success) {
        fieldResult.error.issues.forEach(issue => {
          ctx.addIssue({
            ...issue,
            path: [...issue.path, 'fields', fieldObj.field],
          });
        });
      }
    });
  });

export const GetAllGigWorkTeamsRequestQuerySchema = Infra.Zod.Utils.makeGetAllSchema(validFields);

export const GetAllGigWorkTeamsRequestBodySchema =
  Infra.Zod.Utils.makeTypedZodObject<Interfaces.GetAllGigWorkTeamRequestBody>().schema({
    where: WhereBodySchema,
    appRole: z.enum([APP_ROLE.WORKER, APP_ROLE.BUYER]).optional(),
  });
