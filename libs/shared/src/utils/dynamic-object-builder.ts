interface MakeDynamicObjectBuilderConfig<CustomObject extends object = object> {
  /**
   * Keys of the object that will be used to build the dynamic object.
   */
  admittedKeys: (keyof CustomObject)[];
  admittedFalsyKeys?: (keyof CustomObject)[];
}

type BuildObjectDynamically<CustomObject extends object> = (
  input?: Partial<CustomObject>
) => Partial<CustomObject> | null;

export function makeBuildObjectDynamically<CustomObject extends object = object>({
  admittedKeys,
  admittedFalsyKeys = [],
}: MakeDynamicObjectBuilderConfig<CustomObject>): BuildObjectDynamically<CustomObject> {
  const filter =
    admittedFalsyKeys.length > 0
      ? ([key, value]: [keyof CustomObject, unknown]) =>
          admittedKeys.includes(key) && (value || admittedFalsyKeys.includes(key))
      : ([key, value]: [keyof CustomObject, unknown]) => admittedKeys.includes(key) && !!value;

  return input => {
    if (!input || typeof input !== 'object') {
      return null;
    }

    const result = Object.fromEntries(
      Object.entries(input).filter(entries => filter(entries as [keyof CustomObject, unknown]))
    );

    return Object.keys(result).length > 0 ? (result as Partial<CustomObject>) : null;
  };
}
