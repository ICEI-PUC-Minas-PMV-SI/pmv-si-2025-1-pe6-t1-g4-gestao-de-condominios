import { Payment } from '@/types/Payment';
import { IProvider } from './IProvider';
import { AbstractProvider } from './AbstractProvider';
import { ApiDataType } from '@/types/Data';

class PaymentProvider extends AbstractProvider<Payment> implements IProvider<Payment> {
  resource = 'payments' as ApiDataType;
}

const instance = new PaymentProvider();
export { instance as PaymentProvider };
