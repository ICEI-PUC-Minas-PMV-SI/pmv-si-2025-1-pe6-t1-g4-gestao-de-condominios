import { Payment } from '@/types/Payment';
import AppList from '../List';
import { PaymentProvider } from '@/provider/Payment';
import { PaymentText } from '@/helper/PaymentText';

export default function PaymentList() {
  return (
    <AppList<Payment>
      stackName="PaymentStack"
      createName="PaymentCreate"
      viewName="PaymentView"
      getItemText={PaymentText.format}
      provider={PaymentProvider}
      headers={[
        {
          name: 'payment',
          label: 'Pagamento',
        },
      ]}
    />
  );
}
