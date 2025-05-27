import { UserFields } from './Fields';
import { Alert } from '@/utilities/Alert';
import AppCreate from '../Create';
import { UserProvider } from '@/provider/User';

export default function UserCreate() {
  return (
    <AppCreate
      fields={UserFields.getEditFields()}
      provider={UserProvider}
      handleData={(data) => {
        return {
          ...data,
          apartmentId: data.apartment.id,
        };
      }}
      onSuccess={() => Alert.showSuccess({ message: 'SUCCESS_CREATED_USER' })}
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
