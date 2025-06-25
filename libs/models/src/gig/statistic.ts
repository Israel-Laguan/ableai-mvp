import { IBase, APP_ROLE_TYPE } from '../shared';

export interface Statistic extends IBase {
  appRole?: APP_ROLE_TYPE | null;
  responseRate: number; // 100
  userId: number;
  wouldWork: number; // 100
}
