import { Payment } from '@/types/Payment';
import { useRoute } from '@react-navigation/native';
import { PaymentFields } from './Fields';
import AppView from '../View';
import { PaymentProvider } from '@/provider/Payment';

export default function PaymentView() {
  const route = useRoute();
  const user = route.params as Payment;
  return (
    <AppView<Payment>
      editName="PaymentEdit"
      viewFieldsFn={PaymentFields.getViewFields}
      id={user.id}
      provider={PaymentProvider}
      stackName="PaymentStack"
      getDescriptionItemToRemove={(userData) => userData.name}
    />
  );
}
