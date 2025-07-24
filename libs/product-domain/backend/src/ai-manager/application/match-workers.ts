import { Errors } from '@shared';
import type { Interfaces, UseCases } from '../domain';

const PATH = 'MATCH_WORKERS';

export function makeMatchWorkersUseCase({
  privateDataUserRepository,
  userRepository,
  workerRepository,
}: Interfaces.MakeMatchWorkersConfig): UseCases.MatchWorkers {
  return async input => {
    const {
      discardedWorkers,
      radius = 10,
      hourlyRate,
      latitude,
      limit = 5,
      longitude,
      offset,
      skills,
      gigDate,
      required,
    } = input;
    try {
      const privateDataUserIds = await privateDataUserRepository.getNearPrivateDataUserIds(
        latitude,
        longitude,
        radius
      );

      if (privateDataUserIds.length === 0) {
        return [];
      }

      const userIds = await userRepository.findUserIdsByPrivateDataUserIds(privateDataUserIds);

      if (userIds.length === 0) {
        return [];
      }

      return await workerRepository.matchWorkers({
        discardedWorkers,
        gigDate: new Date(gigDate),
        offset,
        skills,
        userIds,
        hourlyRate,
        limit,
        required,
      });
    } catch (error) {
      throw Errors.InternalServerError.create(
        error instanceof Error ? error.message : String(error),
        PATH
      );
    }
  };
}
