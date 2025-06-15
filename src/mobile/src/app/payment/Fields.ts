  
// Define types for select-wrapper items
type PaymentApartment = Apartment;
type PaymentUser = User;
type PaymentFee = Fee;

import { FormFieldEdit } from '@/components/form/Edit';
import { Payment } from '@/types/Payment';
import { DateUtil } from '@/utilities/Date';
import { ApartmentText } from '@/helper/ApartmentText';
import { Apartment } from '@/types/Data';
import { Fee } from '@/types/Fee';
import { User } from '@/types/User';
import Text from '@/utilities/Text';
import ValidationPattern from '@/utilities/ValidationPattern';

export type PaymentEditFormData = {
  id: string;
  amount: string;
  paymentDate: Date | string;
  apartmentId: string;
  apartment: Apartment;
  userId: string;
  user: User;
  feeId: string;
  fee: Fee;
};

class PaymentFields {
  getViewFields(payment: Payment) {
    return [
      { name: 'id', label: 'Id', value: payment.id },
      { name: 'amount', label: 'Valor', value: payment.amount },
      { name: 'paymentDate', label: 'Data de Pagamento', value: DateUtil.formatISO(payment.paymentDate) || '-' },
      { name: 'apartmentId', label: 'Apartamento', value: ApartmentText.format(payment.apartment) },
      { name: 'userId', label: 'Usuário', value: payment.user },
      { name: 'feeId', label: 'Taxa', value: payment.fee },
    ];
  }
  getEditFields(isEditing = false) {
    const fields: FormFieldEdit<PaymentEditFormData, any>[] = [
      {
        name: 'id',
        type: 'text',
        label: 'Id',
        editable: false,
      },
      {
        name: 'paymentDate',
        type: 'date',
        mode: 'date',
        rules: { required: true },
        label: 'Data de Pagamento',
      },
      {
        name: 'amount',
        type: 'text',
        rules: { required: true },
        label: 'Valor',
        placeholder: '0,00',
        onlyDigits: true,
      },
      {
        name: 'apartment',
        type: 'select-wrapper',
        label: 'Apartamento',
        rules: { required: true },
        dataSource: {
          resource: 'apartments',
          uniqueKey: 'id',
        },
        defaultValueKey: 'apartmentId',
        placeholder: 'Selecione um apartamento',
        getItemText(item: PaymentApartment) {
          return `Apto ${item.number} | Andar: ${item.floor} | Bloco: ${item.block}`;
        },
        keyExtractor: (item: PaymentApartment) => item.id,
      },
      {
        name: 'user',
        type: 'select-wrapper',
        label: 'Usuário',
        rules: { required: true },
        dataSource: {
          resource: 'users',
          uniqueKey: 'id',
        },
        defaultValueKey: 'userId',
        placeholder: 'Selecione um usuário',
        getItemText(item: PaymentUser) {
          return item.name;
        },
        keyExtractor: (item: PaymentUser) => item.id,
      },
      {
        name: 'fee',
        type: 'select-wrapper',
        label: 'Taxa',
        rules: { required: true },
        dataSource: {
          resource: 'fees',
          uniqueKey: 'id',
        },
        defaultValueKey: 'feeId',
        placeholder: 'Selecione uma Taxa',
        getItemText(item: PaymentFee) {
          return item.name;
        },
        keyExtractor: (item: PaymentFee) => item.id,
      },
    ];
    return fields;
  }
}
const instance = new PaymentFields();
export { instance as PaymentFields };
