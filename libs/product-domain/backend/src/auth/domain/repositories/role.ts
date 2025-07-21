import type { Role } from '@models/auth';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type RoleRepository = ISQLCustomRepository<Role>;

export type RoleRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, Role>;
