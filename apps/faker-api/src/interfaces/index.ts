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
  Statistic,
  Worker,
} from '@models/gig';
import type { IOmitBase } from '@models/shared';

export type FakeBuyer = Partial<Omit<Buyer, IOmitBase>> & Pick<Buyer, 'userId'>;

export type FakeGigWork = Omit<GigWork, IOmitBase>;

export type FakeGigWorkTeam = Omit<GigWorkTeam, IOmitBase>;

export type FakePrivateDataUser = Omit<PrivateDataUser, IOmitBase>;

export type FakeRecommendation = Omit<Recommendation, IOmitBase>;

export type FakeReview = Omit<Review, IOmitBase>;

export type FakeSkill = Omit<Skill, IOmitBase>;

export type FakeSkillHire = Omit<SkillHire, IOmitBase>;

export type FakeSlot = Omit<Slot, IOmitBase>;

export type FakeStatistic = Omit<Statistic, IOmitBase>;

export type FakeUser = Omit<User, IOmitBase>;

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
  statistic?: FakeStatistic;
  user?: FakeUser;
  worker?: FakeWorker;
}
