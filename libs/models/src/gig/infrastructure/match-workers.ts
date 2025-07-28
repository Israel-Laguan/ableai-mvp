import type { Skill, Slot, Worker } from '..';

export interface MatchedWorker {
  skill: Skill;
  slots: Slot[];
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
