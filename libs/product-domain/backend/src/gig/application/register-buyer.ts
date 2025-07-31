import { Constants, Interfaces, UseCases } from '../domain';
import { Errors } from '@shared';

type PgError = {
  code: string;
};

const PATH = 'REGISTER_BUYER_USE_CASE';

const {
  REGISTER_BUYER_REPOSITORIES: { BUYER_REPOSITORY },
} = Constants;

export function makeRegisterBuyerUseCase({
  runInTransaction,
}: Interfaces.MakeRegisterBuyerInput): UseCases.RegisterBuyer {
  return async input => {
    try {
      return await runInTransaction(async repositoryManager => {
        const buyerRepository = repositoryManager.getRepository(BUYER_REPOSITORY);
        const buyer = await buyerRepository.create(input);

        return { buyer };
      });
    } catch (e) {
      if ((e as PgError)?.code === '23505') {
        throw Errors.AlreadyExistError.create('Buyer already exists', PATH);
      }

      throw Errors.InternalServerError.create('Failed to register buyer', PATH);
    }
  };
}
