import { Slot } from '@models/gig';
import { CreateEntityInput } from '@models/shared';

export type RegisterSlotInput = CreateEntityInput<Omit<Slot, 'isAvailable' | 'workerId'>>;
