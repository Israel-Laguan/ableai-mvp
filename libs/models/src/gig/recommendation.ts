import { IBase } from '../shared';

export interface Recommendations extends IBase {
  isExternal: boolean;
  name: string;
  recommendation: string;
  userId: number;
  workerId: number;
}
