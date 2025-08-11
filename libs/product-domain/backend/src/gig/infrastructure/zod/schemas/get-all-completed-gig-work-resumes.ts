import { Infra } from '../../../../shared';

export const GetAllCompletedGigWorkResumesSchema = Infra.Zod.Utils.makeGetAllSchema({
  validSortFields: [],
});
