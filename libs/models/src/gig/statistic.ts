import { IBase, APP_ROLE_TYPE } from '../shared';

export interface Statistic extends IBase {
  appRole?: APP_ROLE_TYPE | null;
  responseRate: number;
  userId: number;
  wouldWork: number;
}
