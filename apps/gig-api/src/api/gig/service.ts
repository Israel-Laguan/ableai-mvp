import { UseCases } from '../../dependency-injection';
import { UpdateInput } from '../../interfaces';

export const gigService = {
  getAllGigWorks: UseCases.getAllGigWorks,

  getOneGigWork: UseCases.getOneGigWork,

  registerGigWork: UseCases.registerGigWork,

  registerGigWorkTeam: UseCases.registerGigWorkTeam,

  async updateUser(input: UpdateInput) {
    return await UseCases.updateUser(input);
  },
};
