import { IBase } from '../shared';

export interface Review extends IBase {
  review: string;
  userId: number;
}
