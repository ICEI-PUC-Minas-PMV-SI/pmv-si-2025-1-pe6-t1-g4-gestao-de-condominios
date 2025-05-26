import FormEdit from '@/components/form/Edit';
import { UserEditFormData, UserFields } from './Fields';
import { useNavigation, useRoute } from '@react-navigation/native';
import Request from '@/utilities/Request';
import { Alert } from '@/utilities/Alert';
import { User } from '@/types/User';
import { PageEvent } from '@/events/Page';

export default function UserEdit() {
  const route = useRoute();
  const user = route.params as User;
  const navigation = useNavigation();
  const defaultValue: Partial<UserEditFormData> = {
    id: user.id,
    email: user.email,
    apartmentId: user.apartment?.id || user.apartmentId || '',
    birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
    name: user.name,
    phone: user.phone || undefined,
    profile: user.profile,
  };
  const onSubmit = async (data: UserEditFormData) => {
    console.log('onSubmit');
    const { confirmPassword, ...userData } = data;
    if (data.password === confirmPassword) {
      try {
        await Request.put(`/users/${userData.id}`, {
          ...userData,
          apartmentId: data.apartment.id,
        });
        Alert.showSuccess({ message: 'SUCCESS_EDITED_USER' });
        PageEvent.reload('users', ['list', 'view']);
        navigation.goBack();
      } catch (err: any) {
        if (err?.response?.data?.error === 'USER_EMAIL_KEY_ALREADY_USED') {
          Alert.showError({ message: 'EMAIL_ALREADY_EXISTS' });
        }
      }
    } else {
      Alert.showError({ message: 'DIFFERENT_PASSWORDS' });
    }
  };
  return (
    <FormEdit fields={UserFields.getEditFields(true)} onSubmit={onSubmit} data={defaultValue} submitBtnText="Salvar" />
  );
}
