import { PaymentFields } from './Fields';
import { Alert } from '@/utilities/Alert';
import AppCreate from '../Create';
import { PaymentProvider } from '@/provider/Payment';
import Text from '@/utilities/Text';

export default function PaymentCreate() {
  return (
    <AppCreate
      fields={PaymentFields.getEditFields()}
      provider={PaymentProvider}
      handleData={(data) => {
        const { id, apartment, user, fee, ...rest } = data;
        return {
          ...rest,
          apartmentId: apartment?.id,
          feeId: fee?.id,
          userId: user?.id,
          amount: typeof data.amount === 'string' || typeof data.amount === 'number'
            ? Text.toNumber(data.amount)
            : 0,
        };
      }}
      onSuccess={() => Alert.showSuccess({ message: 'SUCCESS_CREATED_PAYMENT' })}
      onError={(err) => {

        Alert.showError({ message: 'UNEXPECTED_ERROR' });
        
      }}
    />
  );
}
