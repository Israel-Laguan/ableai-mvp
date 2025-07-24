import type { IOmitBase } from '../../shared';
import type { Statistic } from '..';

export type CreateStatisticInput = Omit<Statistic, 'responseRate' | 'wouldWork' | IOmitBase>;
