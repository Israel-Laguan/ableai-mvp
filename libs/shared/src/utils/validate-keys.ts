export function makeValidateKeys<T extends object>(keys: (keyof T)[] | readonly (keyof T)[]) {
  return (obj: unknown) => {
    const result = {
      success: false,
      data: null as T | null,
    };

    if (typeof obj !== 'object' || obj === null) {
      return result;
    }

    const success = keys.every(key => key in obj);

    if (success) {
      result.success = true;
      result.data = obj as T;
    }

    return result;
  };
}
