import z from 'zod';

import { ISQLCustomRepository, SafeAny } from '@models/shared';
import { Errors } from '@shared';
import { Drizzle } from '../../../domain';
import { Schemas } from '../../zod';

type TransactionRepositoryConfig = Pick<
  Drizzle.Repositories.BaseRepositoryConfig,
  'db' | 'repositoryMaker' | 'repositoryName'
>;

type TransactionRepositoryStack = TransactionRepositoryConfig[];

type AnyCustomRepository = ISQLCustomRepository<SafeAny, SafeAny>;

type RepositoryMap = Map<string, AnyCustomRepository>;

interface RepositoryManager {
  getRepository: <Repository>(repositoryName: string) => Repository;
}

function executeRollback(rollbackStack: (() => never)[], error?: unknown): never {
  if (rollbackStack.length > 0) rollbackStack.forEach(rollback => rollback());
  throw Errors.InternalServerError.create('Transaction failed', 'DRIZZLE_TRANSACTION', error);
}

function makeRepositoryManager(repositoryMap: RepositoryMap) {
  const repositoryManager: RepositoryManager = {
    getRepository: <Repository>(repositoryName: string): Repository => {
      const repository = repositoryMap.get(repositoryName);
      if (!repository) {
        throw Errors.InternalServerError.create(
          `Repository for schema ${repositoryName} not found`,
          'DRIZZLE_TRANSACTION'
        );
      }
      return repository as Repository;
    },
  };

  return repositoryManager;
}

const { NodePgDatabaseSchema } = Schemas;

export function makeDrizzleUnitOfWork(
  repositories: TransactionRepositoryStack
): (
  work: (repositoryManager: RepositoryManager) => Promise<{ success: boolean }>
) => Promise<{ success: boolean }> {
  repositories.forEach(({ db: em, repositoryMaker, repositoryName }) => {
    let success = false;

    success = NodePgDatabaseSchema.safeParse(em).success;
    success = z.function().safeParse(repositoryMaker).success;
    success = z.string().safeParse(repositoryName).success;

    if (!success) {
      throw Errors.InternalServerError.create(
        'Invalid repository configuration',
        'DRIZZLE_TRANSACTION'
      );
    }
  });

  const execute = async (
    work: (repositoryManager: RepositoryManager) => Promise<{ success: boolean }>,
    repositoryMap: RepositoryMap = new Map(),
    rollbackStack: (() => never)[] = [],
    stackIndex = 0
  ): Promise<{ success: boolean }> => {
    if (repositoryMap.size !== repositories.length) {
      const { db: em, repositoryName, repositoryMaker } = repositories[stackIndex];
      try {
        // Start a new transaction
        return await em.transaction(async tx => {
          const repository = repositoryMaker({
            db: tx,
          }) as AnyCustomRepository;

          repositoryMap.set(repositoryName, repository);
          rollbackStack.push(tx.rollback);

          return await execute(work, repositoryMap, rollbackStack, stackIndex + 1);
        });
      } catch (error) {
        executeRollback(rollbackStack, error);
      }
    }

    try {
      return await work(makeRepositoryManager(repositoryMap));
    } catch (error) {
      executeRollback(rollbackStack, error);
    }
  };

  return (work: (repositoryManager: RepositoryManager) => Promise<{ success: boolean }>) =>
    execute(work);
}

/* displayName,
avatarUrl,
lastAppRole: WORKER | BUYER,
lastViewBuyer,
lastViewWorker */
