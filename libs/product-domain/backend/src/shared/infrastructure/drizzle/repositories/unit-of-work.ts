import z from 'zod';

import type { Transaction } from '@models/shared';
import { Errors } from '@shared';
import { Drizzle } from '../../../domain';
import { Schemas } from '../../zod';

type TransactionRepositoryConfig<Repository> = Pick<
  Drizzle.Repositories.BaseRepositoryConfig<Repository>,
  'db' | 'repositoryMaker' | 'repositoryName'
>;

type RepositoryMap<Repositories> = Map<string, Repositories>;

const { throwError } = Errors.makeErrorRunner<Partial<TransactionRepositoryConfig<unknown>>>({
  'invalid-repository-config': ({ repositoryName }) => {
    return Errors.InternalServerError.create(
      `Invalid repository configuration:
      ${repositoryName ? `Repository name: ${repositoryName}` : 'No repository name provided'}`,
      'DRIZZLE_TRANSACTION'
    );
  },

  'repository-not-found': ({ repositoryName }) =>
    Errors.InternalServerError.create(
      `Repository for schema ${repositoryName} not found`,
      'DRIZZLE_TRANSACTION'
    ),

  'rollback-error': () =>
    Errors.InternalServerError.create(
      'Rollback Error: The rollback stack is empty.',
      'DRIZZLE_TRANSACTION'
    ),
});

function executeRollback(rollbackStack: (() => never)[]): void {
  if (rollbackStack.length > 0) {
    return rollbackStack.forEach(rollback => {
      try {
        rollback();
      } catch {
        return;
      }
    });
  }
  throwError('rollback-error');
}

function makeRepositoryManager<Repositories>(repositoryMap: RepositoryMap<Repositories>) {
  const repositoryManager: Transaction.RepositoryManager<Repositories> = {
    getRepository: (repositoryName: string): Repositories => {
      const repository = repositoryMap.get(repositoryName);

      if (!repository) {
        throwError('repository-not-found', { repositoryName });
      }

      return repository as Repositories;
    },
  };

  return repositoryManager;
}

const { NodePgDatabaseSchema } = Schemas;

export function makeDrizzleUnitOfWork<Repositories>(
  repositories: TransactionRepositoryConfig<Repositories>[]
): Transaction.RunInTransaction<Repositories> {
  repositories.forEach(({ db, repositoryMaker, repositoryName }) => {
    const isValidDb = NodePgDatabaseSchema.safeParse(db).success;
    const isValidRepositoryMaker = z.function().safeParse(repositoryMaker).success;
    const isValidRepositoryName = z.string().safeParse(repositoryName).success;

    if (!isValidDb || !isValidRepositoryMaker || !isValidRepositoryName) {
      throwError('invalid-repository-config', {
        repositoryName,
      });
    }
  });

  const execute = async (
    work: Transaction.Work<Repositories>,
    repositoryMap: RepositoryMap<Repositories> = new Map(),
    rollbackStack: (() => never)[] = [],
    stackIndex = 0
  ): Promise<{ success: boolean }> => {
    if (repositoryMap.size !== repositories.length) {
      const { db, repositoryName, repositoryMaker } = repositories[stackIndex];
      try {
        return await db.transaction(async tx => {
          const repository = repositoryMaker({
            db: tx,
          });

          repositoryMap.set(repositoryName, repository);
          rollbackStack.push(tx.rollback);

          return await execute(work, repositoryMap, rollbackStack, stackIndex + 1);
        });
      } catch (error) {
        executeRollback(rollbackStack);
        throw error;
      }
    }

    try {
      return await work(makeRepositoryManager(repositoryMap));
    } catch (error) {
      executeRollback(rollbackStack);
      throw error;
    }
  };

  return work => execute(work);
}
