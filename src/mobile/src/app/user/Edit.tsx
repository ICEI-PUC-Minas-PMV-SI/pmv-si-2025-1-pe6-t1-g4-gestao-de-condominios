import FormEdit from '@/components/form/Edit';
import { UserEditFormData, UserFields } from './Fields';
import { useNavigation, useRoute } from '@react-navigation/native';
import Request from '@/utilities/Request';
import { Alert } from '@/utilities/Alert';
import { eventEmitter } from '@/utilities/EventEmitter';
import { User } from '@/types/User';

export default function UserEdit() {
  const route = useRoute();
  const user = route.params as User;
  const navigation = useNavigation();
  const defaultValue: Partial<UserEditFormData> = {
    email: user.email,
    apartmentId: user.apartmentId || '',
    birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
    name: user.name,
    phone: user.phone || undefined,
    profile: user.profile,
  };
  const onSubmit = async (data: UserEditFormData) => {
    const { confirmPassword, ...userData } = data;
    if (data.password === confirmPassword) {
      console.log('data', userData);
      try {
        await Request.put('/users', {
          ...userData,
          apartmentId: data.apartment.id,
        });
        Alert.showSuccess({ message: 'SUCCESS_EDITED_USER' });
        eventEmitter.emit('/users', { action: 'reload' });
        navigation.goBack();
      } catch (err: any) {
        console.log('errr--', err?.error);
        if (err?.response?.data?.error === 'USER_EMAIL_KEY_ALREADY_USED') {
          Alert.showError({ message: 'EMAIL_ALREADY_EXISTS' });
        }
      }
    }
  };
  return <FormEdit fields={UserFields.getEditFields()} onSubmit={onSubmit} data={defaultValue} />;
}
