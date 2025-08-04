import { Infra } from '../../../../shared';
import { Constants } from '../../../domain';

export const GetAllGigWorksSchema = Infra.Zod.Utils.makeGetAllSchema({
  validSortFields: Constants.VALID_GIG_WORK_SORT_FIELDS,
});
