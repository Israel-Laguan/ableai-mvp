import { IBase } from '../shared';

export interface SkillHire extends IBase {
  name: string;
  buyerId: number;
  gigsCompleted: number;
}

export interface Skill extends IBase {
  badgesAwarded?: string;
  equipment?: string;
  experienceMonth: number;
  gigsCompleted: number;
  imagesUrl?: string;
  name: string;
  ratePerHour: number;
  responseRate: number;
  summary: string;
  trainingDescription: string;
  videoUrl?: string;
  workerId: number;
  wouldWork: number;
}
