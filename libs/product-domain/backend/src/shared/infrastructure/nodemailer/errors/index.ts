import { Errors } from '@shared';

export const { throwError } = Errors.makeErrorRunner({
  'transporter-error': (message: string) =>
    Errors.InternalServerError.create(message, 'NODEMALIER_ERROR'),
});
