import Table, { TableDataSource } from '@/components/Table';
import { User } from '@/types/User';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserList() {
  const navigation = useNavigation();
  const dataSource: TableDataSource<User> = {
    perPage: 10,
    resource: '/users',
    uniqueId: 'id',
  };
  return (
    <View className="bg-white h-full">
      <Table<User>
        headers={[
          {
            name: 'name',
            label: 'Nome',
          },
        ]}
        dataSource={dataSource}
        getItemText={(user) => user.name}
        onPress={(user) => {
          navigation.navigate('UserStack', {
            screen: 'UserView',
            params: user,
          });
        }}
        onAdd={() => {
          navigation.navigate('UserStack', {
            screen: 'UserCreate',
          });
        }}
      />
    </View>
  );
}
