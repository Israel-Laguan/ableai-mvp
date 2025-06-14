import { IBase } from '../../shared/base';
import { ROLES } from '../constants';

export interface Role extends IBase {
  role: ROLES;
}
