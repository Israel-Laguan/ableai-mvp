import { UseCases } from '../../dependency-injection';
import { UpdateInput } from '../../interfaces';

export const gigService = {
  acceptGigWorkTeam: UseCases.acceptOrRejectGigWorkTeam,

  getAllGigWorks: UseCases.getAllGigWorks,

  getAllGigWorkPayments: UseCases.getAllGigWorkPayments,

  getAllGigWorkTeams: UseCases.getAllGigWorkTeams,

  getOneGigWork: UseCases.getOneGigWork,

  getOneGigWorkTeam: UseCases.getOneGigWorkTeam,

  registerGigWork: UseCases.registerGigWork,

  registerGigWorkTeam: UseCases.registerGigWorkTeam,

  updateGigWorkTeamPayment: UseCases.updateGigWorkTeamPayment,

  updateGigWorkTeamStatus: UseCases.updateGigWorkTeamStatus,

  async updateUser(input: UpdateInput) {
    return await UseCases.updateUser(input);
  },
};
