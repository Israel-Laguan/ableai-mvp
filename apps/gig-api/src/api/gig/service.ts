import { UseCases } from '../../dependency-injection';
import { UpdateInput } from '../../interfaces';

export const gigService = {
  registerGigWork: UseCases.registerGigWork,

  registerGigWorkTeam: UseCases.registerGigWorkTeam,

  async updateUser(input: UpdateInput) {
    return await UseCases.updateUser(input);
  },
};
