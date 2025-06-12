import Dashboard from '@/app/Dashboard';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserList from '@/app/user/List';
import ApartmentList from '@/app/apartment/List';
import { useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import StorageHandler from '@/helper/StorageHandler';
import { eventEmitter } from '@/utilities/EventEmitter';
import { AllModalProps } from '@/context/Modal';

const Drawer = createDrawerNavigator();

export default function MainStack() {
  const navigation = useNavigation();
  return (
    <>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="User" options={{ title: 'Usuários' }} component={UserList} />
        <Drawer.Screen name="Apartment" options={{ title: 'Apartamentos' }} component={ApartmentList} />
        <Drawer.Screen
          name="Logout"
          component={() => {
            useFocusEffect(useCallback(() => {
              const doLogout = async () => {
                StorageHandler.clear().then(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
                });
              };
              const data: { props: AllModalProps; action: 'open' | 'close' } = {
                props: {
                  id: 'CONFIRM_LOGOUT',
                  type: 'question',
                  title: 'Sair do sistema',
                  text: `Deseja realmente sair do sistema?`,
                  onSubmit(answer: boolean) {
                    eventEmitter.emit('MODAL_EVENT', { props: { id: 'CONFIRM_LOGOUT' }, action: 'close' });
                    if (answer) {
                      doLogout();
                    }
                  },
                },
                action: 'open',
              };
              eventEmitter.emit('MODAL_EVENT', data);
            }, []));

            return null; // Não renderiza nada
          }}
          options={{ title: 'Sair', drawerLabelStyle: {color: '#ef4444', fontSize: 16} }}
        />
      </Drawer.Navigator>
    </>
  );
}
