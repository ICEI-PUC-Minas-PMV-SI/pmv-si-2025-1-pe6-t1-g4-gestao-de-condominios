import { Payment } from '@/types/Payment';

class PaymentText {
  
  format(payment: Payment | null | undefined) {
    if (!payment) return '-';
    const { amount, paymentDate} = payment;
    return `R$ ${amount} | Dia: ${paymentDate}`;
  }
}

const instance = new PaymentText();
export { instance as PaymentText };


