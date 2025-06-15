import { FeeFields } from './Fields';
import { Alert } from '@/utilities/Alert';
import AppCreate from '../Create';
import { FeeProvider } from '@/provider/Fee';

export default function FeeCreate() {
  return (
    <AppCreate
      fields={FeeFields.getEditFields()}
      provider={FeeProvider}
      handleData={(data) => {
        const { id, isRecurrent, ...rest } = data;
        return {
          ...rest,
          isRecurrent: isRecurrent === 'true' ? true : false,
        };
      }}
      onSuccess={() => Alert.showSuccess({ message: 'SUCCESS_CREATED_FEE' })}
      onError={(err) => {

        Alert.showError({ message: 'UNEXPECTED_ERROR' });
        
      }}
    />
  );
}
