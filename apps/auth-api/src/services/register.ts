import { Infra } from '@models/auth';
import { register } from '../dependency-injection';

export async function registerService(input: Infra.RegisterInput): Promise<{
  success: boolean;
}> {
  return await register(input);
}
