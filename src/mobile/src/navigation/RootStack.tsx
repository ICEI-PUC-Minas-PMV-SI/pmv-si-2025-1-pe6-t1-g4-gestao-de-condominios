import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/app/Home';
import SignIn from '@/app/SignIn';
import SignUp from '@/app/SignUp';
import { useNavigation } from '@react-navigation/native';
import MainStack from './MainStack';
import StorageHandler from '@/helper/StorageHandler';
import PageHeader from '@/components/PageHeader';
import { useEffect, useState } from 'react';
import UserView from '@/app/user/View';
import ModalPageHeader from '@/components/modal/Header';
import UserStack from './UserStack';

const Stack = createNativeStackNavigator();

const screens = [
  {
    name: 'SignIn',
    title: 'Fazer login',
    component: SignIn,
  },
  {
    name: 'SignUp',
    title: 'Cadastrar usuário',
    component: SignUp,
  },
  {
    name: 'ForgotPassword',
    title: 'Recuperação de senha',
    component: SignUp,
  },
  {
    name: 'OTP',
    title: 'Validação de código',
    component: SignUp,
  },
  {
    name: 'MainStack',
    title: 'MainStack',
    component: MainStack,
    options: { headerShown: false },
  },
];

export default function RootStack() {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  useEffect(() => {
    StorageHandler.getAuthToken().then((authToken) => {
      setToken(authToken || '');
    });
  }, []);
  return (
    <Stack.Navigator initialRouteName={token ? 'MainStack' : 'Home'}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      {screens.map((screen) => {
        return (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={
              screen.options || {
                header: () => <PageHeader title={screen.title} onPress={() => navigation.goBack()} />,
              }
            }
          />
        );
      })}
      {/* <Stack.Screen
        name="UserView"
        component={UserView}
        options={{
          header: () => <ModalPageHeader onBack={() => navigation.goBack()} title="Detalhes do usuário" />,
        }}
      /> */}
      <Stack.Screen name="UserStack" options={{ headerShown: false }} component={UserStack} />
    </Stack.Navigator>
  );
}
