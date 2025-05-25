import FormView from '@/components/form/View';
import { Profile } from '@/constants/Profile';
import useModal from '@/context/hooks/Modal';
import { UserController } from '@/controllers/User';
import { User } from '@/types/User';
import { DateUtil } from '@/utilities/Date';
import { eventEmitter } from '@/utilities/EventEmitter';
import Text from '@/utilities/Text';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { StyleSheet } from 'react-native';

// type ComponentProps = {
//   user: User;
// };

export default function UserView() {
  const route = useRoute();
  const navigation = useNavigation();
  const user = route.params as User;
  const { closeModal, openModal } = useModal();

  const fields = [
    { name: 'name', label: 'Nome', value: user.name },
    { name: 'email', label: 'E-mail', value: user.email },
    { name: 'birthDate', label: 'Data de nascimento', value: DateUtil.formatISO(user.birthDate) || '-' },
    { name: 'phone', label: 'Celular', value: user.phone ? Text.formatPhone(user.phone) : '-' },
    { name: 'profile', label: 'Perfil', value: Profile[user.profile] },
    { name: 'apartmentId', label: 'Apartamento', value: user?.apartment?.id },
  ];
  return (
    <FormView
      fields={fields}
      onEdit={() => {
        navigation.navigate('UserStack', {
          screen: 'UserEdit',
          params: user,
        });
      }}
      onRemove={() => {
        openModal({
          id: 'RemoveUser',
          type: 'question',
          title: 'Remoção de usuário',
          text: `Confirma remoção do usuário "${user.name}"?`,
          async onSubmit(answer) {
            closeModal('RemoveUser');
            if (answer) {
              try {
                await UserController.delete(user.id);
                navigation.goBack();
                eventEmitter.emit('/users', { action: 'reload' });
              } catch (err) {}
            }
          },
        });
      }}
    />
  );
}
