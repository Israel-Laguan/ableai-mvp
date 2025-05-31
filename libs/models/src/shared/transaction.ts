export interface RepositoryManager<Repositories> {
  getRepository: (repositoryName: string) => Repositories;
}

export type Work<Repositories> = (
  repositoryManager: RepositoryManager<Repositories>
) => Promise<{ success: boolean }>;

export type RunInTransaction<Repositories> = (
  work: Work<Repositories>
) => Promise<{ success: boolean }>;
