import { IBase, APP_ROLE } from '../shared';

export interface Review extends IBase {
  review: string;
  appRole: APP_ROLE;
  userId: number;
}
