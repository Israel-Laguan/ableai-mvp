import type { Worker } from '@models/gig';
import type { Interfaces, UseCases } from '../domain';

import { Skill, Statistic } from '@models/gig';
import { Errors } from '@shared';

const PATH = 'MATCH_WORKER';

export function makeMatchWorkersUseCase({
  privateDataUserRepository,
  skillRepository,
  userRepository,
  slotRepository,
  statisticRepository,
  workerRepository,
}: Interfaces.MakeMatchWorkersConfig): UseCases.MatchWorkers {
  return async input => {
    const { userId, distanceInKm = 10, limit = 5, skills, startDate } = input;

    const user = await userRepository.getById(String(userId));

    if (!user) {
      throw Errors.NotFoundResourceError.create('User not found', PATH);
    }

    const nearUsers = await privateDataUserRepository.findNearUsers(
      String(user.privateDataUserId),
      distanceInKm
    );

    if (nearUsers.length === 0) {
      return [];
    }

    const privateDataUserIds = nearUsers.map(({ id }) => id);

    const users = (
      await userRepository.getAll({
        where: {
          fields: [{ field: 'privateDataUserId', value: privateDataUserIds }],
        },
      })
    ).results;

    if (users.length === 0) {
      return [];
    }

    const userIds = users.map(({ id }) => id);

    const workers = (
      await workerRepository.getAll({
        where: {
          fields: [{ field: 'userId', value: userIds }],
        },
      })
    ).results;

    if (workers.length === 0) {
      return [];
    }

    const workerIds = workers.map(({ id }) => id);

    const matchedSkills = (
      await skillRepository.getAll({
        where: {
          fields: [
            { field: 'workerId', value: workerIds },
            { field: 'name', value: skills },
          ],
        },
      })
    ).results;

    if (matchedSkills.length === 0) {
      return [];
    }

    const matchedSkillWorkerIds = matchedSkills.map(({ workerId }) => workerId);

    const slots = (
      await slotRepository.getAll({
        where: {
          fields: [
            { field: 'workerId', value: matchedSkillWorkerIds },
            { field: 'isAvailable', value: true },
          ],
        },
      })
    ).results;

    if (slots.length === 0) {
      return [];
    }

    const newStartDate = new Date(startDate);

    const matchedSlots = slots.filter(({ startTime, endTime }) => {
      const start = new Date(startTime);
      const end = new Date(endTime);

      return start <= newStartDate && newStartDate <= end;
    });

    if (matchedSlots.length === 0) {
      return [];
    }

    const availableWorkerIds = matchedSlots.map(({ workerId }) => workerId);

    const availableSkills = matchedSkills.filter(({ workerId }) =>
      availableWorkerIds.includes(workerId)
    );

    const skillWorkerIds = availableSkills.map(({ workerId }) => workerId);

    const availableUserIds = workers
      .filter(({ id }) => skillWorkerIds.includes(id))
      .map(({ userId }) => userId);

    const statistics = (
      await statisticRepository.getAll({
        where: {
          fields: [{ field: 'userId', value: availableUserIds }],
        },
      })
    ).results;

    const sortTable: Record<
      keyof (Pick<Skill, 'experienceMonth' | 'gigsCompleted'> & Pick<Statistic, 'wouldWork'>),
      number[]
    > = {
      experienceMonth: [],
      gigsCompleted: [],
      wouldWork: [],
    };

    availableSkills
      .sort((a, b) => b.experienceMonth - a.experienceMonth)
      .forEach(({ workerId }) => {
        sortTable.experienceMonth.push(workerId);
      });

    availableSkills
      .sort((a, b) => b.gigsCompleted - a.gigsCompleted)
      .forEach(({ workerId }) => {
        sortTable.gigsCompleted.push(workerId);
      });

    const filteredWorkers = workers.filter(({ id }) => skillWorkerIds.includes(id));

    const workerByUserIdMap = new Map<number, Worker>();
    const workerByIdMap = new Map<number, Worker>();

    for (const worker of filteredWorkers) {
      workerByUserIdMap.set(worker.userId, worker);
      workerByIdMap.set(worker.id, worker);
    }

    statistics
      .sort((a, b) => b.wouldWork - a.wouldWork)
      .forEach(({ userId }) => {
        const workerId = (workerByUserIdMap.get(userId) as Worker).id;
        sortTable.wouldWork.push(workerId);
      });

    const ranking = new Map<number, number>();

    for (const workerId of skillWorkerIds) {
      ranking.set(workerId, 0);
    }

    const maxScore = skillWorkerIds.length;

    const setScores = (sortField: number[]) => {
      sortField.forEach((workerId, i) => {
        const currentScore = ranking.get(workerId) as number;
        ranking.set(workerId, currentScore + maxScore - i);
      });
    };

    setScores(sortTable.experienceMonth);
    setScores(sortTable.gigsCompleted);
    setScores(sortTable.wouldWork);

    const rankingArray: { score: number; workerId: number }[] = [];

    ranking.forEach((score, workerId) => {
      rankingArray.push({ score, workerId });
    });

    const sortedRanking = rankingArray.sort((a, b) => b.score - a.score);

    const matchedWorkers: Interfaces.MatchedWorker[] = [];

    const maxLoops = sortedRanking.length > limit ? limit : sortedRanking.length;

    let loopsCount = 0;

    while (loopsCount < maxLoops) {
      const workerId = sortedRanking[loopsCount].workerId;

      loopsCount++;

      const worker = workerByIdMap.get(workerId) as Worker;

      const skill = availableSkills.find(
        ({ workerId: skillWorkerId }) => skillWorkerId === workerId
      ) as Skill;

      const slot = matchedSlots.filter(({ workerId: slotWorkerId }) => slotWorkerId === workerId);

      const statistic = statistics.find(({ userId }) => userId === worker.userId) as Statistic;

      if (!statistic) {
        console.warn(`No statistic found for userId: ${worker.userId}`);
        continue;
      }

      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { userId: _1, ...retrievedStatistic } = statistic;
      const { userId: _2, ...retrievedWorker } = worker;
      /* eslint-enable @typescript-eslint/no-unused-vars */

      const matchedWorker: Interfaces.MatchedWorker = {
        skill,
        slot,
        statistic: retrievedStatistic,
        worker: retrievedWorker,
      };

      matchedWorkers.push(matchedWorker);
    }

    return matchedWorkers;
  };
}
