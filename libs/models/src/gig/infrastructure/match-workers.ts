import type { Skill, Slot, Statistic, Worker } from '..';

export interface MatchedWorker {
  skill: Skill;
  slots: Slot[];
  statistic: Omit<Statistic, 'userId'>;
  worker: Omit<Worker, 'userId'>;
}

export interface MatchWorkersInput {
  discardedWorkers?: number[];
  hourlyRate?: number;
  limit?: number;
  offset?: number;
  required?: string[];
  skills: string[];
  gigDate: Date;
  userIds: number[];
}
