import Table, { TableDataSource } from '@/components/Table';
import useModal from '@/context/hooks/Modal';
import { User } from '@/types/User';
import UserView from './View';
import { View } from 'react-native';
import FormEdit from '@/components/form/Edit';
import { UserEditFormData, UserFields } from './Fields';
import Request from '@/utilities/Request';
import ModalPageHeader from '@/components/modal/Header';
import { Alert } from '@/utilities/Alert';

export default function UserList() {
  const { openModal, closeModal } = useModal();
  const dataSource: TableDataSource<User> = {
    perPage: 10,
    resource: '/users',
    uniqueId: 'id',
  };
  return (
    <View className="bg-white h-full">
      <Table<User>
        dataSource={dataSource}
        getItemText={(user) => user.name}
        onPress={(user) => {
          openModal({
            id: 'UserView',
            type: 'default',
            children: <UserView user={user} />,
          });
        }}
        onAdd={() => {
          const onSubmit = async (data: UserEditFormData) => {
            const { confirmPassword, ...userData } = data;
            if (data.password === confirmPassword) {
              console.log('data', userData);
              try {
                await Request.post('/users', {
                  ...userData,
                  apartmentId: data.apartment.id,
                });
                closeModal('UserEdit');
              } catch (err: any) {
                console.log('errr--', err?.error);
                if (err?.response?.data?.error === 'USER_EMAIL_KEY_ALREADY_USED') {
                  Alert.showError({ message: 'EMAIL_ALREADY_EXISTS' });
                }
              }
            }
          };
          openModal({
            id: 'UserAdd',
            type: 'default',
            children: (
              <>
                <ModalPageHeader onBack={() => closeModal('UserAdd')} title="Cadastrar usuário" />
                <FormEdit fields={UserFields.getEditFields()} onSubmit={onSubmit} />
              </>
            ),
          });
        }}
      />
    </View>
  );
}
