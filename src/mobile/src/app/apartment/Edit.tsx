import { ApartmentEditFormData, ApartmentFields } from './Fields';
import { useRoute } from '@react-navigation/native';
import { Alert } from '@/utilities/Alert';
import AppEdit from '../Edit';
import { Apartment } from '@/types/Data';
import { ApartmentProvider } from '@/provider/Apartment';

export default function ApartmentEdit() {
  const route = useRoute();
  const apartment = route.params as Apartment;
  const defaultValue: Partial<ApartmentEditFormData> = {
    id: apartment.id,
    block: apartment.block,
    number: apartment.number.toString(),
    floor: apartment.floor.toString(),
  };
  return (
    <AppEdit
      fields={ApartmentFields.getEditFields()}
      defaultValue={defaultValue}
      id={apartment.id}
      provider={ApartmentProvider}
      handleData={(data) => {
        return {
          block: data.block,
          number: Number(data.number),
          floor: Number(data.floor),
        };
      }}
      onSuccess={() => Alert.showSuccess({ message: 'SUCCESS_EDITED_APARTMENT' })}
      onError={() => {
        Alert.showError({ message: 'UNEXPECTED_ERROR' });
      }}
    />
  );
}
