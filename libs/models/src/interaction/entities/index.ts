import { IBase, JSONValue } from '../../shared';
import { MODERATION_STATUS } from '../../shared/constants';
import { BADGE_TYPE, REVIEW_TYPE } from '../constants';

export interface Review extends IBase {
  gigId: number;
  authorUserId: number;
  targetUserId: number;
  rating: number;
  comment?: string | null;
  wouldWorkAgain?: boolean | null;
  awardedBadgeNamesToTargetJson?: JSONValue | null;
  isPublic: boolean;
  type: REVIEW_TYPE;
  moderationStatus: MODERATION_STATUS;
}

export interface BadgeDefinition extends IBase {
  name: string;
  description: string;
  iconUrlOrLucideName?: string | null;
  type: BADGE_TYPE;
  criteriaJson?: JSONValue | null;
}

export interface UserBadgeLink extends IBase {
  userId: number;
  badgeId: number;
  awardedAt: Date;
  awardedBySystem: boolean;
  awardedByUserId?: number | null;
  gigId?: number | null;
  notes?: number | null;
}

export interface ChatMessage extends IBase {
  gigId: number;
  senderUserId: number;
  text: string;
  imageUrl?: string | null;
  isReadByReceiver: boolean;
  moderationStatus: MODERATION_STATUS;
}
