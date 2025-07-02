import { IBase } from '../shared';

export interface Slot extends IBase {
  workerId: number;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}
