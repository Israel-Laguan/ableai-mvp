export interface RepositoryManager<Repositories extends Record<string, object>> {
  getRepository: <K extends keyof Repositories>(repositoryName: K) => Repositories[K];
}

export type Work<Repositories extends Record<string, object>, R = unknown> = (
  repositoryManager: RepositoryManager<Repositories>
) => Promise<R>;

export type RunInTransaction<Repositories extends Record<string, object>, R = unknown> = (
  work: Work<Repositories, R>
) => Promise<R>;
