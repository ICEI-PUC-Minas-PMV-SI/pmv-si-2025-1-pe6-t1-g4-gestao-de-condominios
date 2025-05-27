import { ApartmentFields } from '@/app/apartment/Fields';
import { Alert } from '@/utilities/Alert';
import AppCreate from '../Create';
import { ApartmentProvider } from '@/provider/Apartment';

export default function ApartmentCreate() {
  console.log('apartment--create', ApartmentFields.getEditFields());
  return (
    <AppCreate
      fields={ApartmentFields.getEditFields()}
      provider={ApartmentProvider}
      handleData={(data) => {
        return {
          block: data.block,
          number: Number(data.number),
          floor: Number(data.floor),
        };
      }}
      onSuccess={() => Alert.showSuccess({ message: 'SUCCESS_CREATED_APARTMENT' })}
      onError={() => {
        Alert.showError({ message: 'UNEXPECTED_ERROR' });
      }}
    />
  );
}
