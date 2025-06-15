import { PaymentEditFormData, PaymentFields } from './Fields';
import { useRoute } from '@react-navigation/native';
import { Alert } from '@/utilities/Alert';
import { Payment } from '@/types/Payment';
import AppEdit from '../Edit';
import { PaymentProvider } from '@/provider/Payment';

export default function PaymentEdit() {
  const route = useRoute();
  const payment = route.params as Payment;
  const defaultValue: Partial<PaymentEditFormData> = {
    id: payment.id,
    amount: payment.amount.toString(),
    apartmentId: payment.apartment?.id || payment.apartmentId || '',
    userId: payment.user?.id || payment.userId || '',
    feeId: payment.fee?.id || payment.feeId || '',
    paymentDate: payment.paymentDate ? new Date(payment.paymentDate) : undefined,
  };
  return (
    <AppEdit
      fields={PaymentFields.getEditFields(true)}
      defaultValue={defaultValue}
      id={payment.id}
      provider={PaymentProvider}
      handleData={(data) => {
        return {
          ...data
        };
      }}
      onSuccess={() => Alert.showSuccess({ message: 'SUCCESS_EDITED_USER' })}
      onError={(err) => {
        if (err?.response?.data?.error === 'USER_EMAIL_KEY_ALREADY_USED') {
          Alert.showError({ message: 'EMAIL_ALREADY_EXISTS' });
        } else {
          Alert.showError({ message: 'UNEXPECTED_ERROR' });
        }
      }}
    />
  );
}
