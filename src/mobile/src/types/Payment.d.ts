import { PaymentUser } from './User';
import { PaymentFee } from './Fee';
import { PaymentApartment } from './Data';

export type Payment = {
  id: string;
  amount: string;
  paymentDate: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  condominium: {
    id: string;
    name: string;
  };
  condominiumId: string;
  
  apartment: PaymentApartment;
  apartmentId: string;

  fee: PaymentFee;
  feeId: string;

  user: PaymentUser;
  userId: string;

};

export type PaymentCreatePayload = Omit<Payment, 'id'>;
export type PaymentUpdatePayload = Payment;
