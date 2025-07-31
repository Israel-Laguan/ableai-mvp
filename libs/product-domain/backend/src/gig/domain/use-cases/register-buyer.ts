import { RegisterBuyerInput, RegisterBuyerOutput } from '../interfaces';

export type RegisterBuyer = (input: RegisterBuyerInput) => Promise<RegisterBuyerOutput>;
