import { APP_ROLE } from '@models/shared';
import { Constants, Interfaces, UseCases } from '../domain';
import { Errors } from '@shared';

type PgError = {
  code: string;
};

const PATH = 'REGISTER_BUYER_USE_CASE';

const {
  REGISTER_BUYER_REPOSITORIES: { BUYER_REPOSITORY, STATISTIC_REPOSITORY },
} = Constants;

export function makeRegisterBuyerUseCase({
  runInTransaction,
}: Interfaces.MakeRegisterBuyerInput): UseCases.RegisterBuyer {
  return async input => {
    try {
      return await runInTransaction(async repositoryManager => {
        const buyerRepository = repositoryManager.getRepository(BUYER_REPOSITORY);
        const statisticRepository = repositoryManager.getRepository(STATISTIC_REPOSITORY);
        const [[buyer], statistic] = await Promise.all([
          buyerRepository.create(input),
          statisticRepository.create({
            appRole: APP_ROLE.BUYER,
            userId: input.userId,
          }),
        ]);

        return { buyer, statistic };
      });
    } catch (e) {
      if ((e as PgError)?.code === '23505') {
        throw Errors.AlreadyExistError.create('Buyer already exists', PATH);
      }

      throw Errors.InternalServerError.create('Failed to register buyer', PATH);
    }
  };
}
