import { Interfaces, UseCases } from '../domain';

export function makeGetAllGigWorkPaymentsUseCase({
  gigWorkRepository,
}: Interfaces.MakeGetAllGigWorkPayments): UseCases.GetAllGigWorkPaymentsUseCase {
  return async input => {
    return await gigWorkRepository.getAllGigWorkPayments(input);
  };
}
