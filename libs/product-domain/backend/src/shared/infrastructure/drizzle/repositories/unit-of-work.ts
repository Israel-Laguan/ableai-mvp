import z from 'zod';

import type { Transaction } from '@models/shared';
import { Errors } from '@shared';
import { Drizzle } from '../../../domain';
import { Schemas } from '../../zod';

type TransactionRepositoryConfig<
  Repository extends object,
  RepositoryName extends string | number | symbol = string
> = Pick<
  Drizzle.Repositories.BaseRepositoryConfig<Repository, RepositoryName>,
  'db' | 'repositoryMaker' | 'repositoryName'
>;

type RepositoryMap<Repositories extends Record<string, object>> = Map<
  keyof Repositories,
  Repositories[keyof Repositories]
>;

const { throwError } = Errors.makeErrorRunner<
  Partial<TransactionRepositoryConfig<Record<string, unknown>>>
>({
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

function makeRepositoryManager<Repositories extends Record<string, object>>(
  repositoryMap: RepositoryMap<Repositories>
) {
  const repositoryManager: Transaction.RepositoryManager<Repositories> = {
    getRepository: <K extends keyof Repositories>(repositoryName: K): Repositories[K] => {
      const repository = repositoryMap.get(repositoryName);

      if (!repository) {
        throwError('repository-not-found', { repositoryName: String(repositoryName) });
      }

      return repository as Repositories[K];
    },
  };

  return repositoryManager;
}

const { NodePgDatabaseSchema } = Schemas;

export function makeDrizzleUnitOfWork<Repositories extends Record<string, object>, R = unknown>(
  repositories: TransactionRepositoryConfig<Repositories[keyof Repositories], keyof Repositories>[]
): Transaction.RunInTransaction<Repositories, R> {
  repositories.forEach(({ db, repositoryMaker, repositoryName }) => {
    const isValidDb = NodePgDatabaseSchema.safeParse(db).success;
    const isValidRepositoryMaker = z.function().safeParse(repositoryMaker).success;
    const isValidRepositoryName = z.string().safeParse(repositoryName).success;

    if (!isValidDb || !isValidRepositoryMaker || !isValidRepositoryName) {
      throwError('invalid-repository-config', {
        repositoryName: String(repositoryName),
      });
    }
  });

  const execute = async (
    work: Transaction.Work<Repositories, R>,
    repositoryMap: RepositoryMap<Repositories> = new Map(),
    rollbackStack: (() => never)[] = [],
    stackIndex = 0
  ): Promise<R> => {
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
