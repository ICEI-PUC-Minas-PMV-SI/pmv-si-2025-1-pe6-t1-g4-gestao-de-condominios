export type UserInfo = {
  email: string;
  id: string;
  name: string;
};

export type Apartment = {
  id: string;
  block: string;
  number: number;
  floor: number;
  condominiumId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  userId: string | null;
};
