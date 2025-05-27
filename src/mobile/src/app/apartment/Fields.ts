import { FormFieldEdit } from '@/components/form/Edit';
import { ReadOnlyFieldType } from '@/components/form/ReadOnlyField';
import { Apartment } from '@/types/Data';

export type ApartmentEditFormData = {
  id: string;
  block: string;
  number: string;
  floor: string;
};

class ApartmentFields {
  getViewFields(apartment: Apartment): ReadOnlyFieldType[] {
    return [
      { name: 'id', label: 'Id', value: apartment.id },
      { name: 'block', label: 'Bloco', value: apartment.block },
      { name: 'number', label: 'Número', value: apartment.number.toString() },
      { name: 'floor', label: 'Andar', value: apartment.floor.toString() },
    ];
  }
  getEditFields() {
    const fields: FormFieldEdit<ApartmentEditFormData, Apartment>[] = [
      {
        name: 'id',
        type: 'text',
        label: 'Id',
        editable: false,
      },
      {
        name: 'block',
        type: 'text',
        rules: { required: true },
        label: 'Bloco',
        placeholder: 'Bloco A',
      },
      {
        name: 'number',
        type: 'text',
        rules: { required: true },
        label: 'Número',
        placeholder: '000',
        onlyDigits: true,
      },
      {
        name: 'floor',
        type: 'text',
        label: 'Andar',
        rules: { required: true },
        placeholder: '1',
        onlyDigits: true,
      },
    ];
    return fields;
  }
}
const instance = new ApartmentFields();
export { instance as ApartmentFields };
