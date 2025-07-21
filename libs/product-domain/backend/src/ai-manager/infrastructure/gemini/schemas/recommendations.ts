import type { Schema } from '@google/generative-ai';

import { SchemaType } from '@google/generative-ai';

import type { Interfaces } from '../../../domain';

import { Constants } from '../../../domain';
import { TypedObjectSchema } from '../types';

export const RecommendationOutputSchema: Schema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      recommendation: {
        type: SchemaType.STRING,
        description: 'The recommendation text provided by the AI model.',
      },
      type: {
        type: SchemaType.STRING,
        description: `The type of recommendation. This must be one of the following: ${Constants.RECOMMENDATION_TYPES.toString()}`,
      },
    },
  } as TypedObjectSchema<Interfaces.Recommendations>,
};
