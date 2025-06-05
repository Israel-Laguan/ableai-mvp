import { Auth } from '@product-domain/backend';
import { FirebaseCustomToken } from '../../interfaces';
import { privateDataUserRepository } from '../repositories';
import { firebaseService } from '../services';

export const verifyPhone = Auth.App.MakeVerifyPhoneNumberUseCase<
  FirebaseCustomToken,
  FirebaseCustomToken
>({
  privateDataUserRepository,
  runInPhoneVerification: async input => {
    return await firebaseService.verifyPhone(input);
  },
});
