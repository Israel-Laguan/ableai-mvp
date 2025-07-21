import type { ToolManager } from '../../types';

export function MakeRetrieveRawData<T>(
  name: string,
  description: string,
  data: T
): ToolManager<undefined, undefined, T> {
  return {
    definition: {
      name,
      description,
    },

    execute: async () => {
      return data;
    },
  };
}
