import { IBase, JSONValue } from '../../shared';
import { MODERATION_STATUS } from '../../shared/constants';
import { CANCELLATION_PARTY, GIG_STATUS } from '../constants';

export interface Skill extends IBase {
  workerProfileId: number;
  name: string;
  experienceMonths: number;
  agreedRate: number;
  skillVideoUrl?: string | null;
  adminTags?: string[] | null;
}

export interface Qualification extends IBase {
  workerProfileId: number;
  title: string;
  institution?: string | null;
  yearAchieved?: number | null;
  description?: string | null;
  documentUrl?: string | null;
  isVerifiedByAdmin: boolean;
}

export interface Equipment extends IBase {
  workerProfileId: number;
  name: string;
  description?: string | null;
  isVerifiedByAdmin: boolean;
}

export interface Gig extends IBase {
  buyerUserId: number;
  workerUserId?: number | null;
  titleInternal: string;
  fullDescription?: string | null;
  exactLocation?: string | null;
  addressJson?: JSONValue | null;
  startTime: Date;
  endTime: Date;
  agreedRate: number;
  estimatedHours?: number | null;
  totalAgreedPrice?: number | null;
  statusInternal: GIG_STATUS;
  ableFeePercent?: number | null;
  stripeFeePercent?: number | null;
  stripeFeeFixed?: number | null;
  promoCodeApplied?: string | null;
  moderationStatus?: MODERATION_STATUS | null;
  cancellationReason?: string | null;
  cancellationParty?: CANCELLATION_PARTY | null;
  notesForWorker?: string | null;
  notesForBuyer?: string | null;
}

export interface GigSkillRequired extends IBase {
  gigId: number;
  skillName: string;
  isRequired: boolean;
  notes?: string | null;
}
