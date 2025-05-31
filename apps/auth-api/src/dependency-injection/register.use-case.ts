import { Shared, Auth } from '@product-domain/backend';
import { Gig, PrivateGig } from '../db';
import { env } from '../config/env.config';

type PrivateDataUserRepository = Auth.Domain.Repositories.PrivateDataUserRepository;
type UserRepository = Auth.Domain.Repositories.UserRepository;
import { sendEmailService } from './nodemailer';

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
    db: Gig.gigDb,
    repositoryName: 'privateDataUserRepository',
    repositoryMaker: Auth.Infra.Drizzle.Repositories.makeDrizzlePrivateUserDataRepository,
  },
  {
    db: PrivateGig.privateGigDb,
    repositoryName: 'userRepository',
    repositoryMaker: Auth.Infra.Drizzle.Repositories.makeDrizzleUserRepository,
  },
]);

export const register = Auth.App.makeRegisterUserUseCase({
  runInTransaction,
  emailLinkService,
});
