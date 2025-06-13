import { FormFieldEdit } from '@/components/form/Edit';
import { Apartment } from '@/types/Data';
import { Fee } from '@/types/Fee';
import { DateUtil } from '@/utilities/Date';
import Text from '@/utilities/Text';
import ValidationPattern from '@/utilities/ValidationPattern';

export type FeeEditFormData = {
  id: string;
  name: string;
  email: string;
  due: Date | string;
  isRecurrent: boolean;
  type: string;
};

class FeeFields {
  getViewFields(fee: Fee) {
    return [
      { name: 'id', label: 'Id', value: fee.id },
      { name: 'type', label: 'Tipo', value: fee.type },
      { name: 'name', label: 'Nome', value: fee.name },
      { name: 'due', label: 'Vencimento', value: DateUtil.formatISO(fee.due) || '-' },
      { name: 'isRecurrent', label: 'Recorrente', value: fee.isRecurrent },
    ];
  }
  getEditFields(isEditing = false) {
    const fields: FormFieldEdit<FeeEditFormData, Apartment>[] = [
      {
        name: 'id',
        type: 'text',
        label: 'Id',
        editable: false,
      },
      {
        name: 'type',
        type: 'select',
        label: 'Tipo',
        rules: { required: true },
        selectOptions: [
          { id: 'CONDOMINIUM', name: 'Condominio' },
          { id: 'RENT', name: 'Aluguel' },
          { id: 'OTHER', name: 'Outros' },
        ],
        selectLabelKey: 'name',
        selectValueKey: 'id',
        placeholder: 'Selecione um tipo',
      },
      {
        name: 'name',
        type: 'text',
        label: 'Nome',
        rules: { required: true },
        placeholder: 'Nome da Taxa',
        textContentType: 'name',
      },
      {
        name: 'due',
        type: 'date',
        mode: 'date',
        label: 'Vencimento',
        maximumDate: (() => {
          const curDate = new Date();
          return curDate;
        })(),
      },
      {
        name: 'isRecurrent',
        type: 'select',
        label: 'Recorrente',
        rules: { required: true },
        selectOptions: [
          { id: true, name: 'Sim' },
          { id: false, name: 'Não' },
        ],
        selectLabelKey: 'name',
        selectValueKey: 'id',
      },
    ];
    return fields;
  }
}
const instance = new FeeFields();
export { instance as FeeFields };
