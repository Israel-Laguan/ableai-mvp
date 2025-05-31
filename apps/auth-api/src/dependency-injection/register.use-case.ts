import { Shared, Auth } from '@product-domain/backend';
import { SharedDictionary } from '@models/shared';
import { env } from '../config/env.config';
import { Gig, PrivateGig } from '../db';
import { sendEmailService } from './nodemailer';

type PrivateDataUserRepository = Auth.Domain.Repositories.PrivateDataUserRepository;
type UserRepository = Auth.Domain.Repositories.UserRepository;

const { PRIVATE_USER_DATA_REPOSITORY, USER_REPOSITORY } = SharedDictionary;

export const emailLinkService = Shared.Infra.Firebase.makeFirebaseEmailLinkService({
  appName: 'auth-api',
  redirectAfterRegisterUrl: env.REDIRECT_AFTER_REGISTER_URL,
  serviceAccount: {
    projectId: env.GOOGLE_APPLICATION_CREDENTIALS.projectId,
    clientEmail: env.GOOGLE_APPLICATION_CREDENTIALS.clientEmail,
    privateKey: env.GOOGLE_APPLICATION_CREDENTIALS.privateKey,
  },
  sendEmailService,
});

const runInTransaction = Shared.Infra.Drizzle.Repositories.makeDrizzleUnitOfWork<
  PrivateDataUserRepository | UserRepository
>([
  {
    db: PrivateGig.privateGigDb,
    repositoryName: PRIVATE_USER_DATA_REPOSITORY,
    repositoryMaker: Auth.Infra.Drizzle.Repositories.makeDrizzlePrivateUserDataRepository,
  },
  {
    db: Gig.gigDb,
    repositoryName: USER_REPOSITORY,
    repositoryMaker: Auth.Infra.Drizzle.Repositories.makeDrizzleUserRepository,
  },
]);

export const register = Auth.App.makeRegisterUserUseCase({
  runInTransaction,
  emailLinkService,
});
