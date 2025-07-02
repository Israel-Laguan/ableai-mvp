export enum AUTH_DICTIONARY {
  USER_REPOSITORY = 'USER_REPOSITORY',
  PRIVATE_USER_DATA_REPOSITORY = 'PRIVATE_USER_DATA_REPOSITORY',
}

export enum AUTH_ERROR_MESSAGES {
  ALREADY_EXIST_MESSAGE = `User already exists.`,
  COULD_NOT_HASH_MESSAGE = `Could not hash the password.`,
  ERROR_MESSAGE = `An error occurred during the authentication process.`,
  INVALID_CREDENTIALS_MESSAGE = `Incorrect email or password`,
  INVALID_PHONE_NUMBER_MESSAGE = `Invalid phone number.`,
  PRIVATE_DATA_USER_CREATION_FAILED_MESSAGE = `Could not create the user private data.`,
  USER_CREATION_FAILED_MESSAGE = `Could not create the user.`,
  TO_MANY_ATTEMPTS_MESSAGE = `Your account is temporarily locked due to multiple failed attempts. Please try again in 15 minutes or reset your password.`,
  WEAK_PASSWORD_MESSAGE = 'Weak password. Please choose a stronger password.',
}
