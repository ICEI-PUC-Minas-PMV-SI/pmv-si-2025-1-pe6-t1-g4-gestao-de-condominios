import UserCreate from '@/app/user/Create';
import UserEdit from '@/app/user/Edit';
import UserView from '@/app/user/View';
import ModalPageHeader from '@/components/modal/Header';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

type HeaderOptionsProps = {
  onBack: () => void;
  title: string;
};

const getHeaderOptions = ({ onBack, title }: HeaderOptionsProps) => {
  return {
    header: () => {
      return <ModalPageHeader onBack={onBack} title={title} />;
    },
  };
};

export default function UserStack() {
  const navigation = useNavigation();
  const onBack = () => navigation.goBack();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="UserCreate"
          options={getHeaderOptions({ title: 'Cadastro de usuário', onBack })}
          component={UserCreate}
        />
        <Stack.Screen
          name="UserEdit"
          options={getHeaderOptions({ title: 'Editar usuário', onBack })}
          component={UserEdit}
        />
        <Stack.Screen
          name="UserView"
          options={getHeaderOptions({ title: 'Detalhes do usuário', onBack })}
          component={UserView}
        />
      </Stack.Navigator>
    </>
  );
}
