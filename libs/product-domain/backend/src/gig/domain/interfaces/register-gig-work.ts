import type { GigWork, WorkerSkill } from '@models/gig';
import type { CreateEntityInput } from '@models/shared';
import type { Repositories } from '..';

export type MakeRegisterGigWorkUseCase = {
  buyerRepository: Repositories.BuyerRepository;
  gigWorkRepository: Repositories.GigWorkRepository;
};

export type RegisterGigWorkInput = {
  gigWork: Omit<CreateEntityInput<GigWork>, 'buyerId' | 'skills'> & {
    skills: WorkerSkill['name'][];
  };
  userId: number;
};

export type RegisterGigWorkOutput = GigWork;

export type RegisterGigWorkRequestBody = RegisterGigWorkInput['gigWork'];
