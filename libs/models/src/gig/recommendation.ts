import { IBase } from '../shared';

export interface Recommendations extends IBase {
  isExternal: boolean; // false
  name: string;
  recommendation: string;
  userId?: number;
  workerId: number;
}
