export interface IBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type IOmitBase = 'id' | 'createdAt' | 'updatedAt';
