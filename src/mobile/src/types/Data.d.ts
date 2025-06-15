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


export type UserApartment = Pick<Apartment, 'id' | 'block' | 'floor' | 'number'>;

export type PaymentApartment = Pick<Apartment, 'id' | 'block' | 'floor' | 'number'>;

export type ApiDataType = 'users' | 'apartments' | 'payments' | 'fees';

export type PrimitiveType = string | number | Date | null;

export type BasicObj = Record<string, PrimitiveType>;

export type ApiDataObj = Record<string, PrimitiveType | BasicObj>;
