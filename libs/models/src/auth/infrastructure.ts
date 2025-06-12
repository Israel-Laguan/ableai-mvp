export type LoginInput = {
  email: string;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  phoneNumber: string | null;
  password: string;
};

export type UserCreateInput = {
  privateDataUserId: number;
};

export type PrivateDataUserCreateInput = {
  fullName: string;
  email: string;
  phoneNumber: string | null;
};
