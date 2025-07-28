import type { PrivateDataUser, User } from '@models/auth';
import {
  Buyer,
  GigWork,
  GigWorkTeam,
  Recommendation,
  Review,
  Skill,
  SkillHire,
  Slot,
  Worker,
} from '@models/gig';
import type { IOmitBase } from '@models/shared';

export type FakeBuyer = Partial<Omit<Buyer, IOmitBase>> & Pick<Buyer, 'userId'>;

export type FakeGigWork = Omit<GigWork, IOmitBase>;
export type FakeGigWorkInput = Partial<FakeGigWork> & Pick<GigWork, 'buyerId'>;

export type FakeGigWorkTeam = Omit<GigWorkTeam, IOmitBase>;
export type FakeGigWorkTeamInput = Partial<FakeGigWorkTeam> &
  Pick<GigWorkTeam, 'gigWorkId' | 'workerId' | 'delegateTo' | 'skillId'>;

export type FakePrivateDataUser = Omit<PrivateDataUser, IOmitBase>;

export type FakeRecommendation = Omit<Recommendation, IOmitBase>;
export type FakeRecommendationInput = Partial<FakeRecommendation> &
  Pick<Recommendation, 'userId' | 'workerId'>;

export type FakeReview = Omit<Review, IOmitBase>;
export type FakeReviewInput = Partial<FakeReview> & Pick<Review, 'userId'>;

export type FakeSkill = Omit<Skill, IOmitBase>;
export type FakeSkillInput = Partial<FakeSkill> & Pick<Skill, 'workerId'>;

export type FakeSkillHire = Omit<SkillHire, IOmitBase>;
export type FakeSkillHireInput = Partial<FakeSkillHire> & Pick<SkillHire, 'buyerId'>;

export type FakeSlot = Omit<Slot, IOmitBase>;
export type FakeSlotInput = Partial<FakeSlot> & Pick<Slot, 'workerId'>;

export type FakeUser = Omit<User, IOmitBase>;
export type FakerUserInput = Partial<FakeUser> & Pick<User, 'privateDataUserId'>;

export type FakeWorker = Partial<Omit<Worker, IOmitBase>> & Pick<Worker, 'userId'>;

export interface FakeUserData {
  buyer?: FakeBuyer;
  gigWork?: FakeGigWork;
  gigWorkTeam?: FakeGigWorkTeam;
  privateDataUser?: FakePrivateDataUser;
  recommendation?: FakeRecommendation;
  review?: FakeReview;
  skill?: FakeSkill;
  skillHire?: FakeSkillHire;
  slot?: FakeSlot;
  user?: FakeUser;
  worker?: FakeWorker;
}

export interface GenerateFakeWorkersInput {
  limit: number;
}
