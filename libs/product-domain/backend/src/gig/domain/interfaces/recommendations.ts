import { Recommendation } from '@models/gig';
import { CreateEntityInput } from '@models/shared';

export type RegisterRecommendationInput = CreateEntityInput<Omit<Recommendation, 'workerId'>>;
