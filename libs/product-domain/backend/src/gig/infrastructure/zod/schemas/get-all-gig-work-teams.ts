import z from 'zod';

import type { GigWorkTeam } from '@models/gig';
import type { IBase } from '@models/shared';

import { Constants } from '@models/gig';
import { APP_ROLE } from '@models/shared';
import { Infra } from '../../../../shared';

const {
  GIG_WORK_TEAM_STATUS: { ACCEPTED, CANCELLED, COMPLETED, PAID, PENDING, REJECTED },
} = Constants;

const IsPositiveNumberStringSchema = z
  .string()
  .regex(/^\d+$/, 'Invalid positive number')
  .transform(data => {
    return Number(data);
  });

const IsBooleanStringSchema = z.string().transform(data => {
  return data === 'true';
});

const fieldDataTypeSchemas = Infra.Zod.Utils.makeTypedZodObject<
  GigWorkTeam & IBase
>().recordOfSchemas({
  awardedBadge: z.string(),
  createdBy: IsPositiveNumberStringSchema,
  delegateTo: IsPositiveNumberStringSchema,
  endDateOffer: z.date(),
  endGig: IsBooleanStringSchema,
  expenses: IsPositiveNumberStringSchema,
  feedback: z.string(),
  gigWorkId: IsPositiveNumberStringSchema,
  isAcceptedOffer: IsBooleanStringSchema,
  paymentId: IsPositiveNumberStringSchema,
  workerSkillId: IsPositiveNumberStringSchema,
  status: z.enum([ACCEPTED, CANCELLED, COMPLETED, PAID, PENDING, REJECTED]),
  tips: IsPositiveNumberStringSchema,
  totalPayment: IsPositiveNumberStringSchema,
  workerId: IsPositiveNumberStringSchema,
  workTime: IsPositiveNumberStringSchema,
  wouldWork: IsBooleanStringSchema,
  id: IsPositiveNumberStringSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

const validFields = Object.keys(fieldDataTypeSchemas) as [keyof GigWorkTeam];

export const WhereQuerySchema = z.string().transform((data, ctx) => {
  const { data: validatedData, error } = z
    .object({
      fields: z.array(
        z
          .object({
            field: z.enum(validFields),
            value: z.any(),
          })
          .transform((fieldObj, ctx) => {
            const { error, data } = fieldDataTypeSchemas[fieldObj.field].safeParse(fieldObj.value);

            if (error) {
              ctx.addIssue({
                ...error.issues[0],
                path: [...error.issues[0].path, 'fields', fieldObj.field],
              });
            }

            return {
              field: fieldObj.field,
              value: data,
            };
          })
      ),
    })
    .safeParse(JSON.parse(data));

  if (error) {
    ctx.addIssue({
      ...error.issues[0],
      path: [...error.issues[0].path],
    });
  }

  return validatedData;
});

export const GetAllGigWorkTeamsRequestQuerySchema = Infra.Zod.Utils.makeGetAllSchema(validFields, {
  where: WhereQuerySchema.optional(),
  appRole: z.enum([APP_ROLE.WORKER, APP_ROLE.BUYER]).optional(),
});
