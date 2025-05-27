import Table, { TableDataSource, TableHeader } from '@/components/Table';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackName } from '@/types/Navigation';
import { IProvider } from '@/provider/IProvider';

type ComponentProps<ProviderDataType> = {
  stackName: StackName;
  provider: IProvider<ProviderDataType>;
  dataSource?: TableDataSource;
  getItemText: (row: ProviderDataType) => string;
  viewName: string;
  createName: string;
  headers?: TableHeader[];
};

export default function AppList<ProviderDataType>({
  stackName,
  provider,
  dataSource,
  getItemText,
  viewName,
  createName,
  headers = [
    {
      name: 'name',
      label: 'Nome',
    },
  ],
}: ComponentProps<ProviderDataType>) {
  const navigation = useNavigation();

  return (
    <View className="bg-white h-full">
      <Table<ProviderDataType>
        provider={provider}
        headers={headers}
        dataSource={dataSource}
        getItemText={getItemText}
        onPress={(data) => {
          navigation.navigate(stackName, {
            screen: viewName,
            params: data,
          });
        }}
        onAdd={() => {
          navigation.navigate(stackName, {
            screen: createName,
          });
        }}
      />
    </View>
  );
}
