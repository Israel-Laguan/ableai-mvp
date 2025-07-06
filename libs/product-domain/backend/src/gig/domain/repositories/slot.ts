import type { Slot } from '@models/gig';
import type { ISQLCustomRepository, ISQLRepositoryMaker } from '@models/shared';

export type SlotRepository = ISQLCustomRepository<Slot>;

export type SlotRepositoryMaker<TDatabase> = ISQLRepositoryMaker<TDatabase, Slot>;
