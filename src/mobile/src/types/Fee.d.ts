export type Fee = {
  id: string;
  name: string;
  type: 'RENT' | 'CONDOMINIUM' | 'OTHER';
  isRecurrent: boolean;
  due: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  condominium: {
    id: string;
    name: string;
  };
  condominiumId: string;
};


export type PaymentFee = Pick<Fee, 'id' | 'name' | 'type' | 'isRecurrent'>;

export type FeeCreatePayload = Omit<Fee, 'id'>;
export type FeeUpdatePayload = Fee;
