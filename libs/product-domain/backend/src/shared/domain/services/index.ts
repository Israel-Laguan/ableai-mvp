export * from './firebase';

export type VerifyToken<R> = (token: string) => R;
