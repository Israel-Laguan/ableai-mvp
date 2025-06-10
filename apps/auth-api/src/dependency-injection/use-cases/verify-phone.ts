import { Auth } from '@product-domain/backend';
import { VerifyPhoneNumberInputs } from '../../interfaces';
import { privateDataUserRepository } from '../repositories';
import { firebaseService } from '../services';

export const verifyPhone = Auth.App.MakeVerifyPhoneNumberUseCase<VerifyPhoneNumberInputs>({
  privateDataUserRepository,
  runInPhoneVerification: async input => {
    return await firebaseService.verifyPhone(input);
  },
});
