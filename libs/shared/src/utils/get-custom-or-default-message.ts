import { DEFAULT_ERROR_MESSAGE } from '../constants';

export function getCustomOrDefaultMessage(message?: string): string {
  return message || DEFAULT_ERROR_MESSAGE;
}
