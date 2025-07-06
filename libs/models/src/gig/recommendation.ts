import { IBase } from '../shared';

export interface Recommendation extends IBase {
  isExternal: boolean;
  name: string;
  recommendation: string;
  userId?: number | null;
  workerId: number;
}
