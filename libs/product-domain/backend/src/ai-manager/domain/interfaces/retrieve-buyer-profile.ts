import type { Buyer, SkillHire } from '@models/gig';
import type { Repositories as GigRepositories } from '../../../gig/domain';

export interface MakeRetrieveBuyerProfileConfig {
  buyerRepository: GigRepositories.BuyerRepository;
  skillHireRepository: GigRepositories.SkillHireRepository;
}

export interface BuyerProfile {
  buyer: Buyer;
  skills: SkillHire[];
}
