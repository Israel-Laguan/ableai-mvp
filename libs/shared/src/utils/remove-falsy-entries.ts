export function removeFalsyEntries(rawObj?: object): object {
  const okObj: Record<string, unknown> = {};

  if (!rawObj || typeof rawObj !== 'object') {
    return okObj;
  }

  Object.entries(rawObj).forEach(([key, value]) => {
    if (value) {
      okObj[key] = value;
    }
  });

  return okObj;
}
