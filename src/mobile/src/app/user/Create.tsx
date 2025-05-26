import FormEdit from '@/components/form/Edit';
import { UserEditFormData, UserFields } from './Fields';
import { useNavigation } from '@react-navigation/native';
import Request from '@/utilities/Request';
import { Alert } from '@/utilities/Alert';
import { PageEvent } from '@/events/Page';

export default function UserCreate() {
  const navigation = useNavigation();
  const onSubmit = async (data: UserEditFormData) => {
    const { confirmPassword, ...userData } = data;
    if (data.password === confirmPassword) {
      try {
        await Request.post('/users', {
          ...userData,
          apartmentId: data.apartment.id,
        });
        Alert.showSuccess({ message: 'SUCCESS_CREATED_USER' });
        PageEvent.reload('users', 'list');
        navigation.goBack();
      } catch (err: any) {
        if (err?.response?.data?.error === 'USER_EMAIL_KEY_ALREADY_USED') {
          Alert.showError({ message: 'EMAIL_ALREADY_EXISTS' });
        }
      }
    }
  };
  return (
    <>
      <FormEdit fields={UserFields.getEditFields()} onSubmit={onSubmit} />
    </>
  );
}
