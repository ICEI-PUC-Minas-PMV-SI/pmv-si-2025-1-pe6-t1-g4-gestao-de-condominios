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
  apartment: null | {
    id: string;
  };
  condominium: {
    id: string;
  };
  apartmentId: string | null;
  condominiumId: string;
};

export type UserCreatePayload = Omit<User, 'id'>;
export type UserUpdatePayload = User;
