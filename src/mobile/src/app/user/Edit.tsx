import { UserEditFormData, UserFields } from './Fields';
import { useRoute } from '@react-navigation/native';
import { Alert } from '@/utilities/Alert';
import { User } from '@/types/User';
import AppEdit from '../Edit';
import { UserProvider } from '@/provider/User';

export default function UserEdit() {
  const route = useRoute();
  const user = route.params as User;
  const defaultValue: Partial<UserEditFormData> = {
    id: user.id,
    email: user.email,
    apartmentId: user.apartment?.id || user.apartmentId || '',
    birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
    name: user.name,
    phone: user.phone || undefined,
    profile: user.profile,
  };
  return (
    <AppEdit
      fields={UserFields.getEditFields(true)}
      defaultValue={defaultValue}
      id={user.id}
      provider={UserProvider}
      handleData={(data) => {
        return {
          ...data,
          apartmentId: data.apartment.id,
          confirmPassword: undefined,
        };
      }}
      onSuccess={() => Alert.showSuccess({ message: 'SUCCESS_EDITED_USER' })}
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
