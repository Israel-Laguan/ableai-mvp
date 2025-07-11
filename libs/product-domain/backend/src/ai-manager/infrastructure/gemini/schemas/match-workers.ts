import type { FunctionDeclarationSchema, Schema } from '@google/generative-ai';

import { SchemaType } from '@google/generative-ai';

import type { Slot } from '@models/gig';
import type { Interfaces } from '../../../domain';
import type { TypedObjectSchema } from '../types';

export const MatchWorkersInputSchema: FunctionDeclarationSchema = {
  type: SchemaType.OBJECT,
  properties: {
    userId: {
      type: SchemaType.NUMBER,
      description: 'The id of the user to match workers for.',
    },
    distanceInKm: {
      type: SchemaType.NUMBER,
      description: 'The distance radius of the search.',
    },
    limit: {
      type: SchemaType.NUMBER,
      description: 'The maximum number of workers to return.',
    },
    skills: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        description: 'The skills to match workers for.',
      },
    },
    startDate: {
      type: SchemaType.STRING,
      description: 'The a valid timestamp start date for the workers availability.',
    },
    location: {
      type: SchemaType.OBJECT,
      properties: {
        longitude: {
          type: SchemaType.NUMBER,
        },
        latitude: {
          type: SchemaType.NUMBER,
        },
      },
    },
  },
  required: ['userId', 'skills', 'startDate'],
};

export const MatchWorkersOutputSchema: Schema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      skill: {
        type: SchemaType.OBJECT,
        properties: {
          badgesAwarded: {
            type: SchemaType.STRING,
          },
          equipment: {
            type: SchemaType.STRING,
          },
          experienceMonths: {
            type: SchemaType.INTEGER,
          },
          gigsCompleted: {
            type: SchemaType.INTEGER,
          },
          name: {
            type: SchemaType.STRING,
          },
          ratePerHour: {
            type: SchemaType.NUMBER,
          },
          summary: {
            type: SchemaType.STRING,
          },
          trainingDescription: {
            type: SchemaType.STRING,
          },
          videoUrl: {
            type: SchemaType.STRING,
          },
        },
      },

      slot: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            endTime: {
              type: SchemaType.STRING,
              description: 'The end time of the slot in ISO 8601 format.',
            },
            startTime: {
              type: SchemaType.STRING,
              description: 'The start time of the slot in ISO 8601 format.',
            },
          },
        } as TypedObjectSchema<Slot>,
      },

      statistic: {
        type: SchemaType.OBJECT,
        properties: {
          responseRate: {
            type: SchemaType.NUMBER,
          },
          wouldWork: {
            type: SchemaType.NUMBER,
          },
        },
      },

      worker: {
        type: SchemaType.OBJECT,
        properties: {
          id: {
            type: SchemaType.NUMBER,
          },
          feedbackSummary: {
            type: SchemaType.STRING,
          },
          socialNetworkUrl: {
            type: SchemaType.STRING,
          },
          tags: {
            type: SchemaType.STRING,
          },
        },
      },
    },
  } as TypedObjectSchema<Interfaces.MatchedWorker>,
};
