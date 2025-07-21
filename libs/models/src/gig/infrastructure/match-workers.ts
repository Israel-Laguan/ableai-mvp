import type { Skill, Slot, Statistic, Worker } from '..';

export interface MatchedWorker {
  skill: Skill;
  slots: Slot[];
  statistic: Omit<Statistic, 'userId'>;
  worker: Omit<Worker, 'userId'>;
}

export interface MatchWorkersInput {
  hourlyRate?: number;
  limit?: number;
  required?: string[];
  skills: string[];
  gigDate: Date;
  userIds: number[];
}
