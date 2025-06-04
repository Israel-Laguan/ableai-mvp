import { Errors } from '@shared';
import { NODEMAILER_ERROR_CODES } from '../../../domain/constants';

const { TRANSPORTER_ERROR } = NODEMAILER_ERROR_CODES;

interface NodemailerErrorInputs {
  error: unknown;
}

export const { throwError } = Errors.makeErrorRunner<NodemailerErrorInputs>({
  [TRANSPORTER_ERROR]: ({ error }) =>
    Errors.InternalServerError.create(
      error instanceof Error ? error.message : 'Unknown error',
      'NODEMALIER_ERROR'
    ),
});
