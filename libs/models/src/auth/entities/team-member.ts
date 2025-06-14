import { JSONValue } from '../../shared';
import { IBase } from '../../shared/base';

export interface TeamMember extends IBase {
  buyerProfileId: number;
  memberUserId?: number | null;
  roleInTeam?: string | null;
  permissionsJson?: JSONValue | null;
}
