import { z } from 'zod';

import type { Interfaces } from '../../../domain';

import { Infra } from '../../../../shared';

const RecommendationsSchema = Infra.Zod.Utils.makeZodObjectSchema<
  Interfaces.RegisterWorkerRequestBody['recommendations'][number]
>({
  isExternal: z.boolean().default(true),
  name: z.string().min(1),
  recommendation: z.string().min(1),
  userId: z.string().min(1).optional(),
}).strict();

const WorkerSkillsSchema = Infra.Zod.Utils.makeZodObjectSchema<
  Interfaces.RegisterWorkerRequestBody['workerSkills'][number]
>({
  name: z.string().min(1),
  equipment: z.array(z.string()).min(1).nonempty().optional(),
  imagesUrl: z.string().url().optional(),
  ratePerHour: z.number().min(0),
  summary: z.string().min(1).optional(),
  trainingDescription: z.string().min(1),
  videoUrl: z.string().url().optional(),
}).strict();

const SlotsSchema = Infra.Zod.Utils.makeZodObjectSchema<
  Interfaces.RegisterWorkerRequestBody['slots'][number]
>({
  endTime: z.string().datetime(),
  startTime: z.string().datetime(),
}).strict();

const WorkerSchema = Infra.Zod.Utils.makeZodObjectSchema<
  Interfaces.RegisterWorkerRequestBody['worker']
>({
  socialNetworkUrl: z.string().url().optional(),
  tags: z.array(z.string()).min(1).nonempty().optional(),
}).strict();

export const RegisterWorkerSchema =
  Infra.Zod.Utils.makeZodObjectSchema<Interfaces.RegisterWorkerRequestBody>({
    recommendations: z.array(RecommendationsSchema).min(2).nonempty(),
    workerSkills: z.array(WorkerSkillsSchema).min(1).nonempty(),
    slots: z.array(SlotsSchema).min(1).nonempty(),
    worker: WorkerSchema,
  })
    .strict()
    .superRefine((data, ctx) => {
      if (data.recommendations.length < 2 * data.workerSkills.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least two recommendations must be provided for each skill.',
          path: ['skills'],
        });
      }

      if (data.slots.length < data.workerSkills.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one slot must be provided for each skill.',
          path: ['skills'],
        });
      }
    });
