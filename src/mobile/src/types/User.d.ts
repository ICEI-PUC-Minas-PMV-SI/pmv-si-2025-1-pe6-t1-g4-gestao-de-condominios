import { UserApartment } from './Data';

export type User = {
  id: string;
  name: string;
  email: string;
  profile: 'ADMIN' | 'MANAGER' | 'RESIDENT';
  birthDate: string | null;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  apartment: null | UserApartment;
  condominium: {
    id: string;
    name: string;
  };
  apartmentId: string | null;
  condominiumId: string;
};

export type PaymentUser = Pick<User, 'id' | 'name' | 'profile' | 'email'>;

export type UserCreatePayload = Omit<User, 'id'>;
export type UserUpdatePayload = User;
