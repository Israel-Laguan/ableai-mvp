export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  phoneNumber: string | null;
  password: string;
};

export type UserCreateInput = {
  password: string;
  privateDataUserId: number;
};

export type PrivateDataUserCreateInput = {
  fullName: string;
  email: string;
  phoneNumber: string | null;
};
