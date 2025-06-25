import { IBase } from '../shared';

export interface SkillHires extends IBase {
  name: string;
  buyerId: number;
  gigsCompleted: number; // 0
}

export interface Skills extends IBase {
  badgesAwarded?: string;
  equipment?: string;
  experienceMonth: number; // 0
  gigsCompleted: number; // 0
  imagesUrl?: string;
  name: string;
  ratePerHour: number; // 0
  summary: string;
  trainingDescription: string;
  videoUrl?: string;
}
