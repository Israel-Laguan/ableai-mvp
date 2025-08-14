export type InterfaceToRecord<P extends object> = {
  [K in keyof P]: P[K];
};
