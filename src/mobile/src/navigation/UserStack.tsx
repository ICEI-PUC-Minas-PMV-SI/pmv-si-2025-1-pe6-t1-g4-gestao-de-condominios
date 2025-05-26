import UserCreate from '@/app/user/Create';
import UserEdit from '@/app/user/Edit';
import UserView from '@/app/user/View';
import ModalPageHeader from '@/components/modal/Header';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  const navigation = useNavigation();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="UserCreate"
          options={{
            header: () => {
              return <ModalPageHeader onBack={() => navigation.goBack()} title="Cadastro de usuário" />;
            },
          }}
          component={UserCreate}
        />
        <Stack.Screen
          name="UserEdit"
          options={{
            header: () => {
              return <ModalPageHeader onBack={() => navigation.goBack()} title="Editar usuário" />;
            },
          }}
          component={UserEdit}
        />
        <Stack.Screen
          name="UserView"
          options={{
            header: () => {
              return <ModalPageHeader onBack={() => navigation.goBack()} title="Detalhes do usuário" />;
            },
          }}
          component={UserView}
        />
      </Stack.Navigator>
    </>
  );
}
