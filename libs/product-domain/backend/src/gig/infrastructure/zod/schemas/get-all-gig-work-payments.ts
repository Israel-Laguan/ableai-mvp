import { Infra } from '../../../../shared';

export const GetAllGigWorkPaymentsSchema = Infra.Zod.Utils.makeGetAllSchema({
  validSortFields: [],
});
