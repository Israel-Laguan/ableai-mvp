export type SafeAny<P = unknown> = {
  [K in keyof P]: P[K];
};
