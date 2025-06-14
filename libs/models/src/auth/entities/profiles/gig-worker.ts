import { IBase, JSONValue } from '../../../shared';

export interface GigWorkerProfile extends IBase {
  userId: number;
  fullBio?: string | null;
  privateNotes?: string | null;
  responseRateInternal?: number | null;
  availabilityJson?: JSONValue | null;
  semanticProfileJson?: JSONValue | null;
}
