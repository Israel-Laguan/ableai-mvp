import { Auth } from '@product-domain/backend';
import { verifyPhoneNumberInputs } from '../../interfaces';
import { privateDataUserRepository } from '../repositories';
import { firebaseService } from '../services';

export const verifyPhone = Auth.App.MakeVerifyPhoneNumberUseCase<verifyPhoneNumberInputs>({
  privateDataUserRepository,
  runInPhoneVerification: async input => {
    return await firebaseService.verifyPhone(input);
  },
});
