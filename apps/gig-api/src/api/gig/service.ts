import { UseCases } from '../../dependency-injection';
import { UpdateInput } from '../../interfaces';

export const gigService = {
  registerGigWork: UseCases.registerGigWork,

  async updateUser(input: UpdateInput) {
    return await UseCases.updateUser(input);
  },
};
