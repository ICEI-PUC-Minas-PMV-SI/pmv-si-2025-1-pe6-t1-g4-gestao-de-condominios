import { FeeEditFormData, FeeFields } from './Fields';
import { useRoute } from '@react-navigation/native';
import { Alert } from '@/utilities/Alert';
import { Fee } from '@/types/Fee';
import AppEdit from '../Edit';
import { FeeProvider } from '@/provider/Fee';

export default function FeeEdit() {
  const route = useRoute();
  const fee = route.params as Fee;
  const defaultValue: Partial<FeeEditFormData> = {
    id: fee.id,
    type: fee.type,
    due: fee.due ? new Date(fee.due) : undefined,
    name: fee.name,
    isRecurrent: fee.isRecurrent,
  };
  return (
    <AppEdit
      fields={FeeFields.getEditFields(true)}
      defaultValue={defaultValue}
      id={fee.id}
      provider={FeeProvider}
      handleData={(data) => {
        return {
          ...data
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
