import FormEdit, { FormFieldEdit } from '@/components/form/Edit';
import { useNavigation } from '@react-navigation/native';
import { IProvider } from '@/provider/IProvider';
import { ApiDataObj } from '@/types/Data';
import { FieldValues } from 'react-hook-form';
import { PageEvent } from '@/events/Page';

type ComponentProps<FormDataType extends FieldValues, ProviderDataType, RowItem> = {
  handleData?: (formData: FormDataType) => any;
  onSuccess?: (data: FormDataType) => void;
  onError?: (err: any) => void;
  provider: IProvider<ProviderDataType>;
  fields: FormFieldEdit<FormDataType, RowItem>[];
};

export default function AppCreate<FormDataType extends ApiDataObj, ProviderDataType, RowItem>({
  handleData = (data) => data,
  onSuccess = () => {},
  onError = () => {},
  fields,
  provider,
}: ComponentProps<FormDataType, ProviderDataType, RowItem>) {
  const navigation = useNavigation();
  const onSubmit = async (data: FormDataType) => {
    try {
      const handledData = handleData(data);
      await provider.create(handledData);
      onSuccess(handledData);
      if (provider.resource) {
        PageEvent.reload(provider.resource, 'list');
      }
      navigation.goBack();
    } catch (err: any) {
      onError(err);
    }
  };
  return <FormEdit fields={fields} onSubmit={onSubmit} />;
}
