import { FirebaseUserRecord } from '../interfaces';

export type FirebaseRegisterUser<RegisterInputs> = (
  inputs: RegisterInputs
) => Promise<FirebaseUserRecord>;
