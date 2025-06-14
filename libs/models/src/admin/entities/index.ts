import { IBase } from '../../shared/base';
import { JSONValue } from '../../shared/basic-types';

export interface AdminLog extends IBase {
  adminUserId: number;
  action: string;
  targetEntityType?: string | null;
  targetEntityId?: string | null;
  detailsJson?: JSONValue | null; // JSONB
  ipAddress?: string | null;
}
