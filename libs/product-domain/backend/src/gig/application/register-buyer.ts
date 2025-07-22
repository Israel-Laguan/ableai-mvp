import { APP_ROLE } from '@models/shared';
import { Constants, Interfaces, UseCases } from '../domain';

const {
  REGISTER_BUYER_REPOSITORIES: { BUYER_REPOSITORY, STATISTIC_REPOSITORY },
} = Constants;

export function makeRegisterBuyerUseCase({
  runInTransaction,
}: Interfaces.MakeRegisterBuyerInput): UseCases.RegisterBuyer {
  return async input => {
    return await runInTransaction(async repositoryManager => {
      const buyerRepository = repositoryManager.getRepository(BUYER_REPOSITORY);
      const statisticRepository = repositoryManager.getRepository(STATISTIC_REPOSITORY);
      const [buyer] = await buyerRepository.create(input);
      const statistic = await statisticRepository.create({
        appRole: APP_ROLE.BUYER,
        userId: input.userId,
      });

      return { buyer, statistic };
    });
  };
}
