import FormEdit, { FormFieldEdit } from '@/components/form/Edit';
import { useNavigation } from '@react-navigation/native';
import { PageEvent } from '@/events/Page';
import { ApiDataObj } from '@/types/Data';
import { IProvider } from '@/provider/IProvider';

type ComponentProps<FormDataType extends ApiDataObj, ProviderDataType, RowItem> = {
  id: string;
  defaultValue: Partial<FormDataType>;
  provider: IProvider<ProviderDataType>;
  handleData?: (formData: FormDataType) => any;
  onSuccess?: (data: FormDataType) => void;
  onError?: (err: any) => void;
  fields: FormFieldEdit<FormDataType, RowItem>[];
};

export default function AppEdit<FormDataType extends ApiDataObj, ProviderDataType, RowItem>({
  defaultValue,
  provider,
  id,
  onSuccess = () => {},
  onError = () => {},
  handleData = (data) => data,
  fields,
}: ComponentProps<FormDataType, ProviderDataType, RowItem>) {
  const navigation = useNavigation();
  const onSubmit = async (data: FormDataType) => {
    try {
      const handledData = handleData(data);
      await provider.update(id, handledData);
      if (provider.resource) {
        PageEvent.reload(provider.resource, ['list', 'view']);
      }
      onSuccess(data);
      navigation.goBack();
    } catch (err: any) {
      onError(err);
    }
  };
  return <FormEdit fields={fields} onSubmit={onSubmit} data={defaultValue} submitBtnText="Salvar" />;
}
