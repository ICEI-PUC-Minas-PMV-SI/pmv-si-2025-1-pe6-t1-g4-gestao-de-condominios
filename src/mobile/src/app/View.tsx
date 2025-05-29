import FormView from '@/components/form/View';
import { PageEvent } from '@/events/Page';
import { eventEmitter } from '@/utilities/EventEmitter';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StackName } from '@/types/Navigation';
import { IProvider } from '@/provider/IProvider';
import { ReadOnlyFieldType } from '@/components/form/ReadOnlyField';
import { Alert } from '@/utilities/Alert';

type ComponentProps<ProviderDataType> = {
  id: string;
  stackName: StackName;
  provider: IProvider<ProviderDataType>;
  viewFieldsFn: (data: ProviderDataType) => ReadOnlyFieldType[];
  editName: string;
  getDescriptionItemToRemove?: (item: ProviderDataType) => string;
};

export default function AppView<ProviderDataType>({
  id,
  provider,
  stackName,
  editName,
  viewFieldsFn,
  getDescriptionItemToRemove = () => '',
}: ComponentProps<ProviderDataType>) {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState<ProviderDataType>(route.params as ProviderDataType);
  const [formFields, setFormFields] = useState<ReadOnlyFieldType[]>(viewFieldsFn(data));
  const eventView = `/${provider.resource}/view`;
  useEffect(() => {
    const fetchData = () => {
      provider.read({ id }).then((data) => {
        setData(data);
        setFormFields(viewFieldsFn(data));
      });
    };
    const handleAction = ({ action }: { action: string }) => {
      if (action === 'reload') {
        fetchData();
      }
    };
    eventEmitter.on(eventView, handleAction);
    return () => {
      eventEmitter.off(eventView, handleAction);
    };
  }, []);
  return (
    <FormView
      fields={formFields}
      onEdit={() => {
        console.log('navigate', data);
        navigation.navigate(stackName, {
          screen: editName,
          params: data,
        });
      }}
      onRemove={() => {
        PageEvent.openConfirmRemove(
          {
            async onSubmit(answer) {
              if (answer) {
                try {
                  await provider.delete(id);
                  Alert.showSuccess({ message: 'SUCCESS_REMOVE_RECORD' });
                  if (provider.resource) {
                    PageEvent.reload(provider.resource, 'list');
                  }
                  navigation.goBack();
                } catch (err) {}
              }
            },
          },
          getDescriptionItemToRemove(data),
        );
      }}
    />
  );
}
