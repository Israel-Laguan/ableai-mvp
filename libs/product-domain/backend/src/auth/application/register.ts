import { Errors } from '@shared';
import { Infra } from '@models/auth';
import { UserRepository, PrivateDataUserRepository } from '../domain';

export const makeRegisterUserUseCase =
  (userRepository: UserRepository, privateDataUserRepository: PrivateDataUserRepository) =>
  async ({ email, password, fullName, phoneNumber = null }: Infra.RegisterInput) => {
    let userExist = null;

    if (email) {
      userExist = await privateDataUserRepository.getByEmail({ email });
    }

    if (userExist) {
      throw Errors.AlreadyExistError.create(
        `The user ${email} already exist`,
        'CREATE_USER_REPOSITORY'
      );
    }

    // TODO: Hashear el password
    // TODO: Add Handle Error Database Tolerance
    return privateDataUserRepository
      .create({ fullName, email, phoneNumber })
      .then(privateDataUser =>
        userRepository.create({ password, privateDataUserId: privateDataUser[0].id })
      )
      .catch(error => {
        // TODO: Add Throw Database Error
        // TODO: ADD Match for handle error types
        console.error(error);
      });
  };
