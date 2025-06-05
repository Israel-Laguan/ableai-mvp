import type { FirebaseAuthModule } from '../../../../shared/domain/modules';
import type {
  CreateEmailToken,
  MakeVerifyEmailHTML,
  SendEmail,
  SendEmailLink,
} from '../../../domain/services';

import { FIREBASE_ERROR_CODES } from '../../../../shared/domain/constants';
import { throwError } from '../errors';

const { UNKNOWN_ERROR, UNAUTHORIZED_CONTINUE_URI } = FIREBASE_ERROR_CODES;
const ERROR_PATH = 'SEND_EMAIL_LINK_SERVICE';

export function makeFirebaseSendEmailLinkService({
  auth,
  createEmailVerificationToken,
  makeVerifyEmailHTML,
  redirectionUrl,
  sendEmail,
  subject,
}: {
  auth: FirebaseAuthModule;
  createEmailVerificationToken: CreateEmailToken;
  makeVerifyEmailHTML: MakeVerifyEmailHTML;
  redirectionUrl: string;
  sendEmail: SendEmail;
  subject: string;
}): SendEmailLink {
  return async ({ email }) => {
    const emailToken = createEmailVerificationToken({ email });
    const link = await auth
      .generateEmailVerificationLink(email, { url: redirectionUrl + `?email=${emailToken}` })
      .catch(() => {
        throwError(UNAUTHORIZED_CONTINUE_URI, ERROR_PATH);
      });

    if (typeof link === 'string') {
      await sendEmail({
        to: email,
        subject,
        html: makeVerifyEmailHTML({ link }),
      }).catch(() => {
        throwError(UNKNOWN_ERROR, ERROR_PATH);
      });
    }
  };
}
