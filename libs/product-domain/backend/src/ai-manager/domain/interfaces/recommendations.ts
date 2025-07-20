import { Constants } from '..';

export type RecommendationType = (typeof Constants.RECOMMENDATION_TYPES)[number];

export interface Recommendations {
  recommendation: string;
  type: RecommendationType;
}

export interface RecommendationsServerArgs {
  userId: number;
}
