import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/app/Home';
import SignIn from '@/app/SignIn';
import SignUp from '@/app/SignUp';
import { useNavigation } from '@react-navigation/native';
import MainStack from './MainStack';
import StorageHandler from '@/helper/StorageHandler';
import PageHeader from '@/components/PageHeader';
import { useEffect, useState } from 'react';
import UserStack from './UserStack';
import ApartmentStack from './ApartmentStack';
import ForgotPassword from '@/app/ForgotPassword';
import VerifyOTP from '@/app/VerifyOTP';
import ChangePassword from '@/app/ChangePassword';

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
    component: ForgotPassword,
  },
  {
    name: 'VerifyOTP',
    title: 'Validação de código',
    component: VerifyOTP,
  },
  {
    name: 'ChangePassword',
    title: 'Alterar senha',
    component: ChangePassword,
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
      <Stack.Screen name="UserStack" options={{ headerShown: false }} component={UserStack} />
      <Stack.Screen name="ApartmentStack" options={{ headerShown: false }} component={ApartmentStack} />
    </Stack.Navigator>
  );
}
