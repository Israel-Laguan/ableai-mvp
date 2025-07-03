import { IBase } from '../shared';

export interface SkillHires extends IBase {
  name: string;
  buyerId: number;
  gigsCompleted: number;
}

export interface Skills extends IBase {
  badgesAwarded?: string;
  equipment?: string;
  experienceMonth: number;
  gigsCompleted: number;
  imagesUrl?: string;
  name: string;
  ratePerHour: number;
  summary: string;
  trainingDescription: string;
  videoUrl?: string;
  workerId: number;
}
