import { Errors } from '@shared';
import type { Interfaces, UseCases } from '../domain';

const PATH = 'REGISTER_GIG_WORK';

export function makeRegisterGigWorkUseCase({
  buyerRepository,
  gigWorkRepository,
}: Interfaces.MakeRegisterGigWorkUseCase): UseCases.RegisterGigWork {
  return async input => {
    const { results } = await buyerRepository.getAll({
      limit: 1,
      where: {
        fields: [{ field: 'userId', value: input.userId }],
      },
    });

    const buyer = results[0];

    if (!buyer) {
      throw Errors.NotFoundResourceError.create(`Buyer not found`, PATH);
    }

    const [gigWork] = await gigWorkRepository.create({
      ...input.gigWork,
      skills: input.gigWork.skills.join(','),
      buyerId: buyer.id,
      endDate: new Date(input.gigWork.endDate),
      startDate: new Date(input.gigWork.startDate),
    });

    return gigWork;
  };
}
